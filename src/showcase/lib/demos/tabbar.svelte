<script lang="ts">
    import { Tabbar } from "pigui";

    let tab = $state<string | number>("home");

    const tabItems = [
        { value: "home", label: "Home" },
        { value: "reports", label: "Reports" },
        { value: "settings", label: "Settings" },
    ];
</script>

<Tabbar items={tabItems} bind:value={tab} label="Sections" />
