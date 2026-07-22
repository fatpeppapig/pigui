<script lang="ts">
    import type { Snippet } from "svelte";

    import { config } from "./constants/config.svelte";

    import type { Placement } from "./utils/floating";

    import Floating from "./Floating.svelte";

    type Props = {
        open?: boolean;
        placement?: Placement;
        trigger: Snippet;
        children: Snippet;
    };

    let {
        open = $bindable(false),
        placement = "bottom",
        trigger,
        children,
    }: Props = $props();

    let anchor: HTMLElement | undefined = $state();
    let closedAt = 0;

    const close = () => {
        open = false;
        closedAt = Date.now();
    };

    const toggle = () => {
        if (open) {
            close();
        } else if (Date.now() - closedAt > config.dismissDebounceMs) {
            open = true;
        }
    };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<div bind:this={anchor} class="inline-flex" onclick={toggle}>
    {@render trigger()}
</div>

<Floating {anchor} {open} {placement} onClose={close}>
    <div
        class="rounded-lg border border-border bg-surface-raised p-3 shadow-md"
    >
        {@render children()}
    </div>
</Floating>
