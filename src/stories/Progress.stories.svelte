<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { SIZES, STATUSES } from "../lib/constants/variants";
    import Progress from "../lib/Progress.svelte";

    const { Story } = defineMeta({
        title: "Components/Progress",
        component: Progress,
        argTypes: {
            status: { control: "select", options: STATUSES },
            size: { control: "select", options: SIZES },
        },
        args: { value: 40, label: "Progress" },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="w-64">
            <Progress {...args} />
        </div>
    {/snippet}
</Story>

<Story name="Statuses">
    {#snippet template(args)}
        <div class="flex w-64 flex-col gap-3">
            {#each STATUSES as status (status)}
                <Progress {...args} {status} />
            {/each}
        </div>
    {/snippet}
</Story>

<Story name="Sizes">
    {#snippet template(args)}
        <div class="flex w-64 flex-col gap-3">
            {#each SIZES as size (size)}
                <Progress {...args} {size} />
            {/each}
        </div>
    {/snippet}
</Story>
