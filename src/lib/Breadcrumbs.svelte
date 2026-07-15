<script lang="ts">
    type Item = {
        label: string;
        href?: string;
    };

    type Props = {
        items: Item[];
        separator?: string;
        label?: string;
    };

    let { items, separator = "/", label = "Breadcrumb" }: Props = $props();
</script>

<nav aria-label={label}>
    <ol class="flex items-center gap-2 flex-wrap">
        {#each items as item, index (index)}
            <li class="flex items-center gap-2">
                {#if index > 0}
                    <span aria-hidden="true" class="text-muted-foreground">
                        {separator}
                    </span>
                {/if}

                {#if item.href}
                    <a
                        href={item.href}
                        aria-current={index === items.length - 1
                            ? "page"
                            : undefined}
                        class="text-muted-foreground underline underline-offset-2"
                    >
                        {item.label}
                    </a>
                {:else}
                    <span
                        aria-current={index === items.length - 1
                            ? "page"
                            : undefined}
                    >
                        {item.label}
                    </span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>
