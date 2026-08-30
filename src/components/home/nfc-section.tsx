import { ArrowUpRight, Check } from "lucide-react";
import { NfcExplode } from "@/components/home/nfc-explode";
import { Reveal } from "@/components/home/reveal";
import { Button } from "@/components/ui/button";
import { nfcProducts, site } from "@/lib/site";

const perks = [
  "No VCARDe branding on the printed card",
  "No app required on Android or iOS",
  "Artistic QR for phones without NFC",
  "5-year warranty, free shipping in India",
  "Metal, bamboo, and PVC options",
  "Profile updates instantly after you edit",
];

export function NfcSection() {
  return (
    <section id="nfc" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-caps text-accent">Printed NFC</p>
            <h2 className="mt-3 text-xl text-fg">Five layers. One tap.</h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Every VCARDe card is a CR80 stack: lamination, printed PVC, an NTAG inlay, a
              rigid core, and a sealed reverse. Hover a layer. The chip sits inside the
              card, not on it — so the face is your brand only.
            </p>
            <ul className="mt-6 space-y-2.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-fg-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={site.links.nfcShop}>
                  Shop NFC cards
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={site.links.whatsapp}>WhatsApp us</a>
              </Button>
            </div>
          </Reveal>
          <NfcExplode />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {nfcProducts.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 60}>
              <a
                href={p.href}
                className="group block overflow-hidden rounded-lg border border-border bg-surface"
              >
                <div className="aspect-card overflow-hidden bg-surface-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                    width={480}
                    height={360}
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="text-sm text-fg">{p.name}</p>
                  <p className="mt-0.5 text-xs text-fg-subtle">
                    {p.price} · {p.material}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
