<script lang="ts">
    import type { Snippet } from "svelte";

    import type { Placement } from "./utils/floating";

    import Floating from "./Floating.svelte";

    type Props = {
        text: string;
        placement?: Placement;
        delay?: number;
        children: Snippet;
    };

    let { text, placement = "top", delay = 300, children }: Props = $props();

    let anchor: HTMLElement | undefined = $state();
    let open = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    const show = () => {
        clearTimeout(timer);
        timer = setTimeout(() => (open = true), delay);
    };

    const hide = () => {
        clearTimeout(timer);
        open = false;
    };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
    bind:this={anchor}
    class="inline-flex"
    onmouseenter={show}
    onmouseleave={hide}
    onfocusin={show}
    onfocusout={hide}
>
    {@render children()}
</span>

<Floating {anchor} {open} {placement} dismissible={false} role="tooltip">
    <div class="rounded-md bg-foreground px-2 py-1 text-sm text-background">
        {text}
    </div>
</Floating>
