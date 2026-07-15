import type { Preview } from "@storybook/svelte-vite";

import "./preview.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: { disable: true },
    },
    globalTypes: {
        scheme: {
            description: "Color scheme",
            toolbar: {
                title: "Scheme",
                icon: "mirror",
                items: [
                    { value: "light", icon: "sun", title: "Light" },
                    { value: "dark", icon: "moon", title: "Dark" },
                    { value: "light dark", icon: "browser", title: "System" },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        scheme: "light",
    },
    decorators: [
        (story, context) => {
            const scheme = context.globals.scheme ?? "light";
            document.documentElement.style.colorScheme = scheme;
            document.documentElement.style.backgroundColor =
                "var(--color-background)";
            return story();
        },
    ],
};

export default preview;
