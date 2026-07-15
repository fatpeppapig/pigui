<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Pagination from "../lib/Pagination.svelte";

    const { Story } = defineMeta({
        title: "Components/Pagination",
        component: Pagination,
        args: { pages: 10, page: 3 },
    });
</script>

<Story name="Default" />

<Story
    name="Custom Label"
    args={{ label: (current, pages) => `${current} of ${pages}` }}
/>
