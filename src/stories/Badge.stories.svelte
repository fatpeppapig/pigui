<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { SIZES, STATUSES, VARIANTS } from "../lib/constants/variants";
    import Badge from "../lib/Badge.svelte";

    const { Story } = defineMeta({
        title: "Components/Badge",
        component: Badge,
        argTypes: {
            variant: {
                control: "select",
                options: [...VARIANTS, ...STATUSES],
            },
            size: { control: "select", options: SIZES },
        },
        args: {
            label: "Badge",
        },
    });
</script>

<Story name="Default" />

<Story name="Variants">
    {#snippet template(args)}
        <div class="flex flex-wrap items-center gap-2">
            {#each [...VARIANTS, ...STATUSES] as variant (variant)}
                <Badge {...args} {variant} label={variant} />
            {/each}
        </div>
    {/snippet}
</Story>

<Story name="Sizes">
    {#snippet template(args)}
        <div class="flex items-center gap-2">
            {#each SIZES as size (size)}
                <Badge {...args} {size} label={size} />
            {/each}
        </div>
    {/snippet}
</Story>
