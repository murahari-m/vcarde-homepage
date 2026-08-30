import { Link } from "@tanstack/react-router";
import { PlaceMap } from "@/components/home/place-map";
import { site } from "@/lib/site";

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
              <a href={site.links.email} className="hover:text-fg">
                support@vcarde.com
              </a>
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
