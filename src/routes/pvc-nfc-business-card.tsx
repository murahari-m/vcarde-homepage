import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/pvc-nfc-business-card")({
  head: () =>
    pageHead(
      "PVC NFC Business Card in India from ₹499 | VCARDe",
      "Affordable PVC NFC business card from ₹499. Full-colour print, NTAG chip, artistic QR, free digital card, free shipping in India. Printed in Chennai.",
      "/pvc-nfc-business-card",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "PVC NFC Business Card", path: "/pvc-nfc-business-card" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "PVC NFC Business Card",
          brand: { "@type": "Brand", name: "VCARDe" },
          image: `${origin}/cards/vcarde-cmyk.jpg`,
          description:
            "Custom PVC NFC business card from ₹499. CR80, NTAG 213, free shipping in India.",
          offers: {
            "@type": "Offer",
            url: `${origin}/pvc-nfc-business-card`,
            priceCurrency: "INR",
            price: "499",
            availability: "https://schema.org/InStock",
          },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">Home</Link>
          {" / PVC NFC business card"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">PVC NFC business card</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          PVC is the standard CR80 visiting-card size — the same shape as a debit card. Inside is
          an NTAG 213 chip. Outside is your CMYK, foil, or spot-UV artwork. This is the NFC
          business card most teams order because the unit price starts at ₹499 and shipping is free
          anywhere in India.
        </p>

        <h2 className="mt-12 text-xl text-fg">Why teams pick PVC</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>Lowest price for a working NFC business card</li>
          <li>Full colour, gold foil, and spot UV options</li>
          <li>Same live profile and 5-year chip warranty as metal</li>
          <li>Easy to reprint a batch when the team grows</li>
        </ul>

        <h2 className="mt-12 text-xl text-fg">Free digital card included</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Every PVC NFC business card includes a free VCARDe profile. No monthly fee. Edit phone,
          WhatsApp, and links whenever you want. The printed card does not go stale.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Shop PVC NFC cards</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/metal-nfc-business-card">See metal NFC cards</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
