/**
 * reCAPTCHA v3 — SITE KEY (public, safe in the browser)
 *
 * 1. Open https://www.google.com/recaptcha/admin/create
 * 2. Label: VCARDe
 * 3. Choose reCAPTCHA v3
 * 4. Domains: vcarde.com  (and localhost if you test locally)
 * 5. Paste the Site key between the quotes below.
 *
 * Secret key goes in: src/lib/recaptcha-secret.server.ts
 * VPS copy of the secret also goes in: vps/recaptcha-verify.php
 */
export const RECAPTCHA_SITE_KEY = "6LfsQlorAAAAAASNl-hcY0wUbtwjZOQ6Lgy2FxLe";
