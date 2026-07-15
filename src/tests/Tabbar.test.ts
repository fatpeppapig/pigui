import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/svelte";

import Tabbar from "../lib/Tabbar.svelte";

const items = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "off", label: "Off", disabled: true },
    { value: "month", label: "Month" },
];

describe("Tabbar", () => {
    it("renders tabs with the selected one marked", () => {
        const { getByRole } = render(Tabbar, { items, value: "week" });

        expect(getByRole("tab", { name: "Week" }).ariaSelected).toBe("true");
        expect(getByRole("tab", { name: "Day" }).ariaSelected).toBe("false");
        expect(
            (getByRole("tab", { name: "Off" }) as HTMLButtonElement).disabled,
        ).toBe(true);
    });

    it("selects on click and reports the change", async () => {
        let changed: string | number | undefined;
        const { getByRole } = render(Tabbar, {
            items,
            value: "day",
            onChange: (value: string | number) => (changed = value),
        });

        await fireEvent.click(getByRole("tab", { name: "Month" }));

        expect(changed).toBe("month");
        expect(getByRole("tab", { name: "Month" }).ariaSelected).toBe("true");
    });

    it("moves selection with arrow keys, skipping disabled tabs", async () => {
        const { getByRole } = render(Tabbar, { items, value: "week" });

        await fireEvent.keyDown(getByRole("tab", { name: "Week" }), {
            key: "ArrowRight",
        });

        expect(getByRole("tab", { name: "Month" }).ariaSelected).toBe("true");

        await fireEvent.keyDown(getByRole("tab", { name: "Month" }), {
            key: "ArrowLeft",
        });

        expect(getByRole("tab", { name: "Week" }).ariaSelected).toBe("true");
    });

    it("wraps arrow navigation around the ends", async () => {
        const { getByRole } = render(Tabbar, { items, value: "month" });

        await fireEvent.keyDown(getByRole("tab", { name: "Month" }), {
            key: "ArrowRight",
        });

        expect(getByRole("tab", { name: "Day" }).ariaSelected).toBe("true");
    });

    it("ignores clicks on disabled tabs", async () => {
        const { getByRole } = render(Tabbar, { items, value: "day" });

        await fireEvent.click(getByRole("tab", { name: "Off" }));

        expect(getByRole("tab", { name: "Day" }).ariaSelected).toBe("true");
    });
});
