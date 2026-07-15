<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import Dropdown from "../lib/Dropdown.svelte";

    const items = [
        { label: "Rename", onSelect: () => {} },
        { label: "Duplicate", onSelect: () => {} },
        { label: "Archive", disabled: true },
        { label: "Delete", onSelect: () => {} },
    ];

    const { Story } = defineMeta({
        title: "Components/Dropdown",
        component: Dropdown,
        args: { items, label: "Actions" },
    });
</script>

<Story name="Default">
    {#snippet template({ trigger: _trigger, ...args })}
        <Dropdown {...args}>
            {#snippet trigger()}
                <Button size="md" label="Actions" />
            {/snippet}
        </Dropdown>
    {/snippet}
</Story>

<Story name="Top Placement" args={{ placement: "top-start" }}>
    {#snippet template({ trigger: _trigger, ...args })}
        <Dropdown {...args}>
            {#snippet trigger()}
                <Button size="md" label="Actions" />
            {/snippet}
        </Dropdown>
    {/snippet}
</Story>
