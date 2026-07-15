<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { STATUSES } from "../lib/constants/variants";
    import { showToast } from "../lib/stores/toasts.svelte";
    import Button from "../lib/Button.svelte";
    import ToastContainer from "../lib/ToastContainer.svelte";

    const { Story } = defineMeta({
        title: "Components/ToastContainer",
        component: ToastContainer,
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="flex gap-2">
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
        </div>

        <ToastContainer {...args} />
    {/snippet}
</Story>
