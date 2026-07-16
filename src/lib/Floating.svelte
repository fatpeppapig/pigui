<script lang="ts">
    import type { Snippet } from "svelte";

    import { computePosition, type Placement, type Side } from "./utils/floating";

    import "../styles/Floating.css";

    type Props = {
        anchor?: HTMLElement;
        open: boolean;
        placement?: Placement;
        offset?: number;
        dismissible?: boolean;
        matchWidth?: boolean;
        role?: string;
        onClose?: () => void;
        children: Snippet;
    };

    let {
        anchor,
        open,
        placement = "bottom",
        offset = 6,
        dismissible = true,
        matchWidth = false,
        role,
        onClose,
        children,
    }: Props = $props();

    let el: HTMLDivElement | undefined = $state();
    let side: Side | undefined = $state();

    const position = () => {
        if (!anchor || !el) return;

        if (matchWidth) {
            el.style.width = `${anchor.offsetWidth}px`;
        }

        const placed = computePosition(
            anchor.getBoundingClientRect(),
            { width: el.offsetWidth, height: el.offsetHeight },
            { width: window.innerWidth, height: window.innerHeight },
            placement,
            offset,
        );

        el.style.top = `${placed.top}px`;
        el.style.left = `${placed.left}px`;
        side = placed.side;
    };

    $effect(() => {
        if (!el) return;

        if (open) {
            if (!el.matches(":popover-open")) {
                el.showPopover();
            }

            position();

            window.addEventListener("scroll", position, true);
            window.addEventListener("resize", position);

            return () => {
                window.removeEventListener("scroll", position, true);
                window.removeEventListener("resize", position);
            };
        }

        if (el.matches(":popover-open")) {
            el.hidePopover();
        }
    });

    const toggle = (event: ToggleEvent) => {
        if (event.newState === "closed" && open) {
            onClose?.();
        }
    };
</script>

<div
    bind:this={el}
    popover={dismissible ? "auto" : "manual"}
    {role}
    data-side={side}
    ontoggle={toggle}
    class="pigui-floating fixed m-0 border-0 bg-transparent p-0 overflow-visible"
>
    {@render children()}
</div>
