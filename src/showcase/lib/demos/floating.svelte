<script lang="ts">
    import { Button, Floating } from "pigui";

    let floatingAnchor = $state<HTMLElement>();

    let floatingOpen = $state(false);
</script>

<div bind:this={floatingAnchor} class="inline-flex h-10">
    <Button
        label={floatingOpen ? "Hide" : "Show"}
        action={() => (floatingOpen = !floatingOpen)}
    />
</div>

<Floating
    anchor={floatingAnchor}
    open={floatingOpen}
    placement="bottom"
    onClose={() => (floatingOpen = false)}
>
    <div
        class="rounded-lg border border-border bg-surface-raised p-3 shadow-md"
    >
        Anchored to the button with the native popover API.
    </div>
</Floating>
