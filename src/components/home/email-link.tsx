"use client";

import { useState } from "react";
import { recaptchaToken, RECAPTCHA_SITE_KEY } from "@/lib/recaptcha-client";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

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
      const token = await recaptchaToken("email");
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
