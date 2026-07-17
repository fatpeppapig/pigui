# PigUI

Svelte 5 component library themed entirely by Tailwind CSS V4 semantic tokens.
The only runtime dependency is `@tabler/icons-svelte`. It currently ships as
source only. You need Vite + Svelte 5 + Tailwind V4 setup.

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
Navbar, Pagination, Popover, Progress, SearchSelect, Select, Tabbar, Table,
TimePicker, TimeSelector, ToastContainer (+ `showToast`), Tooltip.

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
