# VCARDe homepage

New marketing site for [vcarde.com](https://vcarde.com) — NFC business cards, digital vCards, and Google Review cards. Printed in Mylapore, Chennai.

The Laravel SaaS at `/login` is unchanged. This repo is only the public homepage and related pages (`/templates`, `/nfc-business-cards`, `/about`, `/press`, `/guide`).

## Stack

- React + TanStack Start
- Tailwind CSS
- Static assets in `public/` (card photos, templates, OG image)

No Node.js is required on the live OpenLiteSpeed / RunCloud VPS. Build locally, then copy the output into the existing site.

## Local preview

```bash
npm install
npm run dev
```

## Hand off to Laravel / OpenLiteSpeed

1. Run `npm run build`.
2. Copy the built files into the Laravel `public/` folder (or a vhost document root).
3. Keep Laravel routes for `/login`, dashboard, and vCard profiles.
4. Point `/` and marketing URLs at this site.

OG image: `public/og.jpg` (1200×630).  
X / Twitter header: `public/x-banner.jpg` (1500×500) — upload in X → Edit profile → Header.

## Contact

VCARDe / GNK Services  
No. 1/6, South Mada Street, Mylapore, Chennai 600004  
+91 79 04 72 19 39 · +91 96 00 93 32 58
