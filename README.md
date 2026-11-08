# Bruno De Cruz Portfolio

Personal portfolio built with React and Vite. A quiet, typography-led layout with a
centered header, professional experience, contact links, and a persistent light/dark
theme. The original `#home`, `#work`, and `#contact` anchors remain available.

## Local development

Use Node.js 24, then run:

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`. Typography uses Inter and JetBrains
Mono from Google Fonts, with local system fallbacks. Theme switching also works
when the browser blocks local storage. Smooth anchor scrolling respects reduced
motion preferences.
