export type ComponentsConfig = {
    dateFormat: string;
    timeFormat: string;
    decimalSeparator: string;
    weekStart: 0 | 1;
    weekdayLabels: string[];
    monthLabels: string[];
    dismissDebounceMs: number;
};

export const config: ComponentsConfig = $state({
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm",
    decimalSeparator: ".",
    weekStart: 1,
    dismissDebounceMs: 300,
    weekdayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthLabels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
});

export const configure = (overrides: Partial<ComponentsConfig>) =>
    Object.assign(config, overrides);
