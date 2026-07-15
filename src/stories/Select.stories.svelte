<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Select from "../lib/Select.svelte";

    const options = [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
    ];

    const { Story } = defineMeta({
        title: "Components/Select",
        component: Select,
        args: { options, value: "md" },
    });
</script>

<Story name="Default" />

<Story
    name="Value Only Options"
    args={{ options: [5, 10, 25, 50].map((value) => ({ value })), value: 25 }}
/>
