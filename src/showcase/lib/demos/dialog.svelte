<script lang="ts">
    import { Button, Dialog, showToast } from "pigui";

    let dialogOpen = $state(false);
</script>

<Button
    variant="primary"
    size="md"
    label="Delete row"
    action={() => (dialogOpen = true)}
/>

<Dialog
    open={dialogOpen}
    title="Delete row?"
    message="This action cannot be undone."
    confirmLabel="Delete"
    cancelLabel="Keep it"
    onConfirm={() => {
        dialogOpen = false;
        showToast("Row deleted", { status: "danger" });
    }}
    onCancel={() => (dialogOpen = false)}
/>
