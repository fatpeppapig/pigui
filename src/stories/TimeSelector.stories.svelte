<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import TimeSelector from "../lib/TimeSelector.svelte";

    const { Story } = defineMeta({
        title: "Components/TimeSelector",
        component: TimeSelector,
        args: { value: "14:30" },
    });
</script>

<Story name="Default" />

<Story name="Hour Steps" args={{ step: 60 }} />
