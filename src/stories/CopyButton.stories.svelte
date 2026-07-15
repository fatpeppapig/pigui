<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { SIZES, VARIANTS } from "../lib/constants/variants";
    import CopyButton from "../lib/CopyButton.svelte";

    const { Story } = defineMeta({
        title: "Components/CopyButton",
        component: CopyButton,
        argTypes: {
            variant: { control: "select", options: VARIANTS },
            size: { control: "select", options: SIZES },
        },
        args: {
            action: () => navigator.clipboard.writeText("pigui"),
            label: "Copy",
            size: "md",
        },
    });
</script>

<Story name="Default" />

<Story
    name="Round"
    args={{ round: true, label: undefined, title: "Copy to clipboard" }}
/>
