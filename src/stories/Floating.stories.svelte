<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import Floating from "../lib/Floating.svelte";

    const placements = [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
    ];

    const { Story } = defineMeta({
        title: "Components/Floating",
        component: Floating,
        argTypes: {
            placement: { control: "select", options: placements },
        },
        args: { placement: "bottom" },
    });
</script>

<script lang="ts">
    let anchor = $state<HTMLElement>();
    let open = $state(false);
</script>

<Story name="Default">
    {#snippet template({
        children: _children,
        anchor: _anchor,
        open: _open,
        onClose: _onClose,
        ...args
    })}
        <div bind:this={anchor} class="inline-flex h-10">
            <Button
                label={open ? "Hide" : "Show"}
                action={() => (open = !open)}
            />
        </div>

        <Floating {...args} {anchor} {open} onClose={() => (open = false)}>
            <div
                class="rounded-lg border border-border bg-surface-raised p-3 shadow-md"
            >
                Anchored to the button with the native popover API.
            </div>
        </Floating>
    {/snippet}
</Story>
