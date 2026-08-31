"use client";

import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { TemplateCard } from "@/components/home/template-card";
import { Button } from "@/components/ui/button";
import { originalTemplates, site, storeTemplates, studioTemplates } from "@/lib/site";
import type { ShowcaseCard } from "@/lib/site";

function Card({ tpl, i, href }: { tpl: ShowcaseCard; i: number; href: string }) {
  return (
    <Reveal delay={(i % 4) * 40}>
      {href === "/templates" ? (
        <Link
          to="/templates"
          className="group block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
        >
          <TemplateCard tpl={tpl} compact />
          <div className="flex items-center justify-between px-3 py-3">
            <p className="text-sm text-fg">{tpl.name}</p>
            <ArrowUpRight className="size-3.5 text-fg-subtle transition-colors group-hover:text-accent" />
          </div>
        </Link>
      ) : (
        <a
          href={href}
          className="group block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
        >
          <TemplateCard tpl={tpl} compact />
          <div className="flex items-center justify-between px-3 py-3">
            <p className="text-sm text-fg">{tpl.name}</p>
            <ArrowUpRight className="size-3.5 text-fg-subtle transition-colors group-hover:text-accent" />
          </div>
        </a>
      )}
    </Reveal>
  );
}

function Grid({
  items,
  limit,
  href,
}: {
  items: readonly ShowcaseCard[];
  limit?: number;
  href: string;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <div className="tpl-grid">
      {shown.map((tpl, i) => (
        <Card key={`${tpl.kind}-${tpl.id}`} tpl={tpl} i={i} href={href} />
      ))}
    </div>
  );
}

export function TemplatesGrid({ catalog = false }: { catalog?: boolean }) {
  return (
    <section id="templates" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {!catalog ? (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-caps text-accent">App templates</p>
                <h2 className="mt-3 max-w-lg text-xl text-fg">
                  43 profile layouts in the VCARDe builder.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <Button variant="outline" asChild>
                  <Link to="/templates">
                    View all 43
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>
            <Grid items={originalTemplates} limit={4} href="/templates" />
            <div className="mt-6 sm:hidden">
              <Button className="w-full" asChild>
                <Link to="/templates">Show more templates</Link>
              </Button>
            </div>

            <Reveal className="mt-16">
              <p className="text-xs font-medium uppercase tracking-caps text-accent">Studio layouts</p>
              <h2 className="mt-3 max-w-lg text-xl text-fg">
                Pair a printed NFC card with a live profile.
              </h2>
            </Reveal>
            <Grid items={studioTemplates} limit={4} href="/templates" />

            <Reveal className="mt-16">
              <p className="text-xs font-medium uppercase tracking-caps text-accent">WhatsApp stores</p>
              <h2 className="mt-3 max-w-lg text-xl text-fg">
                Catalog pages that take orders on WhatsApp.
              </h2>
            </Reveal>
            <Grid items={storeTemplates} limit={4} href="/templates" />
          </>
        ) : (
          <>
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-caps text-accent">App templates</p>
              <h2 className="mt-3 max-w-lg text-xl text-fg">All 43 builder layouts.</h2>
              <p className="mt-3 max-w-xl text-sm text-fg-muted">
                Each design is a live vCard theme. Pick one, publish your profile, then tap an NFC
                card to open it.
              </p>
            </Reveal>
            <Grid items={originalTemplates} href={site.links.login} />

            <Reveal className="mt-16">
              <p className="text-xs font-medium uppercase tracking-caps text-accent">Studio layouts</p>
              <h2 className="mt-3 max-w-lg text-xl text-fg">Printed-card looks.</h2>
            </Reveal>
            <Grid items={studioTemplates} href={site.links.login} />

            <Reveal className="mt-16">
              <p className="text-xs font-medium uppercase tracking-caps text-accent">WhatsApp stores</p>
              <h2 className="mt-3 max-w-lg text-xl text-fg">Catalog themes.</h2>
            </Reveal>
            <Grid items={storeTemplates} href={site.links.login} />
          </>
        )}
      </div>
    </section>
  );
}
