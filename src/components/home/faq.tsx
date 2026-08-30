import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-caps text-accent">FAQ</p>
          <h2 className="mt-3 text-xl text-fg">Straight answers before you print anything.</h2>
        </Reveal>
        <Reveal delay={80}>
          <Accordion.Root type="single" collapsible className="divide-y divide-border border-y border-border">
            {faqs.map((item) => (
              <Accordion.Item key={item.q} value={item.q}>
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-fg">
                    {item.q}
                    <Plus className="size-4 shrink-0 text-fg-subtle transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                  <p className="pb-4 text-sm leading-relaxed text-fg-muted">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
