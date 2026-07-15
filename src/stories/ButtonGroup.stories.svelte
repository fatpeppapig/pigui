<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import ButtonGroup from "../lib/ButtonGroup.svelte";

    const { Story } = defineMeta({
        title: "Components/ButtonGroup",
        component: ButtonGroup,
        args: { label: "Alignment" },
    });
</script>

<Story name="Default">
    {#snippet template({ children: _children, ...args })}
        <ButtonGroup {...args}>
            <Button size="md" label="Left" />
            <Button size="md" label="Center" active />
            <Button size="md" label="Right" />
        </ButtonGroup>
    {/snippet}
</Story>
