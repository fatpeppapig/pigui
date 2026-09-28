import { describe, expect, it } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";

import RichText from "../lib/RichText.svelte";

describe("RichText", () => {
    it("renders sanitized markup", async () => {
        const { container } = render(RichText, {
            value: "<h1>Recipe</h1><ul><li>Salt</li></ul>",
        });

        await tick();

        expect(container.querySelector("h1")?.textContent).toBe("Recipe");
        expect(container.querySelector("li")?.textContent).toBe("Salt");
    });

    it("strips dangerous markup", async () => {
        const { container } = render(RichText, {
            value: `<p>safe</p><script>alert(1)</script><img src="x" onerror="alert(1)">`,
        });

        await tick();

        expect(container.querySelector("script")).toBeNull();
        expect(container.querySelector("img")?.getAttribute("onerror")).toBe(
            null,
        );
        expect(container.textContent).toContain("safe");
    });

    it("applies the prose class and extra classes", () => {
        const { container } = render(RichText, {
            value: "<p>text</p>",
            class: "max-w-prose",
        });

        const root = container.querySelector("div");

        expect(root?.classList.contains("pigui-prose")).toBe(true);
        expect(root?.classList.contains("max-w-prose")).toBe(true);
    });
});
