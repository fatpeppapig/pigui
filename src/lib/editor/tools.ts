import type { Component, SvelteComponent } from "svelte";

import type { Editor } from "@tiptap/core";

import IconBlockquote from "@tabler/icons-svelte/icons/blockquote";
import IconBold from "@tabler/icons-svelte/icons/bold";
import IconCode from "@tabler/icons-svelte/icons/code";
import IconH1 from "@tabler/icons-svelte/icons/h-1";
import IconH2 from "@tabler/icons-svelte/icons/h-2";
import IconH3 from "@tabler/icons-svelte/icons/h-3";
import IconItalic from "@tabler/icons-svelte/icons/italic";
import IconList from "@tabler/icons-svelte/icons/list";
import IconListCheck from "@tabler/icons-svelte/icons/list-check";
import IconListNumbers from "@tabler/icons-svelte/icons/list-numbers";
import IconRedo from "@tabler/icons-svelte/icons/arrow-forward-up";
import IconRule from "@tabler/icons-svelte/icons/minus";
import IconStrikethrough from "@tabler/icons-svelte/icons/strikethrough";
import IconTable from "@tabler/icons-svelte/icons/table";
import IconUnderline from "@tabler/icons-svelte/icons/underline";
import IconUndo from "@tabler/icons-svelte/icons/arrow-back-up";

export type EditorTool =
    | "h1"
    | "h2"
    | "h3"
    | "bold"
    | "italic"
    | "underline"
    | "strike"
    | "code"
    | "bulletList"
    | "orderedList"
    | "taskList"
    | "table"
    | "blockquote"
    | "horizontalRule"
    | "undo"
    | "redo";

type ToolDefinition = {
    icon:
        | Component<{ class?: string }>
        | typeof SvelteComponent<{ class?: string }>;
    title: string;
    isActive?: (editor: Editor) => boolean;
    run: (editor: Editor) => void;
};

const heading = (level: 1 | 2 | 3): ToolDefinition => ({
    icon: { 1: IconH1, 2: IconH2, 3: IconH3 }[level],
    title: `heading ${level}`,
    isActive: (editor) => editor.isActive("heading", { level }),
    run: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
});

export const editorTools: Record<EditorTool, ToolDefinition> = {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    bold: {
        icon: IconBold,
        title: "bold",
        isActive: (editor) => editor.isActive("bold"),
        run: (editor) => editor.chain().focus().toggleBold().run(),
    },
    italic: {
        icon: IconItalic,
        title: "italic",
        isActive: (editor) => editor.isActive("italic"),
        run: (editor) => editor.chain().focus().toggleItalic().run(),
    },
    underline: {
        icon: IconUnderline,
        title: "underline",
        isActive: (editor) => editor.isActive("underline"),
        run: (editor) => editor.chain().focus().toggleUnderline().run(),
    },
    strike: {
        icon: IconStrikethrough,
        title: "strikethrough",
        isActive: (editor) => editor.isActive("strike"),
        run: (editor) => editor.chain().focus().toggleStrike().run(),
    },
    code: {
        icon: IconCode,
        title: "code",
        isActive: (editor) => editor.isActive("code"),
        run: (editor) => editor.chain().focus().toggleCode().run(),
    },
    bulletList: {
        icon: IconList,
        title: "bullet list",
        isActive: (editor) => editor.isActive("bulletList"),
        run: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    orderedList: {
        icon: IconListNumbers,
        title: "ordered list",
        isActive: (editor) => editor.isActive("orderedList"),
        run: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
    taskList: {
        icon: IconListCheck,
        title: "task list",
        isActive: (editor) => editor.isActive("taskList"),
        run: (editor) => editor.chain().focus().toggleTaskList().run(),
    },
    table: {
        icon: IconTable,
        title: "table",
        isActive: (editor) => editor.isActive("table"),
        run: (editor) =>
            editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run(),
    },
    blockquote: {
        icon: IconBlockquote,
        title: "blockquote",
        isActive: (editor) => editor.isActive("blockquote"),
        run: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    horizontalRule: {
        icon: IconRule,
        title: "horizontal rule",
        run: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
    undo: {
        icon: IconUndo,
        title: "undo",
        run: (editor) => editor.chain().focus().undo().run(),
    },
    redo: {
        icon: IconRedo,
        title: "redo",
        run: (editor) => editor.chain().focus().redo().run(),
    },
};

export const DEFAULT_TOOLS: EditorTool[][] = [
    ["h1", "h2", "h3"],
    ["bold", "italic", "strike"],
    ["bulletList", "orderedList"],
];
