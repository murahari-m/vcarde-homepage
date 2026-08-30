import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="rounded-xl border border-border bg-surface px-6 py-12 text-center sm:px-12">
            <h2 className="mx-auto max-w-lg text-xl text-fg">
              Make the card once. Hand it out for years.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-fg-muted">
              Start with a free digital profile. Add a printed NFC card when you want the tap.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href={site.links.register}>
                  Create your free card
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={site.links.nfcShop}>Browse NFC designs</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
