import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/svelte";

import Pagination from "../lib/Pagination.svelte";

describe("Pagination", () => {
    it("renders the current page with the default label", () => {
        const { getByText } = render(Pagination, { page: 2, pages: 5 });

        expect(getByText("Page: 2 / 5")).toBeTruthy();
    });

    it("renders a custom label", () => {
        const { getByText } = render(Pagination, {
            page: 1,
            pages: 3,
            label: (current: number, pages: number) => `${current} of ${pages}`,
        });

        expect(getByText("1 of 3")).toBeTruthy();
    });

    it("navigates and reports changes", async () => {
        let changed: number | undefined;
        const { getByRole, getByText } = render(Pagination, {
            page: 2,
            pages: 5,
            onChange: (page: number) => (changed = page),
        });

        await fireEvent.click(getByRole("button", { name: "Next page" }));

        expect(changed).toBe(3);
        expect(getByText("Page: 3 / 5")).toBeTruthy();

        await fireEvent.click(getByRole("button", { name: "Previous page" }));

        expect(changed).toBe(2);
    });

    it("clamps at the first and last page", async () => {
        let changed: number | undefined;
        const { getByRole, getByText } = render(Pagination, {
            page: 1,
            pages: 2,
            onChange: (page: number) => (changed = page),
        });

        await fireEvent.click(getByRole("button", { name: "Previous page" }));

        expect(changed).toBeUndefined();
        expect(getByText("Page: 1 / 2")).toBeTruthy();

        await fireEvent.click(getByRole("button", { name: "Next page" }));
        await fireEvent.click(getByRole("button", { name: "Next page" }));

        expect(changed).toBe(2);
        expect(getByText("Page: 2 / 2")).toBeTruthy();
    });

    it("clamps an out-of-range page for display", () => {
        const { getByText } = render(Pagination, { page: 9, pages: 3 });

        expect(getByText("Page: 3 / 3")).toBeTruthy();
    });
});
