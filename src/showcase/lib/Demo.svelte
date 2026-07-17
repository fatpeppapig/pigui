<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        label,
        inner = "flex flex-wrap items-center gap-4",
        children,
    }: {
        label?: string;
        inner?: string;
        children: Snippet;
    } = $props();
</script>

<div class="overflow-hidden rounded-xl border border-border bg-surface">
    {#if label}
        <div
            class="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground"
        >
            {label}
        </div>
    {/if}
    <div class="p-6 {inner}">
        {@render children()}
    </div>
</div>
