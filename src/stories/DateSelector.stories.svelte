<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import DateSelector from "../lib/DateSelector.svelte";

    const { Story } = defineMeta({
        title: "Components/DateSelector",
        component: DateSelector,
        args: { value: "2026-07-15" },
    });
</script>

<Story name="Default" />
