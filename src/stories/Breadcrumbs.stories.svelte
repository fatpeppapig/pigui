<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Breadcrumbs from "../lib/Breadcrumbs.svelte";

    const items = [
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Breadcrumbs" },
    ];

    const { Story } = defineMeta({
        title: "Components/Breadcrumbs",
        component: Breadcrumbs,
        args: { items },
    });
</script>

<Story name="Default" />

<Story name="Custom Separator" args={{ separator: "›" }} />
