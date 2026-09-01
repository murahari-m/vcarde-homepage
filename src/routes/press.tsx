import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { EmailLink } from "@/components/home/email-link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, origin, pageHead } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/press")({
  head: () =>
    pageHead(
      "Press kit — VCARDe NFC Business Card, Chennai",
      "Boilerplate, logo, and facts for journalists and directories covering VCARDe, the NFC business card printer in Mylapore, Chennai.",
      "/press",
    ),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Press kit", path: "/press" },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs text-fg-subtle">
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
          {" / Press"}
        </p>
        <h1 className="mt-6 text-2xl text-fg">Press kit</h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          Use this page if you are writing about NFC business cards in India or listing
          VCARDe in a directory. Copy the boilerplate as-is. Do not add a VCARDe logo to
          the physical card in photos — our printed cards carry the customer’s brand only.
        </p>

        <h2 className="mt-12 text-xl text-fg">Boilerplate</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          VCARDe NFC Business Cards is a Chennai brand of parent company GNK
          Services. We print the NFC business card and host the free digital visiting card
          behind it at No.1/6, South Mada Street, Mylapore, Chennai - 600004. PVC starts at
          ₹499. Google review NFC cards start at ₹299. Shipping is free in India. Recipients
          tap a phone — no app required. Website: https://vcarde.com · Shop: https://m.vcarde.com
        </p>

        <h2 className="mt-12 text-xl text-fg">Facts</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-fg-muted">
          <li>Product: NFC business card (PVC, bamboo, metal) + free digital profile</li>
          <li>Chip: NTAG 213, five-layer inlay, 5-year warranty</li>
          <li>Price from: ₹499 · free shipping in India</li>
          <li>Phones: {site.phones[0].display} · {site.phones[1].display}</li>
          <li>
            Email: {site.emailUser} [at] {site.emailDomain}
          </li>
          <li>Logo: {origin}/brand/logo-vcarde.png</li>
        </ul>

        <p className="mt-8 text-sm text-fg-subtle">
          Press and listing queries: <EmailLink className="text-accent underline" />
        </p>
      </article>
    </PageShell>
  );
}
