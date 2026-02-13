
---
# TechSCube — Premium Company Website

![TechSCube logo](/public/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vite](https://img.shields.io/badge/Bundler-Vite-646cff.svg)](https://vitejs.dev/) [![React](https://img.shields.io/badge/Framework-React-61dafb.svg)](https://reactjs.org/) [![Tailwind](https://img.shields.io/badge/CSS-Tailwind-38b2ac.svg)](https://tailwindcss.com/)

A modern, mobile-first, SEO-conscious landing site for TECH S-CUBE (TECHS3). Built with a focus on premium UI/UX, accessibility, and performance, this repository contains the source for the public-facing website — hero sections, service highlights, CTAs, and lightweight micro-interactions. It's tailored for fast deployment (Vercel-ready) and easy edits.

Why this README is different: it's written to be discoverable and helpful — clear headings, targeted keywords, and a strong developer & product handoff section so teammates and deploy pipelines can get started immediately.

## Live demo

Add your production demo link here (once deployed):

> https://your-domain.com

If you want me to add a live preview badge, give me the Vercel or Netlify project link and I'll insert it.

## Quick highlights

- Purpose-built landing site with emphasis on conversions and clarity
- Tech: React 19, TypeScript, Vite, Tailwind CSS, ESLint
- Fast local development (HMR) and small, maintainable component set
- SEO-ready static head tags, sitemap, and Search Console verification file included

## Hero / Product positioning (copy for pages)

TechSCube trains tomorrow’s technologists today — immersive, project-driven courses that transform learners into hireable professionals. Courses: Web dev, Graphic Design, Non-technical tracks, and bespoke development services for businesses.

## Visual & UX notes (premium-by-default)

- Color palette: primary #002E46 (theme), accent tones for CTA contrast
- Typography: custom local fonts in `public/fonts/` (Zyana-Regular, virgo)
- Mobile-first design with clear visual hierarchy and generous spacing
- Accessibility: semantic HTML, high contrast, keyboard focus states — continue to run axe or Lighthouse checks

## SEO & Performance (what's already done)

- Search Console ownership file is present in `public/` (`googlea64c6d47534e4ed0.html`).
- `index.html` includes canonical link, robots meta, Open Graph, Twitter card and JSON-LD WebSite markup.
- `sitemap.xml` and `robots.txt` live in `public/` for easy submission to Search Console and crawl control.

SEO checklist (recommended):

1. Update `index.html` canonical and `og:url` to your real production URL.
2. Add a 1200x630 Open Graph image at `/public/og-image.png` and reference it in `index.html`.
3. Submit `/sitemap.xml` to Google Search Console and check coverage.
4. Add per-route meta (titles/descriptions) via `react-helmet-async` for dynamic routes.
5. Consider pre-rendering high-value landing pages (SSG/SSR) for maximum indexability.

## Screenshot / preview

Insert a screenshot or short GIF here to showcase the UI. Example:

![Homepage preview](/public/logo.png)

If you'd like, I can create a 1200px-wide design mock and add it to `/public/`.

## Getting started (developer)

Prereqs: Node.js 18+ (LTS recommended), npm or yarn

```zsh
# Install
npm install

# Development (HMR)
npm run dev

# Build (production)
npm run build

# Preview built site
npm run preview
```

Scripts (from package.json):

- `dev` — start Vite dev server with HMR
- `build` — run TypeScript build then `vite build` (outputs to `dist/`)
- `preview` — preview production build locally
- `lint` — run ESLint across the project

## Project structure (quick)

- `src/` — React + TypeScript source
  - `components/` — reusable components
  - `assets/` — local images & helper files
- `public/` — static assets: fonts, sitemap, robots, verification files
- `vercel.json`, `vite.config.ts`, `tailwind.config.ts` — deployment and build configs

## Design tokens & Tailwind

The project uses Tailwind for rapid, consistent styling. Keep tokens in `tailwind.config.ts` (colors, spacing, fonts). Prefer utility-first classes and small re-usable components for maintainability.

## Accessibility & testing

- Run Lighthouse to check performance, accessibility, SEO, and best practices.
- Consider adding accessibility regression tests using `axe-core` with Playwright or Cypress.

## Contributing

Contributions are welcome. For pull requests:

1. Fork the repo and create a feature branch.
2. Run `npm install` and follow the lint rules: `npm run lint`.
3. Open a PR with a clear description and test steps.

I can add a `CONTRIBUTING.md` and a GitHub Actions workflow to block merges on failing build/lint — say the word and I will add it.

## Roadmap (starter)

- Add per-route metadata via `react-helmet-async` and wire a small `SEO.tsx` component.
- Add unit/UI tests for 3-4 critical components.
- Create a small visual style guide and a component playground (Storybook) for consistent UI development.

## License

MIT — see `LICENSE`.

## Contact & credits

- Maintainer: Gowtham
- Design & UI: in-house / placeholder

---

If you'd like any specific tone edits (more corporate, more playful), or a custom OG image and live demo badge added, tell me which direction and I will update the README immediately.
