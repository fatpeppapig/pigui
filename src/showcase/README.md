# PigUI showcase

A statically-prerendered SvelteKit site that demonstrates every PigUI
component on one scrolling page. Deployed to GitHub Pages at
[pigui.falba.me](https://pigui.falba.me).

It is not a separate package — it lives in the same `pigui` package and is
driven by SvelteKit config in the repo root (`svelte.config.js` `kit`,
`vite.config.showcase.ts`). The library components are imported through the
`pigui` alias (`kit.alias` → `src/lib`), exactly the way an external
consumer would. Storybook and vitest use their own plain configs and are
unaffected.

## Develop

Run from the repo root:

```sh
npm install
npm run showcase:dev       # local dev server
npm run showcase:build     # prerender to ./build
npm run showcase:preview   # serve the production build
npm run showcase:check     # svelte-check
```

## Deploy

Pushes to `master` that touch `src/showcase`, `src/lib`, or `src/styles`
trigger `.github/workflows/deploy-showcase.yml`, which runs
`npm run showcase:build` and publishes `build/` to GitHub Pages.

The build is served from the root of a custom domain, so the SvelteKit
`base` path is empty and `static/CNAME` pins the domain to `pigui.falba.me`.

