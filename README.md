# PigUI

Svelte 5 component library themed entirely by Tailwind CSS V4 semantic tokens.
The runtime dependencies are `@tabler/icons-svelte` and `dompurify`. It
currently ships as source only. You need Vite + Svelte 5 + Tailwind V4 setup.

Live showcase: **[pigui.falba.me](https://pigui.falba.me)** (source in
[`src/showcase`](src/showcase)).

## Install

Not on npm yet. Link locally:

```sh
npm install ../path/to/pigui
```

or from git:

```sh
npm install github:fatpeppapig/pigui
```

## Setup

In your app CSS (after the Tailwind import):

```css
@import "tailwindcss";
@import "pigui/theme.css";
@source "../node_modules/pigui/src/lib";
```

The `@source` line is required: Tailwind V4 does not scan `node_modules`, so
without it every class used inside PigUI components is missing from your build.

When linked via `file:`, the consuming Vite config needs:

```ts
resolve: { preserveSymlinks: true },
optimizeDeps: { exclude: ["pigui"] },
```

## Theming

`theme.css` defines neutral gray defaults for every token. Override them in
your own `@theme` block to reskin every component — light and dark in one go,
since each token carries both via `light-dark()`:

```css
@theme {
    --color-primary: light-dark(
        var(--color-emerald-600),
        var(--color-emerald-400)
    );
}
```

Tokens: `background`, `foreground`, `surface`, `surface-alt`, `surface-raised`,
`surface-brand`, `muted`, `muted-foreground`, `border`, `primary`, `secondary`,
`accent`, `accent-soft`, `scrim`, `danger`, `success`, `warning`, `info`
(+ `*-foreground` companions).

## Formats

```ts
import { configure } from "pigui";

configure({ dateFormat: "DD.MM.YYYY", decimalSeparator: "," });
```

Configures date/time formats, decimal separator, week start, and calendar
labels for DatePicker/TimePicker/Input across the app; per-instance `format`
props win over the global config.

## Components

Accordion, Alert, Badge, Breadcrumbs, Button, ButtonGroup, Card, CopyButton,
DatePicker, DateSelector, Dialog, Dropdown, Floating, Input, Loader, Modal,
Navbar, Pagination, Popover, Progress, RichText, SearchSelect, Select, Tabbar,
Table, TimePicker, TimeSelector, ToastContainer (+ `showToast`), Tooltip.

## Markdown

Markdown is the storage format for both components. `RichText` renders it with
[marked](https://marked.js.org), sanitizes the result with DOMPurify — Markdown
may embed raw HTML — and styles it as `.pigui-prose` from the same tokens as
everything else, so there is no `@tailwindcss/typography` and no `dark:`
variants to wire up:

```svelte
<RichText value={dish.recipe} />
```

Without a DOM (SSR, prerendering) DOMPurify cannot run, so the component
renders the Markdown source as plain text and swaps in the rendered output once
it hydrates.

The matching editor wraps [Tiptap](https://tiptap.dev). It lives behind its own
entry point so Tiptap stays out of the main bundle — and out of `npm install` —
for anyone who does not use it:

```sh
npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/markdown
```

```svelte
<script lang="ts">
    import { RichEditor } from "pigui/editor";

    let recipe = $state(dish.recipe);
</script>

<RichEditor bind:value={recipe} onCommit={save} class="min-h-60" />
```

`value` tracks every keystroke as Markdown; `onCommit` fires on blur and on
unmount, and only when the content actually changed. `tools` reshapes the
toolbar — an array of groups, each rendered as a `ButtonGroup`:

```svelte
<RichEditor
    tools={[
        ["bold", "italic"],
        ["undo", "redo"],
    ]}
/>
```

Available tools: `h1`, `h2`, `h3`, `bold`, `italic`, `underline`, `strike`,
`code`, `bulletList`, `orderedList`, `blockquote`, `horizontalRule`, `undo`,
`redo`. Pass `extensions` to add Tiptap extensions beyond `StarterKit`.

Two things to know about the round trip. Anything outside the editor's schema
is dropped when content loads, and the editor rewrites `value` into its own
canonical Markdown on load — a reformat, not an edit, so it does not trigger
`onCommit`. And `underline` is not Markdown: Tiptap serializes it as
`++text++`, which `RichText` prints literally, so it is not in the default
toolbar.

## Development

```sh
npm install
npm test             # vitest
npm run check        # svelte-check
npm run storybook    # browse components at localhost:6006
npm run format       # prettier
```

## Showcase

The [pigui.falba.me](https://pigui.falba.me) site lives in
[`src/showcase`](src/showcase) as part of this same package — a SvelteKit app
prerendered to static HTML and deployed to GitHub Pages on every push to
`master` (see [`.github/workflows/deploy-showcase.yml`](.github/workflows/deploy-showcase.yml)).

```sh
npm run showcase:dev      # local dev server
npm run showcase:build    # prerender to ./build
npm run showcase:preview  # serve the production build
npm run showcase:check    # svelte-check
```

## License

[0BSD](LICENSE) — do whatever you want, no attribution required.
