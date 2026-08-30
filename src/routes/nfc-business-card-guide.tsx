import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-business-card-guide")({
  head: () =>
    pageHead(
      "NFC Business Card Guide for India (2026) | VCARDe",
      "How an NFC business card works, NFC vs QR vs paper, iPhone support, NTAG chips, and NFC business card price in India from ₹499. Written in Chennai.",
      "/nfc-business-card-guide",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC Business Card Guide", path: "/nfc-business-card-guide" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "NFC Business Card Guide for India",
          description:
            "A practical guide to the NFC business card: how the chip works, price in India, iPhone support, and how to order from Chennai.",
          author: { "@type": "Organization", name: "VCARDe" },
          publisher: { "@type": "Organization", name: "VCARDe", logo: `${origin}/brand/logo-vcarde.png` },
          datePublished: "2026-08-29",
          dateModified: "2026-08-29",
          mainEntityOfPage: `${origin}/nfc-business-card-guide`,
          image: `${origin}/cards/vcarde-cmyk.jpg`,
        }}
      />
      <article className="prose-page mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / Guide"}
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-caps text-accent">Guide</p>
        <h1 className="mt-3 text-2xl text-fg">NFC business card guide for India</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          This page is for people who still hand over a card in a meeting, a shop, or a
          wedding hall — and want that card to stay current. It explains what an NFC
          business card is, what it costs in India, and how VCARDe prints one in Chennai.
        </p>

        <h2 className="mt-12 text-xl text-fg">What an NFC business card actually does</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          NFC is near-field communication: a short-range radio used by contactless debit
          cards. An NFC business card hides a copper antenna and a chip (usually NTAG 213)
          between PVC layers. Hold the card to a phone for about a second. The phone opens
          a URL. On VCARDe that URL is your live digital visiting card — name, numbers,
          WhatsApp, maps, and a save-to-contacts button.
        </p>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          You edit the page when your title or number changes. The printed NFC business
          card does not need a reprint. That is the whole product.
        </p>

        <h2 className="mt-12 text-xl text-fg">NFC vs QR vs paper</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Paper dies when the number changes. A QR visiting card needs the camera and a
          still hand. An NFC business card is a tap. VCARDe prints both NFC and an artistic
          QR on the same card so older phones are not left out. If you only want reviews,
          a Google review NFC card opens your Google listing instead of a profile.
        </p>

        <h2 className="mt-12 text-xl text-fg">Does it work on iPhone?</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Yes. Current iPhones read NFC. Hold the NFC business card near the camera /
          top edge. Android phones tap on the back. Recipients do not install an app.
          The page opens in the browser.
        </p>

        <h2 className="mt-12 text-xl text-fg">NFC business card price in India</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>PVC NFC business card from ₹499</li>
          <li>Google review NFC card from ₹599</li>
          <li>Bamboo from ₹799</li>
          <li>Foil / UV from ₹899</li>
          <li>Metal from ₹1,499</li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Shipping is free in India. Chip warranty is five years. Typical delivery from
          Mylapore is 5–7 business days. The digital profile is free forever — you can
          share it with a link even before the card arrives.
        </p>

        <h2 className="mt-12 text-xl text-fg">What is inside the card</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          A VCARDe NFC business card is a five-layer stack: front lamination, printed PVC,
          NFC inlay and chip, PVC core, back lamination. The chip is not a sticker on the
          reverse. That is why the card survives a wallet. See the exploded view on the{" "}
          <Link to="/nfc-business-cards" className="text-accent underline">
            NFC Business Card
          </Link>{" "}
          page.
        </p>

        <h2 className="mt-12 text-xl text-fg">How to order from Chennai</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-base text-fg-muted">
          <li>Create a free digital card at vcarde.com/login.</li>
          <li>Pick PVC, bamboo, or metal on m.vcarde.com.</li>
          <li>We print and encode in Mylapore, then ship.</li>
          <li>Tap. The live page opens.</li>
        </ol>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Walk-in: No.1/6, South Mada Street, Mylapore, Chennai 600004. WhatsApp{" "}
          {site.phoneDisplayAlt}. Call {site.phoneDisplay}.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Buy an NFC business card</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/about">About VCARDe</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
