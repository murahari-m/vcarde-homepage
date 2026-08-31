import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { TemplatesGrid } from "@/components/home/templates-grid";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { originalTemplates, site } from "@/lib/site";

export const Route = createFileRoute("/templates")({
  head: () =>
    pageHead(
      "43 Digital Visiting Card Templates | VCARDe NFC Business Card",
      "Browse all 43 vCard templates. Pick a layout, publish a free profile, then print an NFC business card in Chennai that opens it on tap.",
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
          {originalTemplates.length} digital visiting card templates.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          Every layout ships with the VCARDe builder. Publish a free profile, then print an NFC
          business card that opens it on tap. WhatsApp store themes are included.
        </p>
        <Button className="mt-6" asChild>
          <a href={site.links.login}>Create a free card</a>
        </Button>
      </section>
      <TemplatesGrid catalog />
    </PageShell>
  );
}
