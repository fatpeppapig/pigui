<script lang="ts">
    type Item = {
        value: string | number;
        label: string;
        disabled?: boolean;
    };

    type Props = {
        items: Item[];
        value?: string | number;
        label?: string;
        onChange?: (value: string | number) => void;
    };

    let { items, value = $bindable(), label, onChange }: Props = $props();

    let list: HTMLDivElement | undefined = $state();

    const selectedIndex = $derived(
        items.findIndex((item) => item.value === value),
    );

    const firstEnabled = $derived(items.findIndex((item) => !item.disabled));

    const select = (item: Item) => {
        if (item.disabled || item.value === value) return;

        value = item.value;
        onChange?.(item.value);
    };

    const move = (from: number, delta: number) => {
        for (
            let index = (from + delta + items.length) % items.length;
            index !== from;
            index = (index + delta + items.length) % items.length
        ) {
            if (!items[index].disabled) {
                select(items[index]);
                (list?.children[index] as HTMLElement | undefined)?.focus();
                return;
            }
        }
    };

    const keydown = (event: KeyboardEvent, index: number) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            move(index, 1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(index, -1);
        }
    };

    const focusable = (index: number) =>
        selectedIndex === -1 ? index === firstEnabled : index === selectedIndex;
</script>

<div
    bind:this={list}
    role="tablist"
    aria-label={label}
    class="flex items-end gap-1 border-b border-border"
>
    {#each items as item, index (item.value)}
        <button
            role="tab"
            aria-selected={value === item.value}
            tabindex={focusable(index) ? 0 : -1}
            disabled={item.disabled}
            class={[
                "-mb-px cursor-pointer rounded-t-md border-b-2 px-3 py-1.5",
                value === item.value
                    ? "border-accent font-bold"
                    : "border-transparent hover:bg-muted",
                item.disabled && "opacity-50 pointer-events-none",
            ]}
            onclick={() => select(item)}
            onkeydown={(event) => keydown(event, index)}
        >
            {item.label}
        </button>
    {/each}
</div>
