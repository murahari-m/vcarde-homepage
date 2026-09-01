import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { PlaceMap } from "@/components/home/place-map";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About VCARDe — NFC Business Card Printer in Chennai",
      "VCARDe makes NFC business cards and free digital visiting cards in Mylapore, Chennai, with GNK Services. Visit No.1/6, South Mada Street, Chennai 600004.",
      "/about",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About VCARDe", path: "/about" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${origin}/about`,
          name: "About VCARDe",
          mainEntity: { "@id": `${origin}/#business` },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / About"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">About VCARDe</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          VCARDe is a Chennai company that prints the NFC business card and hosts the free
          digital visiting card behind it. The press sits with our sister studio, GNK
          Services, at No.1/6, South Mada Street, Mylapore. We encode NTAG chips, print foil
          and UV, and ship anywhere in India.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          The digital profile is free. The printed NFC business card is optional. Recipients
          do not need an app. If a phone has no NFC, the QR on the same card opens the page.
        </p>

        <h2 className="mt-12 text-xl text-fg">Business listing details</h2>
        <p className="mt-3 text-sm text-fg-subtle">
          Use this block on Google Business, Justdial, IndiaMART, and Bing Places. Keep the
          name, address, and phones exactly the same.
        </p>
        <dl className="mt-5 divide-y divide-border rounded-lg border border-border text-sm">
          <Row label="Name" value="VCARDe" />
          <Row label="Category" value="NFC business card printer" />
          <Row label="Address" value={site.address} />
          <Row label="Phone" value={site.phones.map((p) => p.display).join(" · ")} />
          <Row label="Email" value={`${site.emailUser} [at] ${site.emailDomain}`} />
          <Row label="Website" value="https://vcarde.com" />
          <Row label="Shop" value="https://m.vcarde.com" />
          <Row label="Sister press" value="GNK Services" />
        </dl>

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <PlaceMap heightClass="place-map-sm" />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.maps}>Open in Google Maps</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-business-cards">NFC Business Card</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-3 sm:grid-cols-4">
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="col-span-2 text-fg sm:col-span-3">{value}</dd>
    </div>
  );
}
