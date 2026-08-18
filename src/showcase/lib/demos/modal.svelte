<script lang="ts">
    import { Button, Modal } from "pigui";

    let modalOpen = $state(false);
</script>

<Button
    variant="primary"
    size="md"
    label="Open modal"
    action={() => (modalOpen = true)}
/>
<Modal open={modalOpen} onClose={() => (modalOpen = false)}>
    <div class="flex w-96 max-w-full flex-col gap-2 p-6">
        <div class="font-bold">Modal title</div>

        <p>
            Any content can go here. The close button in the corner and the
            backdrop click are built in.
        </p>
    </div>
</Modal>
