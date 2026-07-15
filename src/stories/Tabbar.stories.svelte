<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Tabbar from "../lib/Tabbar.svelte";

    const items = [
        { value: "home", label: "Home" },
        { value: "reports", label: "Reports" },
        { value: "settings", label: "Settings" },
    ];

    const { Story } = defineMeta({
        title: "Components/Tabbar",
        component: Tabbar,
        args: { items, value: "home", label: "Sections" },
    });
</script>

<Story name="Default" />

<Story
    name="With Disabled Item"
    args={{
        items: [
            ...items,
            { value: "billing", label: "Billing", disabled: true },
        ],
    }}
/>
