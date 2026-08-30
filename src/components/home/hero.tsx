import { ArrowRight, Nfc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardShowcase } from "@/components/home/card-showcase";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:pt-16">
        <div className="hero-stagger max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-caps text-accent">
            NFC business cards · Mylapore, Chennai
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-fg">
            NFC business card that shares your contact in one tap.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
            Order a printed NFC business card from {site.city}, or start with a free
            digital visiting card. Recipients tap, scan, or open a link. No app
            for them. Update details anytime without reprinting.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href={site.links.nfcShop}>
                Shop NFC cards
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={site.links.login}>
                <Nfc className="size-4" />
                Create free digital card
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-fg-subtle">
            From ₹499 · Free shipping in India · 5-year warranty · No VCARDe logo on the card
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-2 pb-1 pt-4 sm:px-4">
        <CardShowcase />
      </div>
    </section>
  );
}
