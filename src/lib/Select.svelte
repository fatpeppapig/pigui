<script lang="ts">
    import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";

    import { colorTransition, pressClasses } from "./constants/animations";
    import { config } from "./constants/config.svelte";

    import Floating from "./Floating.svelte";

    type Option = {
        value: string | number;
        label?: string;
    };

    type Props = {
        value?: string | number;
        options: Option[];
    };

    let { value = $bindable(), options }: Props = $props();

    let anchor: HTMLButtonElement | undefined = $state();
    let list: HTMLUListElement | undefined = $state();
    let open = $state(false);
    let highlighted = $state(0);
    let closedAt = 0;

    const selected = $derived(
        options.findIndex((option) => option.value === value),
    );

    const label = $derived(
        options[selected]?.label ?? options[selected]?.value ?? "",
    );

    const close = () => {
        open = false;
        closedAt = Date.now();
    };

    const show = () => {
        if (Date.now() - closedAt <= config.dismissDebounceMs) return;

        open = true;
        highlighted = Math.max(selected, 0);
    };

    const commit = (index: number) => {
        if (options[index]) {
            value = options[index].value;
        }

        close();
    };

    const move = (delta: number) => {
        if (!open) {
            show();

            return;
        }

        const index = Math.max(
            0,
            Math.min(highlighted + delta, options.length - 1),
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
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (open) {
                commit(highlighted);
            } else {
                show();
            }
        } else if (event.key === "Escape" && open) {
            event.preventDefault();
            close();
        }
    };
</script>

<button
    bind:this={anchor}
    class={[
        "flex items-center gap-1 bg-surface rounded-lg px-2 py-1 border border-border cursor-pointer",
        pressClasses,
    ]}
    aria-haspopup="listbox"
    aria-expanded={open}
    onclick={() => (open ? close() : show())}
    onblur={close}
    onkeydown={keydown}
>
    {label}

    <IconChevronDown class="h-4 w-4" />
</button>

<Floating
    {anchor}
    {open}
    placement="bottom-start"
    offset={4}
    matchWidth
    onClose={close}
>
    <ul
        bind:this={list}
        role="listbox"
        class="max-h-48 w-full overflow-y-auto rounded-lg border border-border bg-surface"
    >
        {#each options as option, index (option.value)}
            <li role="option" aria-selected={index === selected}>
                <button
                    class={[
                        "w-full px-2 py-1 text-left cursor-pointer",
                        colorTransition,
                        index === highlighted && "bg-muted",
                    ]}
                    onpointerenter={() => (highlighted = index)}
                    onpointerdown={(event) => {
                        event.preventDefault();
                        commit(index);
                    }}
                >
                    {option.label ?? option.value}
                </button>
            </li>
        {/each}
    </ul>
</Floating>
