<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import Popover from "../lib/Popover.svelte";

    const { Story } = defineMeta({
        title: "Components/Popover",
        component: Popover,
    });
</script>

<Story name="Default">
    {#snippet template({ trigger: _trigger, children: _children, ...args })}
        <Popover {...args}>
            {#snippet trigger()}
                <Button size="md" label="Open popover" />
            {/snippet}

            <div class="flex max-w-60 flex-col gap-1">
                <div class="font-bold">Popover</div>

                <p>Click outside or press Escape to dismiss.</p>
            </div>
        </Popover>
    {/snippet}
</Story>
