import { MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { PlaceMap } from "@/components/home/place-map";
import { site } from "@/lib/site";

export function ContactMap() {
  return (
    <section id="visit" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-caps text-accent">Visit</p>
          <h2 className="mt-3 text-xl text-fg">VCARDe NFC Business Cards, Mylapore</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
            Print studio and office at {site.address}. Parent company {site.parent} handles
            foil, UV, and NFC print.
          </p>
          <p className="mt-6 flex items-start gap-2 text-sm text-fg">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
            {site.address}
          </p>
          <ul className="mt-4 space-y-2">
            {site.phones.map((p) => (
              <li key={p.raw}>
                <a href={p.tel} className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
                  <Phone className="size-4 text-accent" />
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <div className="overflow-hidden rounded-xl border border-border">
            <PlaceMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
