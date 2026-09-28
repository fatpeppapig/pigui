<script lang="ts">
    import { RichText } from "pigui";
    import { RichEditor } from "pigui/editor";

    let value = $state("<p>Type something <strong>bold</strong>.</p>");
</script>

<div class="grid gap-4 md:grid-cols-2">
    <RichEditor
        bind:value
        tools={[
            ["bold", "italic", "strike", "code"],
            ["blockquote", "bulletList"],
            ["undo", "redo"],
        ]}
        class="min-h-40"
    />

    <RichText
        {value}
        class="rounded-lg border border-border bg-surface px-3 py-2"
    />
</div>
