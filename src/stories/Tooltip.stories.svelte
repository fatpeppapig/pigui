<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import Tooltip from "../lib/Tooltip.svelte";

    const { Story } = defineMeta({
        title: "Components/Tooltip",
        component: Tooltip,
        args: { text: "More information" },
    });
</script>

<Story name="Default">
    {#snippet template({ children: _children, ...args })}
        <Tooltip {...args}>
            <Button size="md" label="Hover me" />
        </Tooltip>
    {/snippet}
</Story>

<Story name="Right Placement" args={{ placement: "right", delay: 0 }}>
    {#snippet template({ children: _children, ...args })}
        <Tooltip {...args}>
            <Button size="md" label="Hover me" />
        </Tooltip>
    {/snippet}
</Story>
