import { CountUp } from "@/components/home/count-up";

export function ProofBar() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        <div className="bg-bg px-4 py-6 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-fg">
            <CountUp to={30} suffix="+" />
          </p>
          <p className="mt-1 text-xs uppercase tracking-label text-fg-subtle">vCard templates</p>
        </div>
        <div className="bg-bg px-4 py-6 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-fg">
            ₹<CountUp to={499} />
          </p>
          <p className="mt-1 text-xs uppercase tracking-label text-fg-subtle">NFC cards from</p>
        </div>
        <div className="bg-bg px-4 py-6 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-fg">
            <CountUp to={5} /> yr
          </p>
          <p className="mt-1 text-xs uppercase tracking-label text-fg-subtle">chip warranty</p>
        </div>
        <div className="bg-bg px-4 py-6 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-fg">India</p>
          <p className="mt-1 text-xs uppercase tracking-label text-fg-subtle">free shipping</p>
        </div>
      </div>
    </section>
  );
}
