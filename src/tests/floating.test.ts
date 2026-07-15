import { describe, expect, it } from "vitest";

import { computePosition } from "../lib/utils/floating";

const viewport = { width: 1000, height: 800 };
const anchor = { top: 400, left: 450, width: 100, height: 40 };
const floating = { width: 200, height: 100 };

describe("computePosition", () => {
    it("places below the anchor for bottom", () => {
        const position = computePosition(anchor, floating, viewport, "bottom");

        expect(position).toEqual({ top: 446, left: 400, side: "bottom" });
    });

    it("places above the anchor for top", () => {
        const position = computePosition(anchor, floating, viewport, "top");

        expect(position).toEqual({ top: 294, left: 400, side: "top" });
    });

    it("aligns to the anchor start and end", () => {
        expect(
            computePosition(anchor, floating, viewport, "bottom-start").left,
        ).toBe(450);
        expect(
            computePosition(anchor, floating, viewport, "bottom-end").left,
        ).toBe(350);
    });

    it("places to the side for left and right", () => {
        expect(computePosition(anchor, floating, viewport, "right")).toEqual({
            top: 370,
            left: 556,
            side: "right",
        });
        expect(computePosition(anchor, floating, viewport, "left")).toEqual({
            top: 370,
            left: 244,
            side: "left",
        });
    });

    it("flips to the opposite side when there is no room", () => {
        const low = { ...anchor, top: 720 };
        const position = computePosition(low, floating, viewport, "bottom");

        expect(position.side).toBe("top");
        expect(position.top).toBe(720 - 100 - 6);
    });

    it("keeps the requested side when neither side fits", () => {
        const tall = { width: 200, height: 900 };
        const position = computePosition(anchor, tall, viewport, "bottom");

        expect(position.side).toBe("bottom");
    });

    it("clamps the cross axis inside the viewport", () => {
        const edge = { ...anchor, left: 950, width: 40 };
        const position = computePosition(edge, floating, viewport, "bottom");

        expect(position.left).toBe(1000 - 200 - 8);
    });

    it("respects a custom offset", () => {
        const position = computePosition(
            anchor,
            floating,
            viewport,
            "bottom",
            20,
        );

        expect(position.top).toBe(460);
    });
});
