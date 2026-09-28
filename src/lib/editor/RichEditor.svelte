<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import { Editor, type Extensions } from "@tiptap/core";
    import { Image } from "@tiptap/extension-image";
    import { TaskItem, TaskList } from "@tiptap/extension-list";
    import { TableKit } from "@tiptap/extension-table";
    import { Markdown } from "@tiptap/markdown";
    import StarterKit from "@tiptap/starter-kit";

    import "../../styles/RichText.css";

    import Button from "../Button.svelte";
    import ButtonGroup from "../ButtonGroup.svelte";
    import type { Size } from "../constants/variants";
    import { normalizeMarkdown } from "../utils/markdown";

    import { DEFAULT_TOOLS, editorTools, type EditorTool } from "./tools";

    const MARKDOWN_EXTENSIONS = [
        StarterKit,
        Markdown,
        TableKit,
        TaskList,
        TaskItem,
        Image,
    ];

    type Props = {
        value?: string;
        tools?: EditorTool[][];
        extensions?: Extensions;
        editable?: boolean;
        size?: Size;
        class?: string;
        onCommit?: (value: string) => void;
    };

    let {
        value = $bindable(""),
        tools = DEFAULT_TOOLS,
        extensions = [],
        editable = true,
        size = "md",
        class: className,
        onCommit,
    }: Props = $props();

    let element: HTMLDivElement;
    let editor = $state<Editor | null>(null);
    let revision = $state(0);
    let committed = value;
    let synced = value;

    const read = (instance: Editor) =>
        normalizeMarkdown(instance.getMarkdown());

    const commit = () => {
        if (value === committed) return;

        committed = value;
        onCommit?.(value);
    };

    onMount(() => {
        editor = new Editor({
            element,
            editable,
            extensions: [...MARKDOWN_EXTENSIONS, ...extensions],
            content: value,
            contentType: "markdown",
            editorProps: {
                attributes: { class: "pigui-prose h-full px-3 py-2" },
            },
            onTransaction: () => {
                revision++;
            },
            onUpdate: ({ editor: instance, transaction }) => {
                if (!transaction.docChanged) return;

                const markdown = read(instance);

                synced = markdown;

                if (markdown !== value) value = markdown;
            },
            onBlur: commit,
        });
    });

    onDestroy(() => {
        commit();
        editor?.destroy();
    });

    $effect(() => {
        if (!editor || value === synced) return;

        synced = value;
        committed = value;

        editor.commands.setContent(value, {
            contentType: "markdown",
            emitUpdate: false,
        });
    });

    $effect(() => {
        editor?.setEditable(editable, false);
    });

    const isActive = (tool: EditorTool) => {
        revision;

        return editor ? (editorTools[tool].isActive?.(editor) ?? false) : false;
    };
</script>

<div class="flex h-full w-full flex-col gap-2">
    {#if editable && tools.length}
        <div class="flex flex-wrap gap-2">
            {#each tools as group, index (index)}
                <ButtonGroup>
                    {#each group as tool (tool)}
                        <Button
                            {size}
                            icon={editorTools[tool].icon}
                            title={editorTools[tool].title}
                            active={isActive(tool)}
                            disabled={!editor}
                            action={() =>
                                editor && editorTools[tool].run(editor)}
                        />
                    {/each}
                </ButtonGroup>
            {/each}
        </div>
    {/if}

    <div
        bind:this={element}
        class={[
            "min-h-0 flex-1 overflow-auto rounded-lg border border-border bg-surface",
            className,
        ]}
    ></div>
</div>
