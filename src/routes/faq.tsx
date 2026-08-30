import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Faq } from "@/components/home/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "NFC Business Card FAQ — Price, iPhone, App | VCARDe",
      "FAQ on the NFC business card: price in India, iPhone support, whether an app is needed, warranty, branding, and how updates work after printing.",
      "/faq",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <h1 className="text-2xl text-fg">NFC business card FAQ</h1>
      </section>
      <Faq />
    </PageShell>
  );
}
