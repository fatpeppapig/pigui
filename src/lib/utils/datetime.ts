export const pad = (part: number) => String(part).padStart(2, "0");

const DATE_TOKENS: Record<string, string> = {
    YYYY: "(\\d{4})",
    MM: "(\\d{1,2})",
    DD: "(\\d{1,2})",
};

const TIME_TOKENS: Record<string, string> = {
    HH: "(\\d{1,2})",
    mm: "(\\d{1,2})",
};

const escapeLiteral = (char: string) =>
    char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildMatcher = (format: string, tokens: Record<string, string>) => {
    const order: string[] = [];

    let pattern = "^";
    let index = 0;

    while (index < format.length) {
        const token = Object.keys(tokens).find((name) =>
            format.startsWith(name, index),
        );

        if (token) {
            order.push(token);
            pattern += tokens[token];
            index += token.length;
        } else {
            pattern += escapeLiteral(format[index]);
            index += 1;
        }
    }

    return { regex: new RegExp(`${pattern}$`), order };
};

const matchParts = (
    text: string,
    format: string,
    tokens: Record<string, string>,
): Record<string, number> | null => {
    const { regex, order } = buildMatcher(format, tokens);
    const match = text.trim().match(regex);

    if (!match) return null;

    const parts: Record<string, number> = {};

    order.forEach((token, position) => {
        parts[token] = Number(match[position + 1]);
    });

    return parts;
};

export const formatDate = (date: Date): string =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const todayDate = (): string => formatDate(new Date());

export const addDays = (date: string, days: number): string => {
    const shifted = new Date(`${date}T00:00:00`);

    shifted.setDate(shifted.getDate() + days);

    return formatDate(shifted);
};

export const formatTime = (date: Date): string =>
    `${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const nowTime = (): string => formatTime(new Date());

export const addMinutes = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(":").map(Number);
    const total = (((hours * 60 + mins + minutes) % 1440) + 1440) % 1440;

    return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
};

export const formatDateAs = (date: string, format: string): string => {
    const [year, month, day] = date.split("-");

    return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
};

export const parseDateAs = (text: string, format: string): string | null => {
    const parts = matchParts(text, format, DATE_TOKENS);

    if (!parts) return null;

    const { YYYY: year, MM: month, DD: day } = parts;

    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return formatDate(date);
};

export const formatTimeAs = (time: string, format: string): string => {
    const [hours, minutes] = time.split(":");

    return format.replace("HH", hours).replace("mm", minutes);
};

export const parseTimeAs = (text: string, format: string): string | null => {
    const parts = matchParts(text, format, TIME_TOKENS);

    if (!parts) return null;

    const { HH: hours, mm: minutes } = parts;

    if (
        !Number.isInteger(hours) ||
        !Number.isInteger(minutes) ||
        hours > 23 ||
        minutes > 59
    ) {
        return null;
    }

    return `${pad(hours)}:${pad(minutes)}`;
};
