import { Reveal } from "@/components/home/reveal";

const steps = [
  {
    n: "01",
    title: "Create a free profile",
    body: "Sign up, pick a template, add photo, number, socials, and services. Your public page is live in minutes.",
  },
  {
    n: "02",
    title: "Share by tap, QR, or link",
    body: "Send the URL, show the QR, or tap a printed NFC card. The other person needs no app.",
  },
  {
    n: "03",
    title: "Change details later",
    body: "New number, new role, new design — edit once in the dashboard. Every future tap stays current.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-caps text-accent">How it works</p>
        <h2 className="mt-3 max-w-lg text-xl text-fg">Three steps. Then you never reprint a paper card.</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 80}>
            <article className="h-full rounded-xl border border-border bg-surface p-6">
              <p className="font-mono text-xs text-accent">{step.n}</p>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
          <img
            src="/nfc/dashboard.png"
            alt="VCARDe dashboard with active cards, enquiries, and appointments"
            className="w-full object-cover object-top"
            width={1400}
            height={720}
          />
        </div>
        <p className="mt-3 text-center text-xs text-fg-subtle">
          Your dashboard — cards, enquiries, appointments, and visitor stats in one place.
        </p>
      </Reveal>
    </section>
  );
}
