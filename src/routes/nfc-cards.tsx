import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/nfc-cards")({
  head: () =>
    pageHead(
      "NFC Card vs NFC Business Card — Price in India | VCARDe",
      "What is an NFC card? How an NFC business card works, NFC vs QR, materials, warranty, and NFC card price in India from ₹499. Free shipping from Chennai.",
      "/nfc-cards",
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
          mainEntity: [
            {
              "@type": "Question",
              name: "What are NFC cards?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "NFC cards are plastic, metal, or wood cards with a near-field communication chip. Tapping the card on a phone opens a link — usually a digital business card.",
              },
            },
            {
              "@type": "Question",
              name: "What is the NFC card price in India?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "VCARDe NFC cards start at ₹499 for PVC, ₹799 for bamboo, and ₹1,499 for metal, with free shipping in India.",
              },
            },
          ],
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-caps text-accent">NFC cards</p>
        <h1 className="mt-3 text-2xl text-fg">NFC cards and the NFC business card, explained.</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          NFC means near-field communication. The same idea as a contactless debit card.
          An NFC card from VCARDe holds a chip that opens your digital visiting card when
          it is held against a phone. Most Android phones and current iPhones can read it.
          Phones without NFC can scan the artistic QR printed on the same card.
        </p>
        <h2 className="mt-10 text-xl text-fg">NFC cards vs paper visiting cards</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Paper cards die when your number changes. An NFC card points at a live page.
          You edit the page. The next tap is current. You also stop reprinting boxes of
          stock that go in a drawer.
        </p>
        <h2 className="mt-10 text-xl text-fg">NFC vs QR</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          QR needs the camera. NFC is a tap. VCARDe prints both on the same card so older
          phones are not left out. Designer QR artwork is a VCARDe offering in India.
        </p>
        <h2 className="mt-10 text-xl text-fg">NFC card price in India</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>PVC NFC cards from ₹499</li>
          <li>Bamboo NFC cards from ₹799</li>
          <li>Metal NFC cards from ₹1,499</li>
          <li>AI QR / artistic designs from ₹1,199</li>
          <li>Google review NFC cards from ₹599</li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Free shipping across India. 5-year warranty on printed NFC cards. Typical delivery
          is 5–7 business days. Shop from{" "}
          <a className="text-accent underline" href={site.links.nfc}>
            m.vcarde.com
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={site.links.nfcShop}>Buy NFC cards</a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/nfc-business-cards">NFC business cards</Link>
          </Button>
        </div>
      </article>
    </PageShell>
  );
}
