<script lang="ts">
    import type { Component, SvelteComponent } from "svelte";

    import {
        DEFAULT_VARIANT,
        activeClasses,
        disabledClasses,
        iconSizeClasses,
        paddingClasses,
        radiusClasses,
        shadowClasses,
        sizeClasses,
        variantClasses,
        type Size,
        type Variant,
    } from "./constants/variants";

    type Props = {
        action?: () => void;
        label?: string;
        type?: "button" | "submit" | "reset";
        icon?:
            | Component<{ class?: string }>
            | typeof SvelteComponent<{ class?: string }>;
        variant?: Variant;
        size?: Size;
        active?: boolean;
        round?: boolean;
        disabled?: boolean;
        shadow?: boolean;
        title?: string;
    };

    let {
        action,
        label,
        type,
        icon: Icon,
        variant = DEFAULT_VARIANT,
        size,
        active,
        round,
        disabled,
        shadow,
        title,
    }: Props = $props();
</script>

<button
    class={[
        "cursor-pointer flex items-center justify-center",
        size
            ? [
                  sizeClasses[size],
                  round
                      ? "rounded-full aspect-square"
                      : [paddingClasses[size], radiusClasses[size]],
              ]
            : [
                  "gap-1 w-full h-full",
                  round ? "rounded-full" : "rounded-lg px-2",
              ],
        active ? activeClasses : variantClasses[variant],
        disabled && disabledClasses,
        shadow && shadowClasses,
    ]}
    onclick={action}
    {type}
    {title}
    {disabled}
    aria-label={title}
>
    {#if Icon}
        <Icon class={iconSizeClasses[size ?? "md"]} />
    {/if}

    {#if label}
        {label}
    {/if}
</button>
