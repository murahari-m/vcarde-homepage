import { RECAPTCHA_SITE_KEY } from "@/lib/recaptcha-keys";

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
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
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

export async function recaptchaToken(action: string) {
  if (!RECAPTCHA_SITE_KEY) throw new Error("missing-site-key");
  await loadRecaptcha(RECAPTCHA_SITE_KEY);
  const g = window.grecaptcha;
  if (!g) throw new Error("missing");
  return new Promise<string>((resolve, reject) => {
    g.ready(() => {
      g.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(reject);
    });
  });
}

export { RECAPTCHA_SITE_KEY };
