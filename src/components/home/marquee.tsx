import { marqueeCards } from "@/lib/site";
import { TemplateCard } from "@/components/home/template-card";

export function TemplateMarquee() {
  const row = [...marqueeCards, ...marqueeCards];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track marquee-track-long">
        {row.map((tpl, i) => (
          <figure key={`${tpl.kind}-${tpl.id}-${i}`} className="marquee-item">
            <TemplateCard tpl={tpl} compact />
            <figcaption>
              {tpl.name}
              {tpl.kind === "store" ? " · store" : tpl.kind === "original" ? " · profile" : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
