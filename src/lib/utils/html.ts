import DOMPurify from "dompurify";

const EMPTY_PARAGRAPH = "<p></p>";

export const canSanitize = (): boolean => DOMPurify.isSupported;

export const sanitizeHtml = (html: string): string =>
    DOMPurify.isSupported ? DOMPurify.sanitize(html) : "";

export const htmlToText = (html: string): string =>
    html
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

export const normalizeHtml = (html: string): string => {
    const trimmed = html.trim();

    return trimmed === EMPTY_PARAGRAPH ? "" : trimmed;
};
