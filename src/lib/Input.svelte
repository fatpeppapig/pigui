<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    import { config } from "./constants/config.svelte";
    import { formatNumber, parseNumber, roundTo } from "./utils/number";

    type Props = Omit<
        HTMLInputAttributes,
        "class" | "type" | "value" | "onblur" | "onfocus" | "onkeydown"
    > & {
        ref?: HTMLInputElement;
        value?: string | number;
        placeholder?: string;
        type?: string;
        decimals?: number;
        required?: boolean;
        autofocus?: boolean;
        bare?: boolean;
        class?: HTMLInputAttributes["class"];
        onblur?: () => void;
        onfocus?: () => void;
        onkeydown?: (event: KeyboardEvent) => void;
    };

    let {
        ref = $bindable(),
        value = $bindable(""),
        placeholder,
        type = "text",
        decimals = 2,
        required,
        autofocus,
        bare,
        class: className,
        onblur,
        onfocus,
        onkeydown,
        ...rest
    }: Props = $props();

    let draft: string | null = $state(null);

    const display = $derived(
        draft ??
            (value === "" ? "" : formatNumber(value, config.decimalSeparator)),
    );

    const commit = () => {
        if (draft === null) return;

        const text = draft.trim();
        const parsed = parseNumber(text);

        draft = null;

        if (text === "") {
            value = "";
        } else if (parsed !== null) {
            value = roundTo(parsed, decimals);
        }
    };

    const numberBlur = () => {
        commit();
        onblur?.();
    };

    const numberKeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            commit();
        }

        onkeydown?.(event);
    };

    const init = (node: HTMLInputElement) => {
        if (!autofocus) return;

        requestAnimationFrame(() => {
            node.focus();
            node.select();
        });
    };

    const inputClass = $derived([
        !bare && "w-full bg-surface rounded-lg px-2 py-1 border border-border",
        className,
    ]);
</script>

{#if type === "number"}
    <input
        bind:this={ref}
        class={inputClass}
        use:init
        type="text"
        inputmode="decimal"
        {placeholder}
        {required}
        value={display}
        oninput={(event) => (draft = event.currentTarget.value)}
        onblur={numberBlur}
        {onfocus}
        onkeydown={numberKeydown}
        {...rest}
    />
{:else}
    <input
        bind:this={ref}
        class={inputClass}
        use:init
        {type}
        {placeholder}
        {required}
        {onblur}
        {onfocus}
        {onkeydown}
        bind:value
        {...rest}
    />
{/if}
