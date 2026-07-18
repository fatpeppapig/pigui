<script lang="ts" generics="V">
    import { colorTransition } from "./constants/animations";

    import Floating from "./Floating.svelte";

    type Option = {
        value: V;
        label: string;
    };

    type Props = {
        options: Option[];
        placeholder?: string;
        value?: V | null;
        onEnter?: () => void;
        oninput?: (query: string) => void;
    };

    let {
        options,
        placeholder,
        value = $bindable(null),
        onEnter,
        oninput,
    }: Props = $props();

    let query = $state("");
    let open = $state(false);
    let highlighted = $state(0);
    let anchor: HTMLDivElement | undefined = $state();
    let list: HTMLUListElement | undefined = $state();

    const filtered = $derived(
        options.filter((option) =>
            option.label.toLowerCase().includes(query.trim().toLowerCase()),
        ),
    );

    const active = $derived(Math.min(highlighted, filtered.length - 1));

    const display = $derived(
        value === null
            ? query
            : (options.find((option) => option.value === value)?.label ?? ""),
    );

    const select = (option: Option) => {
        value = option.value;
        query = "";
        highlighted = 0;
        open = false;
    };

    const move = (delta: number) => {
        if (!open) {
            open = true;

            return;
        }

        const index = Math.max(
            0,
            Math.min(active + delta, filtered.length - 1),
        );

        highlighted = index;
        list?.children[index]?.scrollIntoView({ block: "nearest" });
    };

    const keydown = (event: KeyboardEvent) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
        } else if (event.key === "Enter") {
            event.preventDefault();

            if (open && filtered[active]) {
                select(filtered[active]);
            } else if (value !== null) {
                onEnter?.();
            }
        } else if (event.key === "Escape" && open && filtered.length) {
            event.preventDefault();
            open = false;
        }
    };

    const input = (text: string) => {
        query = text;
        value = null;
        highlighted = 0;
        open = true;
        oninput?.(text);
    };
</script>

<div bind:this={anchor} class="w-full">
    <input
        class="w-full bg-surface rounded-lg px-2 py-1 border border-border"
        {placeholder}
        value={display}
        oninput={(event) => input(event.currentTarget.value)}
        onfocus={() => (open = true)}
        onclick={() => (open = true)}
        onblur={() => (open = false)}
        onkeydown={keydown}
    />
</div>

<Floating
    {anchor}
    open={open && filtered.length > 0}
    placement="bottom-start"
    offset={4}
    matchWidth
    onClose={() => (open = false)}
>
    <ul
        bind:this={list}
        class="max-h-48 w-full overflow-y-auto rounded-lg border border-border bg-surface"
    >
        {#each filtered as option, index (option.value)}
            <li>
                <button
                    class={[
                        "w-full px-2 py-1 text-left cursor-pointer",
                        colorTransition,
                        index === active && "bg-muted",
                    ]}
                    onpointerenter={() => (highlighted = index)}
                    onpointerdown={(event) => {
                        event.preventDefault();
                        select(option);
                    }}
                >
                    {option.label}
                </button>
            </li>
        {/each}
    </ul>
</Floating>
