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

        const vv = window.visualViewport;
        const offsetLeft = vv?.offsetLeft ?? 0;
        const offsetTop = vv?.offsetTop ?? 0;
        const viewportWidth = vv?.width ?? window.innerWidth;
        const viewportHeight = vv?.height ?? window.innerHeight;

        const anchorRect = anchor.getBoundingClientRect();

        const placed = computePosition(
            {
                top: anchorRect.top - offsetTop,
                left: anchorRect.left - offsetLeft,
                width: anchorRect.width,
                height: anchorRect.height,
            },
            { width: el.offsetWidth, height: el.offsetHeight },
            { width: viewportWidth, height: viewportHeight },
            placement,
            offset,
        );

        el.style.top = `${placed.top + offsetTop}px`;
        el.style.left = `${placed.left + offsetLeft}px`;
        side = placed.side;
    };

    $effect(() => {
        if (!el) return;

        if (open) {
            if (!el.matches(":popover-open")) {
                el.showPopover();
            }

            position();

            const vv = window.visualViewport;

            window.addEventListener("scroll", position, true);
            window.addEventListener("resize", position);
            vv?.addEventListener("resize", position);
            vv?.addEventListener("scroll", position);

            return () => {
                window.removeEventListener("scroll", position, true);
                window.removeEventListener("resize", position);
                vv?.removeEventListener("resize", position);
                vv?.removeEventListener("scroll", position);
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
