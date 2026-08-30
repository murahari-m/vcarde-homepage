import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const nav = [
  { label: "NFC Business Card", to: "/nfc-business-cards" },
  { label: "NFC cards", to: "/nfc-cards" },
  { label: "Templates", to: "/templates" },
  { label: "FAQ", to: "/faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="VCARDe home">
          <img
            src="/brand/logo-vcarde.png"
            alt="VCARDe"
            className="h-8 w-auto"
            width={120}
            height={32}
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-fg-muted lg:flex">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button size="sm" asChild>
            <a href={site.links.login} className="login-btn">
              Log in
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={site.links.nfcShop}>Buy NFC card</a>
          </Button>
        </div>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full text-fg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-bg px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-3 text-sm text-fg-muted hover:bg-surface-2 hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="mt-2 w-full login-btn" asChild>
              <a href={site.links.login}>Log in</a>
            </Button>
            <Button variant="outline" className="mt-2 w-full" asChild>
              <a href={site.links.nfcShop}>Buy NFC card</a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
