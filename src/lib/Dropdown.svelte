<script lang="ts">
    import type { Snippet } from "svelte";

    import type { Placement } from "./utils/floating";

    import Floating from "./Floating.svelte";

    type Item = {
        label: string;
        disabled?: boolean;
        onSelect?: () => void;
    };

    type Props = {
        items: Item[];
        placement?: Placement;
        label?: string;
        trigger: Snippet;
    };

    let { items, placement = "bottom-start", label, trigger }: Props = $props();

    let anchor: HTMLElement | undefined = $state();
    let list: HTMLUListElement | undefined = $state();
    let open = $state(false);
    let highlighted = $state(0);
    let closedAt = 0;

    const close = () => {
        open = false;
        closedAt = Date.now();
    };

    const toggle = () => {
        if (open) {
            close();
        } else if (Date.now() - closedAt > 150) {
            highlighted = 0;
            open = true;
        }
    };

    const select = (item: Item) => {
        if (item.disabled) return;

        item.onSelect?.();
        close();
    };

    const move = (delta: number) => {
        if (!items.length) return;

        let index = highlighted;

        do {
            index = (index + delta + items.length) % items.length;
        } while (items[index].disabled && index !== highlighted);

        highlighted = index;
        list?.children[index]?.scrollIntoView({ block: "nearest" });
    };

    const keydown = (event: KeyboardEvent) => {
        if (!open) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select(items[highlighted]);
        }
    };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<div
    bind:this={anchor}
    class="inline-flex"
    onclick={toggle}
    onkeydown={keydown}
>
    {@render trigger()}
</div>

<Floating {anchor} {open} {placement} onClose={close}>
    <ul
        bind:this={list}
        role="menu"
        aria-label={label}
        class="min-w-40 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-md"
    >
        {#each items as item, index (item.label)}
            <li role="none">
                <button
                    role="menuitem"
                    disabled={item.disabled}
                    class={[
                        "w-full px-3 py-1.5 text-left cursor-pointer truncate",
                        index === highlighted && "bg-muted",
                        item.disabled && "opacity-50",
                    ]}
                    onpointerenter={() => (highlighted = index)}
                    onclick={() => select(item)}
                >
                    {item.label}
                </button>
            </li>
        {/each}
    </ul>
</Floating>
