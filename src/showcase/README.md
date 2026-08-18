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

Every demo is its own component under `lib/demos`. The page imports each one
twice — once normally, once with Vite's `?raw` query — so the component that
renders and the source shown under the _Code_ toggle come from the same file
and cannot drift apart. Adding a demo means adding a file there and one pair
of imports. Shiki highlights the source in the browser, loaded on the first
_Code_ click, so it costs the initial page nothing.

## Develop

Run from the repo root:

```sh
npm install
npm run sync               # generate .svelte-kit (needed by editors)
npm run showcase:dev       # local dev server
npm run showcase:build     # prerender to ./build
npm run showcase:preview   # serve the production build
npm run showcase:check     # svelte-check
```

`src/showcase/tsconfig.json` extends the `.svelte-kit/tsconfig.json` that
`svelte-kit sync` generates, which is where the `$lib`, `$app/*`, and `pigui`
path aliases come from. Language servers find that config by walking up from
the file they are editing, so showcase files get kit's aliases while
`src/lib` keeps the root `tsconfig.json` and stays independent of SvelteKit.

`dev` and `build` run the sync themselves; run it by hand after a fresh
clone, or the editor will not resolve those aliases. The `prepare` script
does the same on `npm install`, but only when npm is allowed to run
lifecycle scripts.

## Deploy

Pushes to `master` that touch `src/showcase`, `src/lib`, or `src/styles`
trigger `.github/workflows/deploy-showcase.yml`, which runs
`npm run showcase:build` and publishes `build/` to GitHub Pages.

The build is served from the root of a custom domain, so the SvelteKit
`base` path is empty and `static/CNAME` pins the domain to `pigui.falba.me`.
