import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: "404.html",
            precompress: false,
            strict: true,
        }),
        paths: { base: "" },
        alias: { pigui: "src/lib" },
        files: {
            routes: "src/showcase/routes",
            lib: "src/showcase/lib",
            assets: "src/showcase/static",
            appTemplate: "src/showcase/app.html",
        },
    },
};
