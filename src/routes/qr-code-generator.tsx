import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/qr-code-generator")({
  head: () =>
    pageHead(
      "QR Code Generator India — QRCodely | VCARDe NFC Business Cards",
      "Create dynamic QR codes, short links, and bio pages with QRCodely. Pair them with a VCARDe NFC business card. Logo QR, analytics, 21 dynamic types. From GNK Services, Chennai.",
      "/qr-code-generator",
    ),
  component: Page,
});

const features = [
  {
    title: "Dynamic QR codes",
    body: "Change the destination after print. Same as a VCARDe NFC chip — the code stays, the page can move.",
  },
  {
    title: "Logo and colour",
    body: "Put your mark in the centre, set colours and gradients, download high-resolution files for print.",
  },
  {
    title: "URL shortener",
    body: "Turn long links into custom short URLs with click analytics. Use them on cards, posters, and WhatsApp.",
  },
  {
    title: "21 dynamic types",
    body: "App download, event, Wi‑Fi, donation, vCard, and more — not only a website URL.",
  },
  {
    title: "16 static types",
    body: "One-time codes that never need a server. Useful for packing and equipment labels.",
  },
  {
    title: "Biolink pages",
    body: "31 blocks to build a link-in-bio page behind one QR. A sibling to the VCARDe digital visiting card.",
  },
];

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "QR code generator", path: "/qr-code-generator" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "QR Code Generator — QRCodely",
          url: `${origin}/qr-code-generator`,
          about: {
            "@type": "SoftwareApplication",
            name: "QRCodely",
            url: site.links.qrcodely,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          },
          isPartOf: { "@id": `${origin}/#website` },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / QR code generator"}
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-caps text-accent">
          GNK Services · Chennai
        </p>
        <h1 className="mt-3 text-2xl text-fg">QR code generator — QRCodely</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          Every VCARDe NFC business card already carries an artistic QR for phones with NFC off.
          When you need more — menus, Wi‑Fi, app stores, posters, short links — use{" "}
          <a href={site.links.qrcodely} className="text-accent underline">
            QRCodely
          </a>
          , the QR code generator from parent company GNK Services.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Create the code at{" "}
          <a href={site.links.qrcodely} className="text-accent underline">
            qrcodely.net
          </a>
          , download a print-ready file, and we can place it on an NFC business card, a Google
          review stand, or a poster.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.qrcodely}>Open QRCodely</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-vs-qr">NFC vs QR on a business card</Link>
          </Button>
        </div>

        <h2 className="mt-14 text-xl text-fg">QRCodely features</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <article key={f.title} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="text-sm font-medium tracking-tight text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-14 text-xl text-fg">When to use QRCodely vs an NFC business card</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>
            Meeting people in person: order a{" "}
            <Link to="/nfc-business-cards" className="text-accent underline">
              VCARDe NFC business card
            </Link>
            . Tap is faster than a scan.
          </li>
          <li>
            Posters, packaging, menus, Wi‑Fi: generate the code on{" "}
            <a href={site.links.qrcodely} className="text-accent underline">
              QRCodely
            </a>
            .
          </li>
          <li>Both: we print your QRCodely file on the reverse of the NFC card next to the chip.</li>
        </ul>

        <p className="mt-8 text-sm text-fg-subtle">
          QRCodely is operated by {site.parent}. Create codes at{" "}
          <a href={site.links.qrcodely} className="text-accent underline">
            https://qrcodely.net/
          </a>
        </p>
      </article>
    </PageShell>
  );
}
