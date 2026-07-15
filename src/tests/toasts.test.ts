import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { dismissToast, showToast, toasts } from "../lib/stores/toasts.svelte";

describe("toasts store", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        toasts.splice(0, toasts.length);
        vi.useRealTimers();
    });

    it("shows a toast with defaults", () => {
        showToast("saved");

        expect(toasts).toHaveLength(1);
        expect(toasts[0].message).toBe("saved");
        expect(toasts[0].status).toBe("info");
    });

    it("stacks toasts and dismisses by id", () => {
        const first = showToast("one");
        const second = showToast("two", { status: "danger", title: "Oops" });

        expect(toasts).toHaveLength(2);
        expect(toasts[1].title).toBe("Oops");

        dismissToast(first);

        expect(toasts).toHaveLength(1);
        expect(toasts[0].id).toBe(second);
    });

    it("auto-dismisses after the duration", () => {
        showToast("fleeting", { duration: 1000 });

        vi.advanceTimersByTime(999);
        expect(toasts).toHaveLength(1);

        vi.advanceTimersByTime(1);
        expect(toasts).toHaveLength(0);
    });

    it("keeps sticky toasts with duration 0", () => {
        showToast("sticky", { duration: 0 });

        vi.advanceTimersByTime(60_000);
        expect(toasts).toHaveLength(1);
    });

    it("ignores dismissing unknown ids", () => {
        showToast("kept");

        dismissToast(999);

        expect(toasts).toHaveLength(1);
    });
});
