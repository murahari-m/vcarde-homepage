import { site, socials } from "@/lib/site";

export const origin = "https://vcarde.com";
export const ogImage = `${origin}/og.jpg`;

export function pageHead(title: string, description: string, path: string) {
  const url = `${origin}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "VCARDe" },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Chennai" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "VCARDe NFC business cards from ₹499, printed in Chennai" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: "VCARDe" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: "VCARDe NFC business cards from ₹499, printed in Chennai" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${origin}/#org`,
      name: "VCARDe",
      url: origin,
      logo: `${origin}/brand/logo-vcarde.png`,
      telephone: site.phones[0].raw,
      sameAs: [
        "https://m.vcarde.com/",
        "https://www.gnkservices.in/",
        ...socials.map((s) => s.href),
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${origin}/#business`,
      name: "VCARDe",
      image: ogImage,
      description:
        "NFC business card printer and digital visiting card platform in Mylapore, Chennai. Custom NFC visiting cards from ₹499 with free shipping in India.",
      url: origin,
      telephone: site.phones[0].raw,
      priceRange: "₹499–₹1499",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.street,
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: site.postalCode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.lat,
        longitude: site.lng,
      },
      hasMap: site.links.maps,
      areaServed: { "@type": "Country", name: "India" },
      parentOrganization: { "@id": `${origin}/#org` },
    },
    {
      "@type": "Product",
      "@id": `${origin}/nfc-business-cards#product`,
      name: "NFC Business Card",
      alternateName: ["NFC visiting card", "NFC card", "Digital business card"],
      brand: { "@type": "Brand", name: "VCARDe" },
      image: [`${origin}/cards/vcarde-cmyk.jpg`, `${origin}/cards/lotus-front.jpg`],
      description:
        "Custom NFC business card with an NTAG chip. Tap a phone to open a live digital visiting card. Printed in Chennai. PVC from ₹499, free shipping in India.",
      category: "NFC Business Card",
      material: "PVC, bamboo, metal",
      countryOfOrigin: "IN",
      offers: {
        "@type": "AggregateOffer",
        url: `${origin}/nfc-business-cards`,
        priceCurrency: "INR",
        lowPrice: "499",
        highPrice: "1499",
        offerCount: "6",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: "VCARDe",
      publisher: { "@id": `${origin}/#org` },
      inLanguage: "en-IN",
    },
  ],
};

export function productLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "NFC Business Card",
    sku: "VCARDE-NFC",
    brand: { "@type": "Brand", name: "VCARDe" },
    image: `${origin}/cards/vcarde-cmyk.jpg`,
    description:
      "Custom NFC business card printed in Chennai. Tap to share contact, WhatsApp, and a live profile. No app required. From ₹499 with free shipping in India.",
    offers: {
      "@type": "AggregateOffer",
      url: `${origin}/nfc-business-cards`,
      priceCurrency: "INR",
      lowPrice: "499",
      highPrice: "1499",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "VCARDe" },
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export function howToLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use an NFC business card",
    description: "Share your contact with an NFC business card in three steps.",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Create a free digital card",
        text: "Sign up on VCARDe and add your name, phone, and links. The digital visiting card is free.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Order your NFC business card",
        text: "Pick PVC, bamboo, or metal. We print and encode the chip in Mylapore, Chennai, and ship free in India.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Tap to share",
        text: "Hold the NFC business card to the back of a phone. The live profile opens. No app for the recipient.",
      },
    ],
  };
}
