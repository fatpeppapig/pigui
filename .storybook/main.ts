import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|svelte)"],
    addons: ["@storybook/addon-svelte-csf", "@storybook/addon-docs"],
    framework: "@storybook/svelte-vite",
};

export default config;
