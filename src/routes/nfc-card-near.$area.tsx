import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { areaBySlug } from "@/lib/chennai-areas";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-card-near/$area")({
  loader: ({ params }) => {
    const area = areaBySlug(params.area);
    if (!area) throw notFound();
    return area;
  },
  head: ({ loaderData }) => {
    const area = loaderData;
    if (!area) {
      return pageHead("NFC card near you | VCARDe", "NFC business cards in Chennai.", "/nfc-card-near");
    }
    return pageHead(
      `${area.title} | VCARDe NFC Business Cards`,
      `${area.headline}. Printed in Mylapore, Chennai. PVC from ₹499, Google review cards from ₹299. Free shipping. Parent company GNK Services.`,
      `/nfc-card-near/${area.slug}`,
    );
  },
  component: Page,
});

function Page() {
  const area = Route.useLoaderData();
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "NFC card near you", path: "/nfc-card-near" },
          { name: area.name, path: `/nfc-card-near/${area.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `NFC business card ${area.name}`,
          serviceType: "NFC business card printing",
          url: `${origin}/nfc-card-near/${area.slug}`,
          areaServed: { "@type": "Place", name: `${area.name}, Chennai` },
          provider: { "@type": "LocalBusiness", name: site.name, address: site.address },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: "299",
            highPrice: "1499",
          },
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/nfc-card-near" className="hover:text-fg">
            NFC card near you
          </Link>
          {` / ${area.name}`}
        </p>
        <h1 className="mt-6 text-2xl text-fg">{area.headline}</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">{area.intro}</p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">{area.extra}</p>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          PVC NFC business card from ₹499. Google review NFC card from ₹299. Metal from
          ₹1,499. We print in Mylapore, Chennai, and deliver free anywhere in India. No
          monthly fee. Recipients do not need an app.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Shop NFC cards</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={site.links.whatsapp}>WhatsApp for {area.name} delivery</a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-fg-subtle">
          Studio: {site.address}. Parent company {site.parent}.
        </p>
      </article>
    </PageShell>
  );
}
