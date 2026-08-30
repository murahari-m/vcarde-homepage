"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { TemplateCard } from "@/components/home/template-card";
import { Button } from "@/components/ui/button";
import { originalTemplates, site, storeTemplates, studioTemplates } from "@/lib/site";
import type { ShowcaseCard } from "@/lib/site";

function pick<T>(items: readonly T[], n: number, seed: number): T[] {
  if (items.length <= n) return [...items];
  const arr = [...items];
  let s = Math.abs(seed) || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = Math.abs(Math.imul(s, 16807)) % 2147483647 || 1;
    const j = s % (i + 1);
    const a = arr[i];
    const b = arr[j];
    if (a === undefined || b === undefined) continue;
    arr[i] = b;
    arr[j] = a;
  }
  return arr.slice(0, n);
}

function Grid({ items, seed }: { items: readonly ShowcaseCard[]; seed: number }) {
  const [open, setOpen] = useState(false);
  const preview = useMemo(() => pick(items, 2, seed), [items, seed]);
  const rest = useMemo(
    () => items.filter((item) => preview.every((p) => p.id !== item.id)),
    [items, preview],
  );

  return (
    <>
      <div className="tpl-grid">
        {preview.map((tpl, i) => (
          <Reveal key={`${tpl.kind}-${tpl.id}`} delay={(i % 4) * 40}>
            <a
              href={site.links.templates}
              className="group block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <TemplateCard tpl={tpl} compact />
              <div className="flex items-center justify-between px-3 py-3">
                <p className="text-sm text-fg">{tpl.name}</p>
                <ArrowUpRight className="size-3.5 text-fg-subtle transition-colors group-hover:text-accent" />
              </div>
            </a>
          </Reveal>
        ))}
        {rest.map((tpl) => (
          <div key={`${tpl.kind}-${tpl.id}`} className={open ? undefined : "max-sm:hidden"}>
            <a
              href={site.links.templates}
              className="group block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <TemplateCard tpl={tpl} compact />
              <div className="flex items-center justify-between px-3 py-3">
                <p className="text-sm text-fg">{tpl.name}</p>
                <ArrowUpRight className="size-3.5 text-fg-subtle transition-colors group-hover:text-accent" />
              </div>
            </a>
          </div>
        ))}
      </div>
      {rest.length > 0 ? (
        <div className="mt-5 sm:hidden">
          <Button variant="outline" className="w-full" onClick={() => setOpen((v) => !v)}>
            {open ? "Show less" : `Show more (${rest.length})`}
          </Button>
        </div>
      ) : null}
    </>
  );
}

export function TemplatesGrid() {
  return (
    <section id="templates" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-caps text-accent">vCard templates</p>
            <h2 className="mt-3 max-w-lg text-xl text-fg">
              Studio layouts that pair with a printed NFC card.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Button variant="outline" asChild>
              <a href={site.links.templates}>
                View all templates
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
        <Grid items={studioTemplates} seed={11} />

        <Reveal className="mt-16">
          <p className="text-xs font-medium uppercase tracking-caps text-accent">App templates</p>
          <h2 className="mt-3 max-w-lg text-xl text-fg">
            Profile layouts that ship with the VCARDe builder.
          </h2>
        </Reveal>
        <Grid items={originalTemplates} seed={23} />

        <Reveal className="mt-16">
          <p className="text-xs font-medium uppercase tracking-caps text-accent">WhatsApp stores</p>
          <h2 className="mt-3 max-w-lg text-xl text-fg">
            Catalog pages that take orders on WhatsApp — grocery, jewels, travel, and more.
          </h2>
        </Reveal>
        <Grid items={storeTemplates} seed={41} />
      </div>
    </section>
  );
}
