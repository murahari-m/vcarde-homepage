import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { Button } from "@/components/ui/button";
import { reviewHorizontal, reviewVertical, site } from "@/lib/site";

function Rail({
  items,
  kind,
}: {
  items: { id: string; file: string; name: string }[];
  kind: "h" | "v";
}) {
  const row = [...items, ...items];
  return (
    <div className="review-rail" aria-hidden>
      <div className={`review-track ${kind === "v" ? "review-track-v" : ""}`}>
        {row.map((card, i) => (
          <a
            key={`${card.id}-${i}`}
            href={site.links.nfcShop}
            className={kind === "h" ? "review-h" : "review-v"}
          >
            <div className="frame">
              <img
                src={card.file}
                alt=""
                width={kind === "h" ? 480 : 264}
                height={kind === "h" ? 282 : 420}
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ReviewSection() {
  return (
    <section id="reviews" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-caps text-accent">Google Review cards</p>
            <h2 className="mt-3 max-w-lg text-xl text-fg">
              Horizontal and vertical NFC cards that open your Google reviews on tap.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg-muted">
              Leave a card at the counter. Guests tap, rate, and you collect reviews without
              an app. From ₹299. Printed in Mylapore by GNK Services.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Button variant="outline" asChild>
              <a href={site.links.nfcShop}>
                Shop review cards
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
      <div className="pb-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-caps text-fg-subtle">Horizontal · 85.6 × 54 mm</p>
        </div>
        <Rail items={reviewHorizontal} kind="h" />
      </div>
      <div className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-caps text-fg-subtle">Vertical · 54 × 85.6 mm</p>
        </div>
        <Rail items={reviewVertical} kind="v" />
      </div>
    </section>
  );
}
