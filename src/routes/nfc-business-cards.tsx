import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { NfcSection } from "@/components/home/nfc-section";
import { Faq } from "@/components/home/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, howToLd, pageHead, productLd } from "@/lib/seo";
import { faqs, site } from "@/lib/site";

export const Route = createFileRoute("/nfc-business-cards")({
  head: () =>
    pageHead(
      "NFC Business Card in India — From ₹499 | VCARDe",
      "Buy a custom NFC business card from ₹499. Tap a phone to share contact and a live profile. PVC, bamboo, or metal. Free shipping in India. Printed in Chennai. No app.",
      "/nfc-business-cards",
    ),
  component: Page,
});

const prices = [
  { name: "PVC NFC business card", price: "₹499", note: "CR80 · 5-year chip" },
  { name: "Google review NFC card", price: "₹599", note: "Horizontal or vertical" },
  { name: "Bamboo NFC business card", price: "₹799", note: "Wood grain · tap + QR" },
  { name: "Foil / UV NFC business card", price: "₹899", note: "Gold foil, spot UV" },
  { name: "Metal NFC business card", price: "₹1,499", note: "Steel face · NTAG inlay" },
];

function Page() {
  return (
    <PageShell>
      <JsonLd data={productLd()} />
      <JsonLd data={howToLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC Business Card", path: "/nfc-business-cards" },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / "}
          NFC Business Card
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-caps text-accent">Printed in Chennai</p>
        <h1 className="mt-3 text-2xl text-fg">NFC Business Card</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          A VCARDe NFC business card is a physical visiting card with an NTAG chip inside.
          Someone taps it on their phone. Your live profile opens — name, number, WhatsApp,
          maps, and links — without typing. You can change the details later. The same NFC
          business card still works.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          We print in Mylapore, Chennai, with GNK Services. PVC starts at ₹499. Shipping is
          free anywhere in India. The printed face is your brand only — no VCARDe logo.
          Recipients do not need an app on Android or iPhone.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Buy an NFC business card</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-cards">How NFC cards work</Link>
          </Button>
        </div>

        <h2 className="mt-14 text-xl text-fg">What is an NFC business card?</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          NFC means near-field communication — the same idea as a contactless debit card.
          An NFC business card holds a copper antenna and a chip. Hold it to a phone for
          about a second and the phone opens a URL. On VCARDe that URL is your digital
          visiting card, which you can edit anytime from a browser.
        </p>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Paper visiting cards go stale when your number changes. An NFC business card
          points at a live page, so one print run lasts years. We also print an artistic
          QR on the same card for phones without NFC.
        </p>

        <h2 className="mt-14 text-xl text-fg">NFC business card price in India</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-2 text-fg-subtle">
              <tr>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">From</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-fg-muted">
              {prices.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-3 text-fg">{row.name}</td>
                  <td className="px-4 py-3">{row.price}</td>
                  <td className="px-4 py-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-fg-subtle">
          Free shipping in India. 5-year chip warranty. Typical delivery 5–7 business days.
        </p>

        <h2 className="mt-14 text-xl text-fg">How to use an NFC business card</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-base text-fg-muted">
          <li>
            Create a free digital card on VCARDe. Add phone, WhatsApp, and links.
          </li>
          <li>
            Order a printed NFC business card. We encode the chip to your profile.
          </li>
          <li>
            Tap the card on a phone. The live page opens. Save-to-contacts is one tap.
          </li>
        </ol>

        <h2 className="mt-14 text-xl text-fg">NFC business card vs QR visiting card</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          A QR visiting card needs the camera and a steady hand. An NFC business card is a
          tap. VCARDe prints both on one card so older phones are not left out. If you only
          need reviews, see our{" "}
          <Link to="/" hash="reviews" className="text-accent underline">
            Google review NFC cards
          </Link>
          . For layouts, browse{" "}
          <Link to="/templates" className="text-accent underline">
            digital card templates
          </Link>
          . Longer explainer:{" "}
          <Link to="/nfc-business-card-guide" className="text-accent underline">
            NFC business card guide
          </Link>
          .
        </p>

        <h2 className="mt-14 text-xl text-fg">Why order from VCARDe in Chennai</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>Made in Mylapore — you can visit No.1/6, South Mada Street.</li>
          <li>NTAG 213 chip inside a five-layer PVC stack, not a sticker on the back.</li>
          <li>Your artwork only. Foil, UV, and gold print available.</li>
          <li>Sister studio GNK Services handles press and finish.</li>
          <li>
            Talk to us on WhatsApp at {site.phoneDisplayAlt} or call {site.phoneDisplay}.
          </li>
        </ul>
      </article>
      <NfcSection />
      <Faq />
    </PageShell>
  );
}
