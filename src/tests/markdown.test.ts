import { describe, expect, it } from "vitest";

import { markdownToHtml, normalizeMarkdown } from "../lib/utils/markdown";

describe("markdownToHtml", () => {
    it("renders headings, lists and emphasis", () => {
        const html = markdownToHtml("# Title\n\n- one\n- **two**");

        expect(html).toContain("<h1>Title</h1>");
        expect(html).toContain("<li>one</li>");
        expect(html).toContain("<strong>two</strong>");
    });

    it("drops script tags embedded in the source", () => {
        const html = markdownToHtml("Safe\n\n<script>alert(1)</script>");

        expect(html).not.toContain("<script");
        expect(html).toContain("Safe");
    });

    it("drops event handler attributes", () => {
        expect(
            markdownToHtml(`<img src="x" onerror="alert(1)">`),
        ).not.toContain("onerror");
    });

    it("drops javascript urls", () => {
        expect(
            markdownToHtml("[x](javascript:alert&#40;1&#41;)"),
        ).not.toContain("javascript:");
    });
});

describe("normalizeMarkdown", () => {
    it("treats a blank space entity as no content", () => {
        expect(normalizeMarkdown("&nbsp;")).toBe("");
    });

    it("trims real content", () => {
        expect(normalizeMarkdown("# Title\n")).toBe("# Title");
    });
});
