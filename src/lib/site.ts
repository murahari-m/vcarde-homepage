export const site = {
  name: "VCARDe NFC Business Cards",
  shortName: "VCARDe",
  parent: "GNK Services",
  sister: "GNK Services",
  city: "Chennai",
  address: "No.1/6, South Mada Street, Mylapore, Chennai - 600004",
  street: "No.1/6, South Mada Street, Mylapore",
  postalCode: "600004",
  lat: 13.0323753,
  lng: 80.2693363,
  phones: [
    { display: "+91 79 04 72 19 39", tel: "tel:+917904721939", raw: "+917904721939" },
    { display: "+91 96 00 93 32 58", tel: "tel:+919600933258", raw: "+919600933258" },
  ],
  phoneDisplay: "+91 79 04 72 19 39",
  phoneDisplayAlt: "+91 96 00 93 32 58",
  owner: "Kokila B",
  role: "Owner / Designer",
  emailUser: "cc",
  emailDomain: "vcarde.com",
  links: {
    home: "/",
    login: "https://vcarde.com/login",
    register: "https://vcarde.com/login",
    templates: "/templates",
    faq: "https://vcarde.com/faq",
    nfc: "https://m.vcarde.com/",
    nfcShop: "https://m.vcarde.com/shop/",
    qrcodely: "https://qrcodely.net/",
    whatsapp: "https://wa.me/919600933258",
    phone: "tel:+917904721939",
    phoneAlt: "tel:+919600933258",
    maps: "https://www.google.com/maps?q=No.1/6,+South+Mada+Street,+Mylapore,+Chennai+600004",
    mapsEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=80.2643%2C13.0274%2C80.2743%2C13.0374&layer=mapnik&marker=13.0323753%2C80.2693363",
  },
} as const;

export const socials = [
  { label: "X", href: "https://x.com/gnk_services" },
  { label: "Facebook", href: "https://www.facebook.com/vCARDeNFC/" },
  { label: "Instagram", href: "https://www.instagram.com/vcardeNFC" },
  { label: "YouTube", href: "https://www.youtube.com/@gnkservices?sub_confirmation=1" },
] as const;

export const goldCards = [
  { id: "mark", name: "Mark VCARDe", file: "/cards/vcarde-cmyk.jpg", brand: "VCARDe · NFC" },
  { id: "lotus", name: "Lotus", file: "/cards/lotus-front.jpg", brand: "GNK · gold foil" },
  { id: "ruby", name: "Ruby", file: "/cards/lotus-contact.jpg", brand: "GNK · jewellery" },
  { id: "scan", name: "Scan", file: "/cards/vcarde-kokila.jpg", brand: "VCARDe · QR" },
  { id: "mesh", name: "Mesh", file: "/cards/gnk-web-front.jpg", brand: "GNK · foil" },
  { id: "gear", name: "Gear", file: "/cards/gnk-nfc-print.jpg", brand: "GNK · NFC print" },
  { id: "gown", name: "Gown", file: "/cards/gnk-fashion-dress.jpg", brand: "GNK · spot UV" },
  { id: "port", name: "Port", file: "/cards/gnk-fashion-qr.jpg", brand: "GNK · QR" },
] as const;

export type Person = {
  name: string;
  role: string;
  company: string;
};

export const studioTemplates = [
  { kind: "studio" as const, id: "vector", name: "Vector", overlay: false, person: { name: "Nikhil Joshi", role: "Engineer", company: "Vector Labs" } },
  { kind: "studio" as const, id: "atelier", name: "Atelier", overlay: false, person: { name: "Priya Krishnan", role: "Stylist", company: "Atelier Studio" } },
  { kind: "studio" as const, id: "helix", name: "Helix", overlay: true, person: { name: "Sana Qureshi", role: "Physician", company: "Helix Clinic" } },
  { kind: "studio" as const, id: "noir", name: "Noir", overlay: false, person: { name: "Ananya Reddy", role: "Creative lead", company: "Noir House" } },
  { kind: "studio" as const, id: "ledger", name: "Ledger", overlay: true, person: { name: "Vikram Nair", role: "Advocate", company: "Nair & Co" } },
  { kind: "studio" as const, id: "quill", name: "Quill", overlay: false, person: { name: "Karthik Sharma", role: "Educator", company: "Quill Hall" } },
  { kind: "studio" as const, id: "meridian", name: "Meridian", overlay: false, person: { name: "Aarav Menon", role: "Director", company: "Meridian" } },
  { kind: "studio" as const, id: "lumen", name: "Lumen", overlay: false, person: { name: "Meera Iyer", role: "Photographer", company: "Lumen Room" } },
  { kind: "studio" as const, id: "prism", name: "Prism", overlay: true, person: { name: "Rohan Shah", role: "Consultant", company: "Prism" } },
  { kind: "studio" as const, id: "atrium", name: "Atrium", overlay: true, person: { name: "Arjun Patel", role: "Host", company: "Atrium" } },
  { kind: "studio" as const, id: "sable", name: "Sable", overlay: false, person: { name: "Divya Rao", role: "Principal", company: "Sable" } },
  { kind: "studio" as const, id: "heritage", name: "Heritage", overlay: false, person: { name: "Ishita Banerjee", role: "Jeweller", company: "Banerjee" } },
] as const;

export const originalTemplates = [
  { kind: "original" as const, id: "vcard1", name: "Pulse", image: "/templates/vcard1.jpg" },
  { kind: "original" as const, id: "vcard2", name: "Nova", image: "/templates/vcard2.jpg" },
  { kind: "original" as const, id: "vcard3", name: "Atlas", image: "/templates/vcard3.jpg" },
  { kind: "original" as const, id: "vcard4", name: "Dusk", image: "/templates/vcard4.jpg" },
  { kind: "original" as const, id: "vcard5", name: "Board", image: "/templates/vcard5.jpg" },
  { kind: "original" as const, id: "vcard6", name: "Edge", image: "/templates/vcard6.jpg" },
  { kind: "original" as const, id: "vcard7", name: "Flint", image: "/templates/vcard7.jpg" },
  { kind: "original" as const, id: "vcard8", name: "Oak", image: "/templates/vcard8.jpg" },
  { kind: "original" as const, id: "vcard9", name: "Coral", image: "/templates/vcard9.jpg" },
  { kind: "original" as const, id: "vcard10", name: "Tide", image: "/templates/vcard10.jpg" },
  { kind: "original" as const, id: "vcard11", name: "Harbor", image: "/templates/vcard11.jpg" },
  { kind: "original" as const, id: "vcard12", name: "Byte", image: "/templates/vcard12.jpg" },
  { kind: "original" as const, id: "vcard13", name: "Brief", image: "/templates/vcard13.jpg" },
  { kind: "original" as const, id: "vcard14", name: "Marble", image: "/templates/vcard14.jpg" },
  { kind: "original" as const, id: "vcard15", name: "Quartz", image: "/templates/vcard15.jpg" },
  { kind: "original" as const, id: "vcard16", name: "Carbon", image: "/templates/vcard16.jpg" },
  { kind: "original" as const, id: "vcard17", name: "Runway", image: "/templates/vcard17.jpg" },
  { kind: "original" as const, id: "vcard18", name: "Drift", image: "/templates/vcard18.jpg" },
  { kind: "original" as const, id: "vcard19", name: "Vale", image: "/templates/vcard19.jpg" },
  { kind: "original" as const, id: "vcard20", name: "Ridge", image: "/templates/vcard20.jpg" },
  { kind: "original" as const, id: "vcard21", name: "Cove", image: "/templates/vcard21.jpg" },
  { kind: "original" as const, id: "vcard22", name: "Chalk", image: "/templates/vcard22.jpg" },
  { kind: "original" as const, id: "vcard23", name: "Ember", image: "/templates/vcard23.jpg" },
  { kind: "original" as const, id: "vcard24", name: "Slate", image: "/templates/vcard24.jpg" },
  { kind: "original" as const, id: "vcard25", name: "Ink", image: "/templates/vcard25.jpg" },
  { kind: "original" as const, id: "vcard26", name: "Fern", image: "/templates/vcard26.jpg" },
  { kind: "original" as const, id: "vcard27", name: "Petal", image: "/templates/vcard27.jpg" },
  { kind: "original" as const, id: "vcard28", name: "Grove", image: "/templates/vcard28.jpg" },
  { kind: "original" as const, id: "vcard29", name: "Dune", image: "/templates/vcard29.jpg" },
  { kind: "original" as const, id: "vcard30", name: "Mist", image: "/templates/vcard30.jpg" },
  { kind: "original" as const, id: "vcard31", name: "Halo", image: "/templates/vcard31.jpg" },
  { kind: "original" as const, id: "vcard32", name: "Forge", image: "/templates/vcard32.jpg" },
  { kind: "original" as const, id: "vcard33", name: "Lens", image: "/templates/vcard33.jpg" },
  { kind: "original" as const, id: "vcard34", name: "Apex", image: "/templates/vcard34.jpg" },
  { kind: "original" as const, id: "vcard35", name: "Orbit", image: "/templates/vcard35.jpg" },
  { kind: "original" as const, id: "vcard36", name: "Crest", image: "/templates/vcard36.jpg" },
  { kind: "original" as const, id: "vcard37", name: "North", image: "/templates/vcard37.jpg" },
  { kind: "original" as const, id: "vcard38", name: "Suite", image: "/templates/vcard38.jpg" },
  { kind: "original" as const, id: "vcard39", name: "Cipher", image: "/templates/vcard39.jpg" },
  { kind: "original" as const, id: "vcard40", name: "Mono", image: "/templates/vcard40.jpg" },
  { kind: "original" as const, id: "vcard41", name: "Folio", image: "/templates/vcard41.jpg" },
  { kind: "original" as const, id: "vcard42", name: "Nimbus", image: "/templates/vcard42.jpg" },
  { kind: "original" as const, id: "vcard43", name: "Solstice", image: "/templates/vcard43.jpg" },
] as const;

export const storeTemplates = [
  {
    kind: "store" as const,
    id: "bazaar",
    name: "Bazaar",
    cover: "/stores/bazaar.jpg",
    person: { name: "Ramesh Sundaram", role: "Grocer", company: "Sundaram Bazaar" },
    products: [
      { name: "Toor dal", price: "₹189" },
      { name: "Coconut oil", price: "₹240" },
    ],
  },
  {
    kind: "store" as const,
    id: "hearth",
    name: "Hearth",
    cover: "/stores/hearth.jpg",
    person: { name: "Lakshmi Kaveri", role: "Maker", company: "Kaveri Home" },
    products: [
      { name: "Ceramic vase", price: "₹1,200" },
      { name: "Linen throw", price: "₹890" },
    ],
  },
  {
    kind: "store" as const,
    id: "pitch",
    name: "Pitch",
    cover: "/stores/pitch.jpg",
    person: { name: "Imran Hussain", role: "Coach", company: "Deccan Sport" },
    products: [
      { name: "Cricket bat", price: "₹2,499" },
      { name: "Football", price: "₹799" },
    ],
  },
  {
    kind: "store" as const,
    id: "trail",
    name: "Trail",
    cover: "/stores/trail.jpg",
    person: { name: "Arun Nambiar", role: "Guide", company: "Malabar Trail" },
    products: [
      { name: "Duffle", price: "₹3,200" },
      { name: "Travel kit", price: "₹650" },
    ],
  },
  {
    kind: "store" as const,
    id: "circuit",
    name: "Circuit",
    cover: "/stores/circuit.jpg",
    person: { name: "Sneha Iyer", role: "Retailer", company: "Pixel Circuit" },
    products: [
      { name: "Earbuds", price: "₹1,999" },
      { name: "Cable pack", price: "₹349" },
    ],
  },
  {
    kind: "store" as const,
    id: "table",
    name: "Table",
    cover: "/stores/table.jpg",
    person: { name: "Devika Menon", role: "Chef", company: "Banana Leaf" },
    products: [
      { name: "Thali", price: "₹249" },
      { name: "Filter coffee", price: "₹60" },
    ],
  },
  {
    kind: "store" as const,
    id: "facet",
    name: "Facet",
    cover: "/covers/heritage.jpg",
    person: { name: "Fatima Noor", role: "Jeweller", company: "Noor Jewels" },
    products: [
      { name: "Gold studs", price: "₹12,400" },
      { name: "Chain", price: "₹8,200" },
    ],
  },
  {
    kind: "store" as const,
    id: "loom",
    name: "Loom",
    cover: "/covers/noir.jpg",
    person: { name: "Kavya Pillai", role: "Weaver", company: "Loom Room" },
    products: [
      { name: "Kanjeevaram", price: "₹8,900" },
      { name: "Cotton sari", price: "₹2,400" },
    ],
  },
  {
    kind: "store" as const,
    id: "bloom",
    name: "Bloom",
    cover: "/covers/atelier.jpg",
    person: { name: "Aditi Sharma", role: "Artist", company: "Bloom Beauty" },
    products: [
      { name: "Serum", price: "₹799" },
      { name: "Palette", price: "₹1,150" },
    ],
  },
] as const;

export type StudioTemplate = (typeof studioTemplates)[number];
export type OriginalTemplate = (typeof originalTemplates)[number];
export type StoreTemplate = (typeof storeTemplates)[number];
export type ShowcaseCard = StudioTemplate | OriginalTemplate | StoreTemplate;

export const marqueeCards: ShowcaseCard[] = [
  ...studioTemplates.slice(0, 6),
  ...originalTemplates.slice(0, 8),
  ...storeTemplates.slice(0, 4),
];

export const nfcProducts = [
  {
    name: "Lotus",
    price: "From ₹1,199",
    material: "Gold foil · GNK",
    image: "/cards/lotus-front.jpg",
    href: "https://m.vcarde.com/shop/",
  },
  {
    name: "Mark",
    price: "From ₹899",
    material: "CMYK + gold foil NFC",
    image: "/cards/vcarde-cmyk.jpg",
    href: "https://m.vcarde.com/shop/",
  },
  {
    name: "Mesh",
    price: "From ₹999",
    material: "Gold foil · website",
    image: "/cards/gnk-web-front.jpg",
    href: "https://m.vcarde.com/shop/",
  },
  {
    name: "Gear",
    price: "From ₹899",
    material: "NFC print · gold",
    image: "/cards/gnk-nfc-print.jpg",
    href: "https://m.vcarde.com/shop/",
  },
  {
    name: "Gown",
    price: "From ₹999",
    material: "Spot UV + gold",
    image: "/cards/gnk-fashion-dress.jpg",
    href: "https://m.vcarde.com/shop/",
  },
  {
    name: "Review",
    price: "From ₹299",
    material: "Google review tap",
    image: "/nfc/google-review.jpg",
    href: "https://m.vcarde.com/shop/",
  },
] as const;

export const reviewHorizontal = Array.from({ length: 30 }, (_, i) => ({
  id: `h${i + 1}`,
  file: `/reviews/h/h${String(i + 1).padStart(2, "0")}.jpg`,
  name: `Review ${i + 1}`,
}));

export const reviewVertical = Array.from({ length: 25 }, (_, i) => ({
  id: `v${i + 1}`,
  file: `/reviews/v/v${String(i + 1).padStart(2, "0")}.jpg`,
  name: `Stand ${i + 1}`,
}));

export const nfcLayers = [
  { id: "lamination", name: "Front lamination", spec: "0.08 mm gloss or matte overlay film" },
  { id: "print", name: "Printed PVC sheet", spec: "0.16 mm CMYK artwork, foil and UV" },
  { id: "inlay", name: "NFC inlay + chip", spec: "NTAG 213 · ISO 14443-A · copper antenna" },
  { id: "core", name: "PVC core", spec: "0.46 mm rigid white substrate" },
  { id: "back", name: "Back lamination", spec: "0.14 mm reverse print + overlay" },
] as const;

export const faqs = [
  {
    q: "What is an NFC business card?",
    a: "An NFC business card is a printed visiting card with a tiny chip inside. When someone taps it on their phone, your live VCARDe profile opens — name, number, WhatsApp, and links — without typing. It works on Android and iPhone. Phones without NFC can scan the QR on the same card.",
  },
  {
    q: "How much does an NFC business card cost in India?",
    a: "A VCARDe NFC business card starts at ₹499 for PVC, ₹799 for bamboo, and ₹1,499 for metal. Google review NFC cards start at ₹299. Shipping is free anywhere in India. The digital profile is free forever.",
  },
  {
    q: "Does an NFC business card work on iPhone?",
    a: "Yes. Current iPhones read NFC from the Control Centre or by holding the card near the camera / top of the phone. Android phones tap on the back. If a phone has no NFC, the artistic QR on the card opens the same page.",
  },
  {
    q: "Do people need an app to read my NFC business card?",
    a: "No. Recipients tap the NFC business card or scan the QR. It opens in the phone browser. They can save your contact as a vCard file in one tap.",
  },
  {
    q: "Will my printed NFC business card show VCARDe branding?",
    a: "No. The printed card carries your brand only. There is no VCARDe logo or text on the physical card.",
  },
  {
    q: "Can I change details after the NFC business card is printed?",
    a: "Yes. The chip and QR point to your live VCARDe profile. Change phone, title, links, or design in the dashboard and every future tap shows the new information. You do not reprint.",
  },
  {
    q: "What is the warranty and shipping?",
    a: "Printed NFC business cards include a 5-year chip warranty and free shipping anywhere in India. Typical delivery is 5–7 business days from Mylapore, Chennai.",
  },
  {
    q: "Is there a monthly fee for an NFC business card?",
    a: "No. The VCARDe digital profile is free forever. You pay once for the printed NFC business card. There is no subscription to keep the chip working.",
  },
  {
    q: "NFC vs QR — which should I print?",
    a: "Print both. NFC is faster in a handshake. QR covers phones with NFC off. Every VCARDe NFC business card includes an artistic QR that opens the same live profile.",
  },
  {
    q: "Where is the NFC reader on an Android phone?",
    a: "Most Android phones read NFC on the upper back, near the camera. Hold the NFC business card still for a second. If nothing happens, scan the QR on the same card.",
  },
  {
    q: "Are NFC business cards good for events and seminars?",
    a: "Yes. One tap replaces typing a number in a noisy hall. Sales teams and speakers use PVC NFC business cards from ₹499 so every person on the stall has one.",
  },
  {
    q: "Do you deliver NFC cards to Tambaram, T. Nagar, or OMR?",
    a: "Yes. We print in Mylapore and ship free across Chennai and India. Pickup is at No.1/6, South Mada Street, Mylapore. Open the NFC card near you page for your area.",
  },
] as const;
