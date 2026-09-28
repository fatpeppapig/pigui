import { describe, expect, it, vi } from "vitest";
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
            "strikethrough",
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

    it("loads markdown into the document", async () => {
        const { container } = render(RichEditor, {
            value: "## Notes\n\n- one\n- two",
        });

        await tick();

        expect(container.querySelector("h2")?.textContent).toBe("Notes");
        expect(container.querySelectorAll("li")).toHaveLength(2);
    });

    it("adopts content replaced from the outside", async () => {
        const { container, rerender } = render(RichEditor, { value: "one" });

        await tick();
        await rerender({ value: "two" });
        await tick();

        expect(container.textContent).toContain("two");
        expect(container.textContent).not.toContain("one");
    });

    it("does not commit content that was never edited", async () => {
        const onCommit = vi.fn();
        const { unmount } = render(RichEditor, {
            value: "## Notes",
            onCommit,
        });

        await tick();
        unmount();

        expect(onCommit).not.toHaveBeenCalled();
    });
});
