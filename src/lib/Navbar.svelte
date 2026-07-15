<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        brand?: Snippet;
        nav?: Snippet;
        actions?: Snippet;
    };

    let { brand, nav, actions }: Props = $props();
</script>

<header
    class="relative w-full bg-surface-brand px-4 py-1 flex items-center justify-between flex-wrap gap-y-2"
>
    <div class="flex w-1/3 md:hidden"></div>

    <div class="flex md:w-1/3">
        {@render brand?.()}
    </div>

    <div class="flex md:hidden w-1/3 justify-end items-center gap-2">
        {@render actions?.()}
    </div>

    <div class="flex w-full md:w-1/3 h-10 my-2">
        {@render nav?.()}
    </div>

    <div class="hidden md:flex md:w-1/3 justify-end items-center gap-2">
        {@render actions?.()}
    </div>
</header>
