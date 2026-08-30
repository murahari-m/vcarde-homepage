import type { ReactNode } from "react";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-bg">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
