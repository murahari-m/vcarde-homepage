import { Reveal } from "@/components/home/reveal";

const cases = [
  {
    title: "Events and seminars",
    body: "Skip the paper stack. Hand someone an NFC business card, they tap, and your contact is on their phone before the next talk starts.",
    href: "/nfc-business-cards",
  },
  {
    title: "Sales teams",
    body: "One PVC NFC business card per person from ₹499. Update the role or number in the dashboard — nobody reprints when a number changes.",
    href: "/pvc-nfc-business-card",
  },
  {
    title: "Founders and CXOs",
    body: "A metal NFC business card feels like a product, not a flyer. Gold foil and steel, your brand only, no VCARDe mark on the face.",
    href: "/metal-nfc-business-card",
  },
  {
    title: "Shops and Google reviews",
    body: "Stand a review card at the counter. A tap opens your Google review page. Horizontal and vertical NFC review cards from ₹299.",
    href: "/nfc-google-reviews",
  },
];

export function UseCases() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-caps text-accent">Who uses it</p>
          <h2 className="mt-3 max-w-xl text-xl text-fg">
            NFC business cards for events, teams, founders, and shops
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 60}>
              <a
                href={c.href}
                className="block h-full rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <h3 className="text-sm font-medium tracking-tight text-fg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
