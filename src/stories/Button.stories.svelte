<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { SIZES, VARIANTS } from "../lib/constants/variants";
    import IconClock from "@tabler/icons-svelte/icons/clock";
    import Button from "../lib/Button.svelte";

    const { Story } = defineMeta({
        title: "Components/Button",
        component: Button,
        argTypes: {
            variant: { control: "select", options: VARIANTS },
            size: { control: "select", options: SIZES },
        },
        args: {
            label: "Button",
            size: "md",
        },
    });
</script>

<Story name="Primary" args={{ variant: "primary" }} />

<Story name="Secondary" args={{ variant: "secondary" }} />

<Story name="Tertiary" args={{ variant: "tertiary" }} />

<Story name="Link" args={{ variant: "link" }} />

<Story name="Disabled" args={{ variant: "primary", disabled: true }} />

<Story name="With Icon" args={{ variant: "secondary", icon: IconClock }} />

<Story
    name="Round Icon"
    args={{
        variant: "secondary",
        icon: IconClock,
        round: true,
        label: undefined,
        title: "Clock",
    }}
/>

<Story name="Sizes">
    {#snippet template(args)}
        <div class="flex items-end gap-2">
            {#each SIZES as size (size)}
                <Button {...args} {size} label={size} />
            {/each}
        </div>
    {/snippet}
</Story>
