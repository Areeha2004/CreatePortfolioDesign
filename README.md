# Portfolio — Areeha Zulfiqar

Personal portfolio site. Single-page React app: hero, about, skills, project case studies
with detail modals, and contact.

**Live:** [areeha-portfolio.vercel.app](https://areeha-portfolio.vercel.app/)

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript, built with Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`), CSS custom properties for theming |
| Icons | lucide-react |
| Fonts | Sora (headings) + Inter (body), from Google Fonts |
| Hosting | Vercel |

Three runtime dependencies, by design. The layout is hand-written Tailwind rather than a
component library — a site this size doesn't need one, and the bundle is 58 kB gzipped.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck, then build to dist/
npm run typecheck    # tsc --noEmit
npm run preview      # serve the production build locally
```

`npm run build` runs `tsc --noEmit` first, so a type error fails the build rather than
shipping.

## Layout

```
index.html              page shell, title and meta/OG tags
src/main.tsx            React entry
src/app/App.tsx         the whole page — data constants at the top, sections below
src/imports/            the résumé PDF, imported and served as a static asset
src/styles/
  index.css             imports the three below
  fonts.css             Google Fonts
  tailwind.css          Tailwind v4 entry + tw-animate-css
  theme.css             design tokens (colours, radii) as CSS custom properties
src/vite-env.d.ts       Vite ambient types + the *.pdf module declaration
```

Content lives in plain constants at the top of `App.tsx` — `STATS`, `SKILL_GROUPS`,
`PROJECTS`, `ROLES` — so updating the site means editing data, not markup.

## Notes

This started as a Figma Make export and was rebuilt into a real project: TypeScript config
and strict typechecking added, 47 unused dependencies and 48 unused UI components removed,
React declared as an actual dependency rather than an optional peer, and the page metadata
replaced (the export shipped with `noindex, nofollow` and a placeholder title).
