import {
  ChartNoAxesColumn,
  Link2,
  Lock,
  QrCode,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/home/reveal";

const features = [
  {
    icon: RefreshCw,
    title: "Edit anytime, no reprint",
    body: "Phone, title, links, and design live on your profile. The printed card never goes stale.",
  },
  {
    icon: Smartphone,
    title: "No app for the other person",
    body: "NFC tap or QR scan opens in the browser. They can save a vCard file in one step.",
  },
  {
    icon: QrCode,
    title: "Artistic QR, first in India",
    body: "Designer QR codes for phones without NFC. Same destination as the chip.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "See who viewed you",
    body: "Dashboard stats for device, browser, and platform so you know what is working.",
  },
  {
    icon: Link2,
    title: "More than a name and number",
    body: "Banner, services, gallery, appointments, products, WhatsApp, and enquiry forms.",
  },
  {
    icon: Lock,
    title: "Password and privacy options",
    body: "Lock a profile when you need to, and keep data on encrypted NFC exchange.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-caps text-accent">Product</p>
          <h2 className="mt-3 max-w-lg text-xl text-fg">Built for people who still meet in person.</h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 60}>
              <article className="h-full rounded-xl border border-border bg-surface p-5">
                <f.icon className="size-4 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 text-sm font-medium tracking-tight text-fg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
