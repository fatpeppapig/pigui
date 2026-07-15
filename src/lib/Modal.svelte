<script lang="ts">
    import type { Snippet } from "svelte";

    import IconX from "@tabler/icons-svelte/icons/x";

    import Button from "./Button.svelte";

    type Props = {
        open: boolean;
        onClose?: () => void;
        closeTitle?: string;
        children: Snippet;
    };

    let { open, onClose, closeTitle = "Close", children }: Props = $props();

    let dialog: HTMLDialogElement;

    $effect(() => {
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });

    const backdropClick = (event: MouseEvent) => {
        if (event.target === dialog) {
            dialog.close();
        }
    };
</script>

<dialog
    bind:this={dialog}
    class="relative m-auto overflow-visible rounded-lg border border-border bg-surface-raised text-foreground backdrop:bg-scrim"
    onclose={onClose}
    onclick={backdropClick}
>
    <div class="w-8 h-8 absolute right-4 top-4">
        <Button
            icon={IconX}
            round
            title={closeTitle}
            action={() => dialog.close()}
        />
    </div>

    {@render children()}
</dialog>
