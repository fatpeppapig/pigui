<script lang="ts">
    import { Button, STATUSES, showToast } from "pigui";
</script>

{#each STATUSES as status (status)}
    <Button
        size="md"
        label={status}
        action={() =>
            showToast(`This is a ${status} toast.`, {
                status,
                title: status,
            })}
    />
{/each}
