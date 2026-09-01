import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { recaptchaToken, RECAPTCHA_SITE_KEY } from "@/lib/recaptcha-client";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact VCARDe NFC Business Cards | Chennai",
      "Contact VCARDe NFC Business Cards in Mylapore, Chennai. Parent company GNK Services. Ask about NFC business cards, Google review cards, and bulk orders.",
      "/contact",
    ),
  component: Page,
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg outline-none ring-ring focus:ring-2";

function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    setError("");
    if (!name || !email || !phone || !city || !message) {
      setError("Fill all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      if (!RECAPTCHA_SITE_KEY) throw new Error("Add the reCAPTCHA site key");
      const token = await recaptchaToken("contact");
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, email, phone, city, message }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not send");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. WhatsApp us instead.");
    }
  }

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / Contact"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">Contact us</h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Tell us what you need — NFC business cards, Google review cards, or a bulk team
          order. We print in Mylapore and ship free in India.
        </p>
        <p className="mt-2 text-sm text-fg-subtle">
          {site.address} · {site.phones[0].display} · {site.phones[1].display}
        </p>

        {status === "sent" ? (
          <p className="mt-10 rounded-xl border border-border bg-surface px-4 py-6 text-sm text-fg">
            Message sent. We will get back to you. You can also{" "}
            <a href={site.links.whatsapp} className="text-accent underline">
              WhatsApp
            </a>
            .
          </p>
        ) : (
          <form className="mt-10 grid gap-4" onSubmit={(e) => void onSubmit(e)}>
            <label className="text-sm text-fg">
              Name
              <input name="name" required maxLength={80} className={fieldClass} autoComplete="name" />
            </label>
            <label className="text-sm text-fg">
              Email
              <input
                name="email"
                type="email"
                required
                inputMode="email"
                maxLength={120}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                title="Enter a valid email address"
                className={fieldClass}
                autoComplete="email"
              />
            </label>
            <label className="text-sm text-fg">
              Phone
              <input
                name="phone"
                type="tel"
                required
                maxLength={20}
                className={fieldClass}
                autoComplete="tel"
              />
            </label>
            <label className="text-sm text-fg">
              City
              <input
                name="city"
                required
                maxLength={80}
                className={fieldClass}
                autoComplete="address-level2"
              />
            </label>
            <label className="text-sm text-fg">
              Message
              <textarea name="message" required maxLength={2000} rows={5} className={fieldClass} />
            </label>
            <div className="hidden" aria-hidden="true">
              <input name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
              <Button variant="outline" asChild>
                <a href={site.links.whatsapp}>WhatsApp instead</a>
              </Button>
            </div>
            <p className="text-xs text-fg-subtle">Protected by reCAPTCHA.</p>
          </form>
        )}
      </article>
    </PageShell>
  );
}
