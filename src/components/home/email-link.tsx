"use client";

import { useState } from "react";
import { RECAPTCHA_SITE_KEY } from "@/lib/recaptcha-keys";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaScript: Promise<void> | null = null;

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaScript) return recaptchaScript;
  recaptchaScript = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(s);
  });
  return recaptchaScript;
}

async function verifyToken(token: string) {
  const res = await fetch("/recaptcha-verify.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { ok?: boolean };
  return data.ok === true;
}

export function EmailLink({ className }: { className?: string }) {
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const address = `${site.emailUser}@${site.emailDomain}`;

  const run = async () => {
    setError("");
    if (!RECAPTCHA_SITE_KEY) {
      setError("Add your reCAPTCHA v3 site key in src/lib/recaptcha-keys.ts");
      return;
    }
    setBusy(true);
    try {
      await loadRecaptcha(RECAPTCHA_SITE_KEY);
      const token = await new Promise<string>((resolve, reject) => {
        const g = window.grecaptcha;
        if (!g) {
          reject(new Error("missing"));
          return;
        }
        g.ready(() => {
          g.execute(RECAPTCHA_SITE_KEY, { action: "email" }).then(resolve).catch(reject);
        });
      });
      const ok = await verifyToken(token);
      if (!ok) {
        setError("Verification failed. WhatsApp us instead.");
        return;
      }
      setVerified(true);
      window.location.href = `mailto:${address}`;
    } catch {
      setError("Could not verify. WhatsApp us instead.");
    } finally {
      setBusy(false);
    }
  };

  if (verified) {
    return (
      <a href={`mailto:${address}`} className={cn("hover:text-fg", className)}>
        {site.emailUser}
        <span className="email-at" aria-hidden="true" />
        {site.emailDomain}
      </a>
    );
  }

  return (
    <span className="email-gate">
      <button
        type="button"
        onClick={() => void run()}
        disabled={busy}
        className={cn("email-link hover:text-fg", className)}
      >
        {busy ? "Verifying…" : "Email VCARDe"}
      </button>
      {error ? <span className="email-captcha-error">{error}</span> : null}
    </span>
  );
}
