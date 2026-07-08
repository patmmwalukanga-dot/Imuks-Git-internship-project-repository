# Scholarly — Academic Success Tracker

Landing page for Scholarly, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project structure

```
src/
  app/
    layout.tsx      # Root layout, loads Hanken Grotesk / Work Sans / Material Symbols
    page.tsx         # Home page, assembles the sections below
    globals.css       # Tailwind directives + base styles
  components/
    Header.tsx
    Hero.tsx
    Features.tsx      # Includes the scroll-triggered fade-in
    FeatureCard.tsx
    Footer.tsx
    Logo.tsx
```

## Notes

- Fonts (Hanken Grotesk, Work Sans) are loaded via `next/font/google` in `layout.tsx` and wired into
  Tailwind's `fontFamily` tokens through CSS variables. Material Symbols is loaded via a `<link>` tag
  since it isn't on Google Fonts' variable-font API that `next/font` uses.
- The hero image is served from `lh3.googleusercontent.com`; that domain is whitelisted in
  `next.config.js` under `images.remotePatterns`. Swap in your own hosted image when ready.
- Design tokens (colors, spacing, type scale) live in `tailwind.config.ts`.
