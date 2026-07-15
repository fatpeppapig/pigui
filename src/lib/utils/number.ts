export const parseNumber = (text: string): number | null => {
    const normalized = text.trim().replace(",", ".");

    if (!normalized) return null;

    const value = Number(normalized);

    return Number.isFinite(value) ? value : null;
};

export const formatNumber = (
    value: string | number,
    separator: string,
): string => String(value).replace(".", separator);

export const roundTo = (value: number, decimals: number): number =>
    Math.round(value * 10 ** decimals) / 10 ** decimals;
