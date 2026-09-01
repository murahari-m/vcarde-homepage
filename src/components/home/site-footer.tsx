import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { EmailLink } from "@/components/home/email-link";
import { PlaceMap } from "@/components/home/place-map";
import { site, socials } from "@/lib/site";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.8L5.5 22H2.4l7.3-8.4L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L6.4 3.9H4.5L17.7 20Z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: (typeof socials)[number]["label"] }) {
  if (label === "Facebook") return <Facebook className="size-4" strokeWidth={1.75} />;
  if (label === "Instagram") return <Instagram className="size-4" strokeWidth={1.75} />;
  if (label === "YouTube") return <Youtube className="size-4" strokeWidth={1.75} />;
  return <XIcon />;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/">
            <img src="/brand/logo-vcarde.png" alt="VCARDe" className="h-8 w-auto" width={120} height={32} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
            NFC business cards and digital visiting cards from Mylapore, Chennai. Printed with{" "}
            {site.sister}. Free shipping across India.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <PlaceMap heightClass="place-map-sm" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-caps text-fg-subtle">Pages</p>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li>
              <Link to="/nfc-business-cards" className="hover:text-fg">
                NFC Business Card
              </Link>
            </li>
            <li>
              <Link to="/nfc-business-card-guide" className="hover:text-fg">
                NFC business card guide
              </Link>
            </li>
            <li>
              <Link to="/nfc-cards" className="hover:text-fg">
                NFC cards
              </Link>
            </li>
            <li>
              <Link to="/templates" className="hover:text-fg">
                Digital card templates
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-fg">
                About VCARDe
              </Link>
            </li>
            <li>
              <Link to="/press" className="hover:text-fg">
                Press kit
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-fg">
                FAQ
              </Link>
            </li>
            <li>
              <a href={site.links.nfcShop} className="hover:text-fg">
                NFC shop
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-caps text-fg-subtle">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            {site.phones.map((p) => (
              <li key={p.raw}>
                <a href={p.tel} className="hover:text-fg">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <EmailLink />
            </li>
            <li>
              <a href={site.links.whatsapp} className="hover:text-fg">
                WhatsApp
              </a>
            </li>
            <li className="leading-relaxed">
              <a href={site.links.maps} className="hover:text-fg">
                {site.address}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-fg-subtle sm:px-6">
          © {new Date().getFullYear()} VCARDe · {site.sister}. NFC cards and NFC business cards in India.
        </p>
      </div>
    </footer>
  );
}
