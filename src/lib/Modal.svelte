<script lang="ts">
    import "../styles/Modal.css";

    import type { Snippet } from "svelte";

    import IconX from "@tabler/icons-svelte/icons/x";

    import { config } from "./constants/config.svelte";

    import Button from "./Button.svelte";

    type Props = {
        open: boolean;
        onClose?: () => void;
        closeTitle?: string;
        children: Snippet;
    };

    let { open, onClose, closeTitle = "Close", children }: Props = $props();

    let dialog: HTMLDialogElement;
    let openedAt = 0;

    $effect(() => {
        if (open) {
            dialog.showModal();
            openedAt = Date.now();
        } else {
            dialog.close();
        }
    });

    const backdropClick = (event: MouseEvent) => {
        if (
            event.target === dialog &&
            Date.now() - openedAt > config.dismissDebounceMs
        ) {
            dialog.close();
        }
    };
</script>

<dialog
    bind:this={dialog}
    class="pigui-modal m-auto flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-border bg-surface-raised text-foreground backdrop:bg-scrim"
    onclose={onClose}
    onclick={backdropClick}
>
    <div class="w-8 h-8 absolute right-4 top-4 z-10">
        <Button
            icon={IconX}
            round
            title={closeTitle}
            action={() => dialog.close()}
        />
    </div>

    <div class="pigui-modal-scroll min-h-0 overflow-auto">
        {@render children()}
    </div>
</dialog>
