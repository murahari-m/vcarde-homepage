import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { NearYou } from "@/components/home/near-you";
import { chennaiAreas, indiaCities, serviceAreas } from "@/lib/chennai-areas";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-card-near")({
  head: () =>
    pageHead(
      "Buy NFC Card near Mylapore, Tambaram, ECR | Delivered across India | VCARDe",
      "Buy an NFC business card near you. Printed in Mylapore, Chennai. Free delivery across Chennai (25+ areas) and major cities in India — Mumbai, Delhi, Bengaluru, Hyderabad, Pune and more.",
      "/nfc-card-near",
    ),
  component: Page,
});

function AreaList({ items }: { items: typeof serviceAreas }) {
  return (
    <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
      {items.map((a) => (
        <li key={a.slug}>
          <Link
            to="/nfc-card-near/$area"
            params={{ area: a.slug }}
            className="flex items-center justify-between px-4 py-3 text-sm text-fg hover:bg-surface"
          >
            <span>{a.headline}</span>
            <span className="text-xs text-fg-subtle">{a.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC card near you", path: "/nfc-card-near" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "NFC business cards near Chennai and across India",
          url: `${origin}/nfc-card-near`,
          numberOfItems: serviceAreas.length,
          itemListElement: serviceAreas.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.headline,
            url: `${origin}/nfc-card-near/${a.slug}`,
          })),
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / NFC card near you"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">Buy NFC card near you — Chennai and India</h1>
        <div className="mt-6">
          <NearYou />
        </div>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          We print at {site.address}. One studio, free shipping anywhere in India. Pickup in
          Mylapore. Open your area or city for local notes.
        </p>
        <h2 className="mt-12 text-xl text-fg">Chennai ({chennaiAreas.length} areas)</h2>
        <AreaList items={chennaiAreas} />
        <h2 className="mt-12 text-xl text-fg">Major cities in India ({indiaCities.length})</h2>
        <p className="mt-3 text-sm text-fg-muted">
          Same prices. Printed in Chennai. Delivered free to your city.
        </p>
        <AreaList items={indiaCities} />
      </article>
    </PageShell>
  );
}
