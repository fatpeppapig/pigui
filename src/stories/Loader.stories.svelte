<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Loader from "../lib/Loader.svelte";

    const { Story } = defineMeta({
        title: "Components/Loader",
        component: Loader,
    });
</script>

<Story name="Default" />
