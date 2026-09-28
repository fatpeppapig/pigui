import DOMPurify from "dompurify";
import { marked } from "marked";

const BLANK_PARAGRAPH = "&nbsp;";

const sanitize = (html: string) =>
    DOMPurify.isSupported ? DOMPurify.sanitize(html) : "";

export const markdownToHtml = (markdown: string): string =>
    sanitize(marked.parse(markdown, { async: false }));

export const normalizeMarkdown = (markdown: string): string => {
    const trimmed = markdown.trim();

    return trimmed === BLANK_PARAGRAPH ? "" : trimmed;
};
