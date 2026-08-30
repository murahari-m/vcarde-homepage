import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { TemplatesGrid } from "@/components/home/templates-grid";
import { TemplateMarquee } from "@/components/home/marquee";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/templates")({
  head: () =>
    pageHead(
      "Digital Visiting Card Templates for NFC Business Card | VCARDe",
      "Pick a digital visiting card layout, then pair it with a printed NFC business card from Chennai. Free profile. WhatsApp store templates included.",
      "/templates",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-caps text-accent">Templates</p>
        <h1 className="mt-3 max-w-2xl text-2xl text-fg">
          Digital visiting cards and WhatsApp stores.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          Pick a vCard layout or a WhatsApp catalog, publish a free profile, then print an
          NFC business card that opens it on tap. Sample cards use Indian names and VCARDe
          numbers so you can see a live-looking page.
        </p>
        <Button className="mt-6" asChild>
          <a href={site.links.login}>Create a free card</a>
        </Button>
      </section>
      <div className="mt-12">
        <TemplateMarquee />
      </div>
      <TemplatesGrid />
    </PageShell>
  );
}
