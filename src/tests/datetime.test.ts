import { describe, expect, it } from "vitest";

import {
    addDays,
    addMinutes,
    formatDate,
    formatDateAs,
    formatTime,
    formatTimeAs,
    parseDateAs,
    parseTimeAs,
} from "../lib/utils/datetime";

describe("formatDate", () => {
    it("pads month and day", () => {
        expect(formatDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    });
});

describe("addDays", () => {
    it("adds within a month", () => {
        expect(addDays("2026-07-14", 1)).toBe("2026-07-15");
    });

    it("rolls over month boundaries", () => {
        expect(addDays("2026-07-31", 1)).toBe("2026-08-01");
        expect(addDays("2026-08-01", -1)).toBe("2026-07-31");
    });

    it("rolls over year boundaries", () => {
        expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
        expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    });

    it("handles leap years", () => {
        expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
        expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
    });
});

describe("formatTime", () => {
    it("pads hours and minutes", () => {
        expect(formatTime(new Date(2026, 0, 5, 8, 5))).toBe("08:05");
    });
});

describe("addMinutes", () => {
    it("adds within an hour", () => {
        expect(addMinutes("08:30", 15)).toBe("08:45");
    });

    it("rolls over hours", () => {
        expect(addMinutes("08:50", 15)).toBe("09:05");
    });

    it("wraps past midnight", () => {
        expect(addMinutes("23:50", 15)).toBe("00:05");
        expect(addMinutes("00:10", -20)).toBe("23:50");
    });

    it("ignores seconds in the input", () => {
        expect(addMinutes("08:30:00", 15)).toBe("08:45");
    });
});

describe("formatDateAs", () => {
    it("renders tokens in any order", () => {
        expect(formatDateAs("2026-07-14", "DD.MM.YYYY")).toBe("14.07.2026");
        expect(formatDateAs("2026-07-14", "MM/DD/YYYY")).toBe("07/14/2026");
        expect(formatDateAs("2026-07-14", "YYYY-MM-DD")).toBe("2026-07-14");
    });
});

describe("parseDateAs", () => {
    it("parses back to ISO", () => {
        expect(parseDateAs("14.07.2026", "DD.MM.YYYY")).toBe("2026-07-14");
        expect(parseDateAs("07/14/2026", "MM/DD/YYYY")).toBe("2026-07-14");
        expect(parseDateAs("2026-07-14", "YYYY-MM-DD")).toBe("2026-07-14");
    });

    it("accepts unpadded day and month", () => {
        expect(parseDateAs("4.7.2026", "DD.MM.YYYY")).toBe("2026-07-04");
    });

    it("rejects garbage and impossible dates", () => {
        expect(parseDateAs("banana", "DD.MM.YYYY")).toBeNull();
        expect(parseDateAs("14.07", "DD.MM.YYYY")).toBeNull();
        expect(parseDateAs("30.02.2026", "DD.MM.YYYY")).toBeNull();
        expect(parseDateAs("14.13.2026", "DD.MM.YYYY")).toBeNull();
        expect(parseDateAs("00.01.2026", "DD.MM.YYYY")).toBeNull();
    });
});

describe("formatTimeAs", () => {
    it("renders hour and minute tokens", () => {
        expect(formatTimeAs("08:05", "HH:mm")).toBe("08:05");
    });
});

describe("parseTimeAs", () => {
    it("parses back to HH:mm", () => {
        expect(parseTimeAs("8:05", "HH:mm")).toBe("08:05");
        expect(parseTimeAs("23:59", "HH:mm")).toBe("23:59");
        expect(parseTimeAs("0:00", "HH:mm")).toBe("00:00");
    });

    it("rejects out-of-range and garbage input", () => {
        expect(parseTimeAs("24:00", "HH:mm")).toBeNull();
        expect(parseTimeAs("12:60", "HH:mm")).toBeNull();
        expect(parseTimeAs("noon", "HH:mm")).toBeNull();
        expect(parseTimeAs("12", "HH:mm")).toBeNull();
    });
});
