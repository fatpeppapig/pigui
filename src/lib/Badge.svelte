<script lang="ts">
    import {
        statusClasses,
        variantClasses,
        type Size,
        type Status,
        type Variant,
    } from "./constants/variants";

    type Props = {
        label: string;
        variant?: Variant | Status;
        size?: Size;
    };

    let { label, variant = "secondary", size = "md" }: Props = $props();

    const sizes: Record<Size, string> = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    };

    const tones = { ...variantClasses, ...statusClasses };
</script>

<span
    class={[
        "inline-flex items-center justify-center rounded-full",
        tones[variant],
        sizes[size],
    ]}
>
    {label}
</span>
