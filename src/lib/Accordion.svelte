<script lang="ts">
    import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";

    import type { Snippet } from "svelte";

    type Item = {
        title: string;
        content: Snippet;
        open?: boolean;
    };

    type Props = {
        items: Item[];
        exclusive?: boolean;
    };

    let { items, exclusive = false }: Props = $props();

    const group = $props.id();
</script>

<div
    class="flex flex-col overflow-hidden rounded-lg border border-border divide-y divide-border"
>
    {#each items as item, index (index)}
        <details
            name={exclusive ? group : undefined}
            open={item.open}
            class="group bg-surface"
        >
            <summary
                class="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 font-bold hover:bg-muted [&::-webkit-details-marker]:hidden"
            >
                {item.title}

                <IconChevronDown
                    class="h-4 w-4 transition-transform group-open:rotate-180"
                />
            </summary>

            <div class="border-t border-border px-3 py-2">
                {@render item.content()}
            </div>
        </details>
    {/each}
</div>
