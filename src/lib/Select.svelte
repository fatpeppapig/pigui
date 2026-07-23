<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";

    import { colorTransition } from "./constants/animations";
    import { config } from "./constants/config.svelte";

    import Button from "./Button.svelte";
    import Floating from "./Floating.svelte";

    type Option = {
        value: string | number;
        label?: string;
    };

    type Props = {
        ref?: HTMLButtonElement;
        value?: string | number;
        options: Option[];
        class?: HTMLButtonAttributes["class"];
        disabled?: boolean;
        id?: string;
        name?: string;
        "aria-label"?: string;
    };

    let {
        ref = $bindable(),
        value = $bindable(),
        options,
        class: className,
        disabled,
        id,
        name,
        "aria-label": ariaLabel,
    }: Props = $props();

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

<Button
    bind:ref
    bare
    class={[
        "flex items-center gap-1 rounded-lg px-2 py-1 cursor-pointer",
        className,
    ]}
    icon={IconChevronDown}
    iconPosition="right"
    label={String(label)}
    {disabled}
    {id}
    {name}
    title={ariaLabel}
    aria-haspopup="listbox"
    aria-expanded={open}
    action={() => (open ? close() : show())}
    onblur={close}
    onkeydown={keydown}
/>

<Floating
    anchor={ref}
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
                <Button
                    bare
                    variant="none"
                    label={String(option.label ?? option.value)}
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
                />
            </li>
        {/each}
    </ul>
</Floating>
