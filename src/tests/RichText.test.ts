import { describe, expect, it } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";

import RichText from "../lib/RichText.svelte";

describe("RichText", () => {
    it("renders markdown", async () => {
        const { container } = render(RichText, {
            value: "## Recipe\n\n- Salt\n- **Pepper**",
        });

        await tick();

        expect(container.querySelector("h2")?.textContent).toBe("Recipe");
        expect(container.querySelector("strong")?.textContent).toBe("Pepper");
    });

    it("strips dangerous markup", async () => {
        const { container } = render(RichText, {
            value: `Safe\n\n<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">`,
        });

        await tick();

        expect(container.querySelector("script")).toBeNull();
        expect(container.querySelector("img")?.getAttribute("onerror")).toBe(
            null,
        );
        expect(container.textContent).toContain("Safe");
    });

    it("applies the prose class and extra classes", () => {
        const { container } = render(RichText, {
            value: "text",
            class: "max-w-prose",
        });

        const root = container.querySelector("div");

        expect(root?.classList.contains("pigui-prose")).toBe(true);
        expect(root?.classList.contains("max-w-prose")).toBe(true);
    });
});
