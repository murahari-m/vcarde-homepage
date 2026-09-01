import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/metal-nfc-business-card")({
  head: () =>
    pageHead(
      "Metal NFC Business Card in India from ₹1,499 | VCARDe",
      "Metal NFC business card with steel face and NTAG chip. From ₹1,499. Your brand only — no VCARDe logo. Free shipping in India. Printed in Chennai.",
      "/metal-nfc-business-card",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Metal NFC Business Card", path: "/metal-nfc-business-card" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Metal NFC Business Card",
          brand: { "@type": "Brand", name: "VCARDe" },
          image: `${origin}/cards/lotus-front.jpg`,
          description:
            "Steel-face NFC business card with NTAG inlay. From ₹1,499. Printed in Chennai. Free shipping in India.",
          offers: {
            "@type": "Offer",
            url: `${origin}/metal-nfc-business-card`,
            priceCurrency: "INR",
            price: "1499",
            availability: "https://schema.org/InStock",
          },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">Home</Link>
          {" / Metal NFC business card"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">Metal NFC business card</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          A metal NFC business card is the one you keep in a jacket, not a stack on a table. Steel
          face, NTAG inlay inside, gold foil or laser options on top. The tap still opens the same
          live VCARDe profile as our PVC card. The difference is how it feels in the hand.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Price starts at ₹1,499. Many metal NFC business cards in India list above ₹2,000. Shipping
          is free. The printed face is your brand only.
        </p>

        <h2 className="mt-12 text-xl text-fg">Is a metal NFC card worth it?</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Yes if you want the card itself to signal quality — founders, jewellers, architects,
          consultants. No if you need fifty cards for a field team; then order{" "}
          <Link to="/pvc-nfc-business-card" className="text-accent underline">
            PVC NFC business cards
          </Link>{" "}
          at ₹499 and keep metal for leadership.
        </p>

        <h2 className="mt-12 text-xl text-fg">What we print</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>Steel or metal-look face with NFC inlay</li>
          <li>Gold foil, laser, or CMYK on the artwork</li>
          <li>Artistic QR on the reverse for phones without NFC</li>
          <li>5-year chip warranty</li>
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Shop metal NFC cards</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-business-cards">See all NFC business cards</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
