<script lang="ts">
    import IconX from "@tabler/icons-svelte/icons/x";

    import type { Snippet } from "svelte";

    import type { Status } from "./constants/variants";
    import Button from "./Button.svelte";

    type Props = {
        status?: Status;
        title?: string;
        closeTitle?: string;
        onClose?: () => void;
        children: Snippet;
    };

    let {
        status = "info",
        title,
        closeTitle = "Close",
        onClose,
        children,
    }: Props = $props();

    const styles: Record<Status, { box: string; text: string }> = {
        danger: { box: "border-danger bg-danger/10", text: "text-danger" },
        success: { box: "border-success bg-success/10", text: "text-success" },
        warning: { box: "border-warning bg-warning/10", text: "text-warning" },
        info: { box: "border-info bg-info/10", text: "text-info" },
    };
</script>

<div
    role="alert"
    class={[
        "w-full rounded-lg border p-3 flex items-start gap-2",
        styles[status].box,
    ]}
>
    <div class="flex flex-col gap-1 grow">
        {#if title}
            <div class={["font-bold", styles[status].text]}>{title}</div>
        {/if}

        <div>{@render children()}</div>
    </div>

    {#if onClose}
        <div class="h-6 w-6">
            <Button round icon={IconX} title={closeTitle} action={onClose} />
        </div>
    {/if}
</div>
