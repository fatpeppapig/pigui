<script lang="ts">
    import { RichEditor } from "pigui/editor";

    let value = $state("Type something **bold**.");
</script>

<div class="grid gap-4 md:grid-cols-2">
    <RichEditor
        bind:value
        tools={[
            ["h2", "h3"],
            ["bold", "italic", "code"],
            ["blockquote", "bulletList"],
            ["undo", "redo"],
        ]}
        class="min-h-48"
    />

    <pre
        class="overflow-x-auto rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">{value}</pre>
</div>
