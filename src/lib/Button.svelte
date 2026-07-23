<script lang="ts">
    import type { Component, Snippet, SvelteComponent } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    import { pressClasses } from "./constants/animations";
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

    type Props = Omit<HTMLButtonAttributes, "class" | "type" | "title"> & {
        ref?: HTMLButtonElement;
        action?: () => void;
        label?: string;
        type?: "button" | "submit" | "reset";
        icon?:
            | Component<{ class?: string }>
            | typeof SvelteComponent<{ class?: string }>;
        iconPosition?: "left" | "right";
        variant?: Variant;
        size?: Size;
        active?: boolean;
        round?: boolean;
        bare?: boolean;
        disabled?: boolean;
        shadow?: boolean;
        title?: string;
        class?: HTMLButtonAttributes["class"];
        children?: Snippet;
    };

    let {
        ref = $bindable(),
        action,
        label,
        type,
        icon: Icon,
        iconPosition = "left",
        variant = DEFAULT_VARIANT,
        size,
        active,
        round,
        bare,
        disabled,
        shadow,
        title,
        class: className,
        children,
        ...rest
    }: Props = $props();
</script>

<button
    bind:this={ref}
    class={[
        !bare && "cursor-pointer flex items-center justify-center",
        pressClasses,
        !bare &&
            (size
                ? [
                      sizeClasses[size],
                      round
                          ? "rounded-full aspect-square"
                          : [paddingClasses[size], radiusClasses[size]],
                  ]
                : [
                      "gap-1 w-full h-full",
                      round ? "rounded-full" : "rounded-lg px-2",
                  ]),
        active ? activeClasses : variantClasses[variant],
        disabled && disabledClasses,
        shadow && shadowClasses,
        className,
    ]}
    onclick={action}
    {type}
    {title}
    {disabled}
    aria-label={title}
    {...rest}
>
    {#if children}
        {@render children()}
    {:else}
        {#if Icon && iconPosition === "left"}
            <Icon class={iconSizeClasses[size ?? "md"]} />
        {/if}

        {#if label}
            {label}
        {/if}

        {#if Icon && iconPosition === "right"}
            <Icon class={iconSizeClasses[size ?? "md"]} />
        {/if}
    {/if}
</button>
