<script lang="ts">
    import type { Size, Status } from "./constants/variants";

    type Props = {
        value: number;
        max?: number;
        size?: Size;
        status?: Status;
        label?: string;
    };

    let { value, max = 100, size = "md", status, label }: Props = $props();

    const heights: Record<Size, string> = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
    };

    const bars: Record<Status, string> = {
        danger: "bg-danger",
        success: "bg-success",
        warning: "bg-warning",
        info: "bg-info",
    };

    const percent = $derived(
        max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0,
    );
</script>

<div
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-label={label}
    class={["w-full overflow-hidden rounded-full bg-muted", heights[size]]}
>
    <div
        class={["h-full rounded-full", status ? bars[status] : "bg-primary"]}
        style:width={`${percent}%`}
    ></div>
</div>
