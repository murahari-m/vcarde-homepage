import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";
// @ts-expect-error JS plugin alongside the TS vite config
import { appEnvPlugin } from "./scripts/app-env-plugin.mjs";
import { isMigrationFile } from "./scripts/migration-plan.mjs";
import { RECAPTCHA_SECRET_KEY } from "./src/lib/recaptcha-secret.server";

/** The files `src/lib/db.ts` globs — same directory, same non-recursive scope. */
function hasGlobbedMigrations(root: string): boolean {
  try {
    return readdirSync(join(root, "migrations")).some(isMigrationFile);
  } catch {
    return false;
  }
}

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic). Vite awaits
 * async `configureServer` hooks. Production: `src/lib/db` kicks `ensureDbReady`
 * on import.
 *
 * Vite awaiting the hook puts this on time-to-first-render, so an app with no
 * migrations — no schema to apply — skips it entirely rather than paying for a
 * PGLite instance it never queries.
 */
function geoLookupPlugin(): Plugin {
  return {
    name: "vcarde-geo",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = (req.url ?? "").split("?", 1)[0] ?? "";
        if (pathOnly !== "/geo.php" && pathOnly !== "/geo") {
          next();
          return;
        }
        const chunks: Buffer[] = [];
        req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        req.on("end", async () => {
          res.setHeader("content-type", "application/json");
          let lat: number | null = null;
          let lng: number | null = null;
          try {
            const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}") as {
              lat?: number;
              lng?: number;
            };
            if (typeof parsed.lat === "number") lat = parsed.lat;
            if (typeof parsed.lng === "number") lng = parsed.lng;
          } catch {
            /* GET has no body */
          }
          if (lat != null && lng != null) {
            try {
              const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
              const nom = await fetch(url, {
                headers: { "User-Agent": "VCARDe-NFC/1.0 (https://vcarde.com)", Accept: "application/json" },
              });
              const data = (await nom.json()) as { address?: Record<string, string> };
              const addr = data.address ?? {};
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  ok: true,
                  source: "nominatim",
                  sublocality: addr.suburb || addr.neighbourhood || addr.village || "",
                  city: addr.city || addr.town || addr.county || "",
                  region: addr.state || "",
                }),
              );
              return;
            } catch {
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: false, source: "none" }));
              return;
            }
          }
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: false, source: "none" }));
        });
      });
    },
  };
}

function readDotEnv(): Record<string, string> {
  try {
    const text = readFileSync(join(process.cwd(), ".env"), "utf8");
    const out: Record<string, string> = {};
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#") || !t.includes("=")) continue;
      const i = t.indexOf("=");
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function contactFormPlugin(): Plugin {
  return {
    name: "vcarde-contact",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = (req.url ?? "").split("?", 1)[0] ?? "";
        if (pathOnly !== "/contact.php" && pathOnly !== "/contact-send") {
          next();
          return;
        }
        if ((req.method ?? "GET").toUpperCase() !== "POST") {
          res.statusCode = 405;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "POST only" }));
          return;
        }
        const chunks: Buffer[] = [];
        req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        req.on("end", async () => {
          res.setHeader("content-type", "application/json");
          const env = { ...readDotEnv(), ...process.env } as Record<string, string | undefined>;
          const secret =
            RECAPTCHA_SECRET_KEY ||
            env.RECAPTCHA_SECRET_KEY ||
            env.NOCAPTCHA_SECRET ||
            "";
          let brevo = env.BREVO_API_KEY || env.BREVO_KEY || "";
          if (!brevo && (env.MAIL_PASSWORD || "").startsWith("xkeysib-")) {
            brevo = env.MAIL_PASSWORD || "";
          }
          const to = env.MAIL_TO_ADDRESS || env.CONTACT_EMAIL || "cc@vcarde.com";
          const from = env.MAIL_FROM_ADDRESS || env.MAIL_USERNAME || "cc@vcarde.com";
          const fromName = env.MAIL_FROM_NAME || "VCARDe NFC Business Cards";
          let body: {
            token?: string;
            name?: string;
            email?: string;
            phone?: string;
            city?: string;
            message?: string;
          } = {};
          try {
            body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as typeof body;
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: "Bad JSON" }));
            return;
          }
          if (!body.name || !body.email || !body.phone || !body.message || !body.token) {
            res.statusCode = 422;
            res.end(JSON.stringify({ ok: false, error: "Fill all required fields" }));
            return;
          }
          if (!secret) {
            res.statusCode = 501;
            res.end(JSON.stringify({ ok: false, error: "Add RECAPTCHA_SECRET_KEY to .env" }));
            return;
          }
          try {
            const google = await fetch("https://www.google.com/recaptcha/api/siteverify", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({ secret, response: body.token }),
            });
            const data = (await google.json()) as { success?: boolean; score?: number; action?: string };
            const ok =
              Boolean(data.success) && Number(data.score ?? 0) >= 0.5 && data.action === "contact";
            if (!ok) {
              res.statusCode = 403;
              res.end(JSON.stringify({ ok: false, error: "Verification failed" }));
              return;
            }
          } catch {
            res.statusCode = 502;
            res.end(JSON.stringify({ ok: false, error: "Could not verify" }));
            return;
          }
          if (!brevo) {
            res.statusCode = 501;
            res.end(JSON.stringify({ ok: false, error: "Add BREVO_API_KEY to .env" }));
            return;
          }
          try {
            const sent = await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": brevo,
              },
              body: JSON.stringify({
                sender: { name: fromName, email: from },
                to: [{ email: to, name: "VCARDe" }],
                replyTo: { email: body.email, name: body.name },
                subject: `Website enquiry from ${body.name}`,
                htmlContent: `<p><strong>Name:</strong> ${body.name}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Phone:</strong> ${body.phone}</p><p><strong>City:</strong> ${body.city ?? ""}</p><p><strong>Message:</strong><br>${(body.message ?? "").replace(/\n/g, "<br>")}</p>`,
              }),
            });
            if (!sent.ok) {
              res.statusCode = 502;
              res.end(JSON.stringify({ ok: false, error: "Could not send mail" }));
              return;
            }
          } catch {
            res.statusCode = 502;
            res.end(JSON.stringify({ ok: false, error: "Could not send mail" }));
            return;
          }
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true }));
        });
      });
    },
  };
}

function recaptchaVerifyPlugin(): Plugin {
  return {
    name: "vcarde-recaptcha-verify",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = (req.url ?? "").split("?", 1)[0] ?? "";
        if (pathOnly !== "/recaptcha-verify.php" && pathOnly !== "/recaptcha-verify") {
          next();
          return;
        }
        if ((req.method ?? "GET").toUpperCase() !== "POST") {
          res.statusCode = 405;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "POST only" }));
          return;
        }
        const chunks: Buffer[] = [];
        req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        req.on("end", async () => {
          res.setHeader("content-type", "application/json");
          if (!RECAPTCHA_SECRET_KEY) {
            res.statusCode = 501;
            res.end(JSON.stringify({ ok: false, error: "Add the secret key" }));
            return;
          }
          let token = "";
          try {
            const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8")) as { token?: string };
            token = parsed.token ?? "";
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: "Bad JSON" }));
            return;
          }
          try {
            const google = await fetch("https://www.google.com/recaptcha/api/siteverify", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token }),
            });
            const data = (await google.json()) as {
              success?: boolean;
              score?: number;
              action?: string;
            };
            const ok =
              Boolean(data.success) &&
              Number(data.score ?? 0) >= 0.5 &&
              data.action === "email";
            res.statusCode = 200;
            res.end(JSON.stringify({ ok }));
          } catch {
            res.statusCode = 502;
            res.end(JSON.stringify({ ok: false }));
          }
        });
      });
    },
  };
}

function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      if (!hasGlobbedMigrations(server.config.root)) return;
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

/**
 * Live-preview OAuth popup — handled HERE so the agent never has to create a
 * `/auth/popup` route (and cannot break it by scaffolding a React page that
 * paints the full app shell in the popup).
 *
 * `signIn` (client.ts) opens `/auth/popup?providerId=…` in a top-level window.
 * This middleware runs before TanStack Start, calls `handleAuthPopupRequest`,
 * and returns the 302 / completion HTML. Deployed apps do not use the popup
 * (full-page OAuth redirect), so `apply: "serve"` is enough.
 */
function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      // Register immediately (not in a returned post-hook) so we run BEFORE
      // TanStack Start / the SPA HTML fallback. A model-authored
      // `src/routes/auth/popup.tsx` React page must never win this path.
      server.middlewares.use(async (req, res, next) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = rawUrl.split("?", 1)[0] ?? "";
          if (pathOnly !== "/auth/popup") {
            next();
            return;
          }
          if ((req.method ?? "GET").toUpperCase() !== "GET") {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              ((req.socket as { encrypted?: boolean } | undefined)?.encrypted ? "https" : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          // Ensure Host is the public preview host so Better Auth's dynamic
          // baseURL / redirect_uri match the popup origin.
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule("/src/lib/auth/popup.server.ts")) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          // Preserve multiple Set-Cookie headers (OAuth state + session).
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      });
    },
  };
}

// `0.0.0.0:8080` is the live-preview contract — don't change host/port.
// The dev server starts once `src/router.tsx` and `src/routes/` exist — see
// AGENTS.md § "First scaffold".
export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    // Before tanstackStart so /auth/popup never falls through to the SPA.
    authPopupPlugin(),
    recaptchaVerifyPlugin(),
    geoLookupPlugin(),
    contactFormPlugin(),
    // Dev-only /__app-env, read by scripts/check-auth-invariant.mjs.
    appEnvPlugin(),
    // PWA head + ?install=1 tutorial page; runs before Start/Nitro.
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            // Auto-registers server/middleware/* (the PWA install page +
            // manifest + head-tag middleware). Nitro v3 defaults serverDir to
            // false, so removing this silently unwires /?install=1 on deploys.
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
