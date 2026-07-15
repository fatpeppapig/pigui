import { describe, expect, it } from "vitest";

import { formatNumber, parseNumber, roundTo } from "../lib/utils/number";

describe("parseNumber", () => {
    it("parses dot and comma decimals", () => {
        expect(parseNumber("12.5")).toBe(12.5);
        expect(parseNumber("12,5")).toBe(12.5);
        expect(parseNumber(" 100 ")).toBe(100);
    });

    it("parses negative values", () => {
        expect(parseNumber("-30")).toBe(-30);
        expect(parseNumber("-0,5")).toBe(-0.5);
    });

    it("rejects empty and garbage input", () => {
        expect(parseNumber("")).toBeNull();
        expect(parseNumber("   ")).toBeNull();
        expect(parseNumber("-")).toBeNull();
        expect(parseNumber("12abc")).toBeNull();
        expect(parseNumber("1.2.3")).toBeNull();
    });
});

describe("formatNumber", () => {
    it("renders the configured separator", () => {
        expect(formatNumber(12.5, ",")).toBe("12,5");
        expect(formatNumber(12.5, ".")).toBe("12.5");
        expect(formatNumber(100, ",")).toBe("100");
        expect(formatNumber("12.5", ",")).toBe("12,5");
    });
});

describe("roundTo", () => {
    it("rounds to the given decimals", () => {
        expect(roundTo(1.005, 2)).toBeCloseTo(1.0);
        expect(roundTo(12.345, 2)).toBeCloseTo(12.35);
        expect(roundTo(12.5, 0)).toBe(13);
    });
});
