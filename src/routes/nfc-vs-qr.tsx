import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-vs-qr")({
  head: () =>
    pageHead(
      "NFC vs QR Code for Business Cards in India | VCARDe",
      "NFC vs QR on a business card: speed, iPhone support, and why VCARDe prints both on every NFC business card from ₹499 in Chennai.",
      "/nfc-vs-qr",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC vs QR", path: "/nfc-vs-qr" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "NFC vs QR Code for Business Cards in India",
          description:
            "Compare NFC and QR on a visiting card. VCARDe prints both so every phone can open the same live profile.",
          author: { "@type": "Organization", name: "VCARDe" },
          publisher: { "@type": "Organization", name: "VCARDe", logo: `${origin}/brand/logo-vcarde.png` },
          datePublished: "2026-09-01",
          dateModified: "2026-09-01",
          mainEntityOfPage: `${origin}/nfc-vs-qr`,
          image: `${origin}/cards/vcarde-cmyk.jpg`,
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">Home</Link>
          {" / NFC vs QR"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">NFC vs QR code: which belongs on a business card?</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          People search “NFC vs QR” because both open a page from a card. They are not rivals on a
          VCARDe NFC business card. The chip handles a tap. The artistic QR covers phones with NFC
          off. One live profile sits behind both.
        </p>

        <h2 className="mt-12 text-xl text-fg">What an NFC business card does</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Near-field communication is a short-range radio. Hold the card near the phone. The NTAG
          213 chip wakes, the phone opens your VCARDe URL, and the other person can save a vCard.
          No typing. No app for them. It works on current Android and iPhone models.
        </p>

        <h2 className="mt-12 text-xl text-fg">What a QR code does</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          A camera reads a pattern. That is slower in a handshake, and lighting or a damaged print
          can fail the scan. It still matters: older phones, NFC switched off, or a laptop webcam
          can use QR when a tap cannot. VCARDe prints a designer QR on the same NFC business card.
        </p>

        <h2 className="mt-12 text-xl text-fg">Side by side</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>Speed at a meetup: NFC tap wins.</li>
          <li>Phones with NFC off: QR wins.</li>
          <li>You change your number: both still work, because they point at the live profile.</li>
          <li>Price: both are included from ₹499. You do not pay extra for the QR.</li>
          <li>
            Need extra QR types (Wi‑Fi, app, menu)? Use our{" "}
            <Link to="/qr-code-generator" className="text-accent underline">
              QR code generator
            </Link>{" "}
            at{" "}
            <a href={site.links.qrcodely} className="text-accent underline">
              qrcodely.net
            </a>
            .
          </li>
        </ul>

        <h2 className="mt-12 text-xl text-fg">What to order</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Order an NFC business card if you meet people in person. Keep the QR as backup. If you
          only need a screen, start with a free digital visiting card and add print later.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Shop NFC business cards</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-business-card-guide">Read the full guide</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
