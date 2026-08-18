import type { HighlighterCore } from "shiki/core";

const THEMES = { light: "github-light", dark: "github-dark" } as const;

let highlighter: Promise<HighlighterCore> | undefined;

const createHighlighter = async () => {
    const [core, engine, svelte, light, dark] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
        import("@shikijs/langs/svelte"),
        import("@shikijs/themes/github-light"),
        import("@shikijs/themes/github-dark"),
    ]);

    return core.createHighlighterCore({
        themes: [light.default, dark.default],
        langs: [svelte.default],
        engine: engine.createJavaScriptRegexEngine(),
    });
};

export const highlight = async (code: string) => {
    highlighter ??= createHighlighter();

    return (await highlighter).codeToHtml(code, {
        lang: "svelte",
        themes: THEMES,
        defaultColor: false,
    });
};
