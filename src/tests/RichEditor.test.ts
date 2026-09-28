import { describe, expect, it } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";

import RichEditor from "../lib/editor/RichEditor.svelte";

describe("RichEditor", () => {
    it("renders the default toolbar", async () => {
        const { getByTitle } = render(RichEditor);

        await tick();

        for (const title of [
            "heading 1",
            "heading 2",
            "heading 3",
            "bold",
            "italic",
            "underline",
            "bullet list",
            "ordered list",
        ]) {
            expect(getByTitle(title)).toBeTruthy();
        }
    });

    it("renders only the requested tools", async () => {
        const { getByTitle, queryByTitle } = render(RichEditor, {
            tools: [["bold", "undo"]],
        });

        await tick();

        expect(getByTitle("bold")).toBeTruthy();
        expect(getByTitle("undo")).toBeTruthy();
        expect(queryByTitle("heading 1")).toBeNull();
    });

    it("hides the toolbar when not editable", async () => {
        const { queryByTitle } = render(RichEditor, { editable: false });

        await tick();

        expect(queryByTitle("bold")).toBeNull();
    });

    it("adopts content replaced from the outside", async () => {
        const { container, rerender } = render(RichEditor, {
            value: "<p>one</p>",
        });

        await tick();
        await rerender({ value: "<p>two</p>" });
        await tick();

        expect(container.textContent).toContain("two");
        expect(container.textContent).not.toContain("one");
    });

    it("loads sanitized content into the document", async () => {
        const { container } = render(RichEditor, {
            value: `<p>safe</p><script>alert(1)</script>`,
        });

        await tick();

        expect(container.querySelector(".pigui-prose")).toBeTruthy();
        expect(container.querySelector("script")).toBeNull();
        expect(container.textContent).toContain("safe");
    });
});
