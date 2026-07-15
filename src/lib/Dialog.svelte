<script lang="ts">
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";

    type Props = {
        open: boolean;
        title: string;
        message: string;
        confirmLabel?: string;
        cancelLabel?: string;
        closeTitle?: string;
        onConfirm: () => void;
        onCancel: () => void;
    };

    let {
        open,
        title,
        message,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        closeTitle,
        onConfirm,
        onCancel,
    }: Props = $props();
</script>

<Modal {open} onClose={onCancel} {closeTitle}>
    <div class="flex w-80 flex-col gap-4 p-4">
        <div class="font-bold">{title}</div>

        <div>{message}</div>

        <div class="flex justify-end gap-2 h-10">
            <Button action={onCancel} label={cancelLabel} />

            <Button action={onConfirm} label={confirmLabel} active />
        </div>
    </div>
</Modal>
