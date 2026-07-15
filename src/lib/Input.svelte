<script lang="ts">
    import { config } from "./constants/config.svelte";
    import { formatNumber, parseNumber, roundTo } from "./utils/number";

    type Props = {
        value?: string | number;
        placeholder?: string;
        type?: string;
        decimals?: number;
        required?: boolean;
        autofocus?: boolean;
        onblur?: () => void;
        onfocus?: () => void;
        onkeydown?: (event: KeyboardEvent) => void;
    };

    let {
        value = $bindable(""),
        placeholder,
        type = "text",
        decimals = 2,
        required,
        autofocus,
        onblur,
        onfocus,
        onkeydown,
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
</script>

{#if type === "number"}
    <input
        class="w-full bg-surface rounded-lg px-2 py-1 border border-border"
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
    />
{:else}
    <input
        class="w-full bg-surface rounded-lg px-2 py-1 border border-border"
        use:init
        {type}
        {placeholder}
        {required}
        {onblur}
        {onfocus}
        {onkeydown}
        bind:value
    />
{/if}
