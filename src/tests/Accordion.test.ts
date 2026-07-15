import { describe, expect, it } from "vitest";
import { createRawSnippet } from "svelte";
import { render } from "@testing-library/svelte";

import Accordion from "../lib/Accordion.svelte";

const content = (html: string) =>
    createRawSnippet(() => ({ render: () => `<p>${html}</p>` }));

const items = [
    { title: "First", content: content("first content") },
    { title: "Second", content: content("second content"), open: true },
    { title: "Third", content: content("third content") },
];

describe("Accordion", () => {
    it("renders every section with its content", () => {
        const { getByText } = render(Accordion, { items });

        expect(getByText("First")).toBeTruthy();
        expect(getByText("second content")).toBeTruthy();
        expect(getByText("Third")).toBeTruthy();
    });

    it("opens sections marked as open", () => {
        const { container } = render(Accordion, { items });
        const details = container.querySelectorAll("details");

        expect(details[0].open).toBe(false);
        expect(details[1].open).toBe(true);
        expect(details[2].open).toBe(false);
    });

    it("shares a group name across sections when exclusive", () => {
        const { container } = render(Accordion, { items, exclusive: true });
        const names = [...container.querySelectorAll("details")].map(
            (section) => section.getAttribute("name"),
        );

        expect(names[0]).toBeTruthy();
        expect(new Set(names).size).toBe(1);
    });

    it("leaves sections independent when not exclusive", () => {
        const { container } = render(Accordion, { items });
        const details = container.querySelectorAll("details");

        for (const section of details) {
            expect(section.getAttribute("name")).toBeNull();
        }
    });
});
