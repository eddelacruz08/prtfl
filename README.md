# Edmon Dela Cruz — Web Portfolio

Personal portfolio built with **React 19 + Vite 8 + TypeScript**, animated with
[React Bits](https://reactbits.dev) components (GSAP + Motion).

## Scripts

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

Requires Node.js 20.19+ (or 22.12+).

## Structure

```
src/
  App.tsx                      page layout and sections
  data/portfolio.ts            all content (jobs, projects, skills, certificates, contact)
  lib/resume.ts                plain PDF résumé generator (jsPDF, loaded on click)
  index.css                    theme tokens and section styles
  assets/                      portrait and project card images
  components/reactbits/        React Bits components (MIT + Commons Clause)
vercel.json                    Vercel build + caching/security headers
```

To edit text, update `src/data/portfolio.ts`.

### Résumé PDF

The **Download résumé** buttons build a plain black-on-white PDF in the browser
(`src/lib/resume.ts`, using jsPDF) from the same data in `src/data/portfolio.ts`,
so the résumé always matches the site.

To show LinkedIn / GitHub on the site and in the résumé header, fill in
`contact.linkedin` and `contact.github` in `src/data/portfolio.ts` with full URLs.

## Deploy to Vercel

**Dashboard:** push this folder to a GitHub repo → vercel.com → *Add New Project* →
import the repo. Vercel reads `vercel.json` (framework `vite`, output `dist`), so no
settings need changing.

**CLI:**

```bash
npm i -g vercel
vercel          # first run links the project and makes a preview deploy
vercel --prod   # production deploy
```

## Credits

Animated components from React Bits (reactbits.dev), © David Haz, MIT + Commons Clause License Condition v1.0.
