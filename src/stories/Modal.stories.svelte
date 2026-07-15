<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Modal from "../lib/Modal.svelte";

    const { Story } = defineMeta({
        title: "Components/Modal",
        component: Modal,
        args: { open: true, onClose: () => {} },
    });
</script>

<Story name="Default">
    {#snippet template({ children: _children, ...args })}
        <Modal {...args}>
            <div class="flex w-96 flex-col gap-2 p-6">
                <div class="font-bold">Modal title</div>

                <p>
                    Any content can go here. The close button in the corner and
                    the backdrop click are built in.
                </p>
            </div>
        </Modal>
    {/snippet}
</Story>
