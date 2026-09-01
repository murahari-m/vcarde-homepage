import { useEffect } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { installDomGuard } from "@/lib/dom-guard";
import appCss from "../styles.css?url";

const APP_NAME = "VCARDe";

function RootShell() {
  useEffect(() => {
    installDomGuard();
  }, []);
  return (
    <html lang="en-IN" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NFC Business Card in India from ₹499 | VCARDe" },
      {
        name: "description",
        content:
          "Buy a custom NFC business card from ₹499. Tap to share your contact. Free shipping in India. Printed in Chennai.",
      },
      { name: "theme-color", content: "#070807" },
    ],
    links: [
      { rel: "preload", as: "image", href: "/cards/vcarde-gilt.jpg", fetchPriority: "high" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/brand/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/brand/apple-touch.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootShell,
});
