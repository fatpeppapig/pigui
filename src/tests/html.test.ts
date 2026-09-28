import { describe, expect, it } from "vitest";

import { htmlToText, normalizeHtml, sanitizeHtml } from "../lib/utils/html";

describe("sanitizeHtml", () => {
    it("keeps formatting markup", () => {
        expect(sanitizeHtml("<p><strong>bold</strong> text</p>")).toBe(
            "<p><strong>bold</strong> text</p>",
        );
    });

    it("drops script tags", () => {
        expect(sanitizeHtml("<p>safe</p><script>alert(1)</script>")).toBe(
            "<p>safe</p>",
        );
    });

    it("drops event handler attributes", () => {
        expect(sanitizeHtml(`<img src="x" onerror="alert(1)">`)).not.toContain(
            "onerror",
        );
    });

    it("drops javascript urls", () => {
        expect(
            sanitizeHtml(`<a href="javascript:alert(1)">x</a>`),
        ).not.toContain("javascript:");
    });
});

describe("htmlToText", () => {
    it("strips markup and collapses whitespace", () => {
        expect(htmlToText("<h1>Title</h1>\n<p>One <em>two</em></p>")).toBe(
            "Title One two",
        );
    });

    it("drops script content entirely", () => {
        expect(htmlToText("<p>safe</p><script>alert(1)</script>")).toBe("safe");
    });
});

describe("normalizeHtml", () => {
    it("treats an empty paragraph as no content", () => {
        expect(normalizeHtml("<p></p>")).toBe("");
    });

    it("keeps real content", () => {
        expect(normalizeHtml("<p>text</p>")).toBe("<p>text</p>");
    });
});
