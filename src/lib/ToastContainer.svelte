<script lang="ts">
    import { dismissToast, toasts } from "./stores/toasts.svelte";

    import Alert from "./Alert.svelte";

    type Props = {
        closeTitle?: string;
    };

    let { closeTitle }: Props = $props();

    let el: HTMLDivElement | undefined = $state();

    $effect(() => {
        if (!el || !toasts.length) return;

        if (el.matches?.(":popover-open")) {
            el.hidePopover?.();
        }

        el.showPopover?.();
    });
</script>

<div
    bind:this={el}
    popover="manual"
    class="fixed inset-auto right-4 bottom-4 m-0 flex w-80 flex-col gap-2 overflow-visible bg-transparent p-0"
>
    {#each toasts as item (item.id)}
        <div class="rounded-lg bg-surface-raised shadow-md">
            <Alert
                status={item.status}
                title={item.title}
                {closeTitle}
                onClose={() => dismissToast(item.id)}
            >
                {item.message}
            </Alert>
        </div>
    {/each}
</div>
