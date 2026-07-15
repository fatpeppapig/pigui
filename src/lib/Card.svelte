<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<card
    class="flex rounded-xl bg-secondary/80 p-4 w-full h-full border-border border"
>
    {@render children()}
</card>
