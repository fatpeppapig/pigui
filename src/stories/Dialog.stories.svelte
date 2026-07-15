<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Dialog from "../lib/Dialog.svelte";

    const { Story } = defineMeta({
        title: "Components/Dialog",
        component: Dialog,
        args: {
            open: true,
            title: "Delete row?",
            message: "This action cannot be undone.",
            onConfirm: () => {},
            onCancel: () => {},
        },
    });
</script>

<Story name="Default" />

<Story
    name="Custom Labels"
    args={{ confirmLabel: "Delete", cancelLabel: "Keep it" }}
/>
