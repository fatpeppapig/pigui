import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/svelte";

import { showToast, toasts } from "../lib/stores/toasts.svelte";
import ToastContainer from "../lib/ToastContainer.svelte";

describe("ToastContainer", () => {
    afterEach(() => {
        toasts.splice(0, toasts.length);
    });

    it("renders toasts from the store", async () => {
        const { findByText } = render(ToastContainer);

        showToast("saved", { status: "success", duration: 0 });

        expect(await findByText("saved")).toBeTruthy();
    });

    it("removes a toast when its close button is clicked", async () => {
        const { findByRole, queryByText } = render(ToastContainer, {
            closeTitle: "Dismiss",
        });

        showToast("closable", { duration: 0 });

        const close = await findByRole("button", {
            name: "Dismiss",
            hidden: true,
        });

        await fireEvent.click(close);

        expect(queryByText("closable")).toBeNull();
        expect(toasts).toHaveLength(0);
    });
});
