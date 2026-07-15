<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        label?: string;
        children: Snippet;
    };

    let { label, children }: Props = $props();
</script>

<div
    role="group"
    aria-label={label}
    class="inline-flex [&>button]:rounded-none [&>button:not(:first-child)]:border-l-0 [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg"
>
    {@render children()}
</div>
