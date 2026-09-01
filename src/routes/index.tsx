import { createFileRoute } from "@tanstack/react-router";
import { ContactMap } from "@/components/home/contact-map";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { TemplateMarquee } from "@/components/home/marquee";
import { NfcSection } from "@/components/home/nfc-section";
import { ReviewSection } from "@/components/home/review-section";
import { ProofBar } from "@/components/home/proof-bar";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { TemplatesGrid } from "@/components/home/templates-grid";
import { UseCases } from "@/components/home/use-cases";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessLd, pageHead } from "@/lib/seo";
import { faqs } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "NFC Business Card in India from ₹499 | Smart NFC Card | VCARDe",
      "Buy a custom NFC business card from ₹499. Tap to share contact, WhatsApp, and a live profile. PVC, metal, Google review cards. Free shipping in India. Printed in Chennai.",
      "/",
    ),
  component: Home,
});

function Home() {
  return (
    <div id="top" className="min-h-svh bg-bg">
      <JsonLd data={localBusinessLd} />
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
      <SiteHeader />
      <main>
        <Hero />
        <ProofBar />
        <TemplateMarquee />
        <HowItWorks />
        <UseCases />
        <TemplatesGrid />
        <NfcSection />
        <ReviewSection />
        <Features />
        <Faq />
        <ContactMap />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
