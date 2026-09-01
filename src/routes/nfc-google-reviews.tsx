import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-google-reviews")({
  head: () =>
    pageHead(
      "NFC Google Review Card in India from ₹299 | VCARDe NFC Business Cards",
      "NFC Google review cards for shops in India. A tap opens your Google review page. Horizontal and vertical stands from ₹299. Printed in Chennai. Free shipping.",
      "/nfc-google-reviews",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC Google Review Card", path: "/nfc-google-reviews" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "NFC Google Review Card",
          brand: { "@type": "Brand", name: "VCARDe" },
          image: `${origin}/nfc/google-review.jpg`,
          description:
            "NFC card that opens a Google review page on tap. Horizontal and vertical. From ₹299 with free shipping in India.",
          offers: {
            "@type": "Offer",
            url: `${origin}/nfc-google-reviews`,
            priceCurrency: "INR",
            price: "299",
            availability: "https://schema.org/InStock",
          },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">Home</Link>
          {" / NFC Google review card"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">NFC Google review card</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          A Google review NFC card sits at the counter. The customer taps their phone. Google’s
          review screen opens — not a PDF, not a WhatsApp chat. You get more reviews because the
          step count drops from “search the shop name” to “tap”.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          VCARDe NFC Business Cards prints horizontal and vertical stand cards from ₹299. Same NTAG 213 chip as
          our NFC business card. Free shipping in India from Mylapore, Chennai.
        </p>

        <h2 className="mt-12 text-xl text-fg">How to use NFC cards to get more Google reviews</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-base text-fg-muted">
          <li>Send us your Google Maps listing or review short link.</li>
          <li>We encode the chip and print a matching QR for phones with NFC off.</li>
          <li>Place the card at billing, the table, or the exit.</li>
          <li>Ask once: “Tap here if the visit went well.”</li>
        </ol>

        <h2 className="mt-12 text-xl text-fg">Horizontal vs vertical</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Horizontal cards sit in a wallet or on a tray. Vertical cards stand like a mini menu.
          Both are NFC Google review cards. Pick the shape that matches the counter, not a new
          chip — the electronics are the same.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Shop review cards</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={site.links.whatsapp}>WhatsApp a design</a>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
