<script lang="ts">
    import { Button, Navbar, Tabbar } from "pigui";

    const tabItems = [
        { value: "home", label: "Home" },
        { value: "reports", label: "Reports" },
        { value: "settings", label: "Settings" },
    ];
</script>

<Navbar>
    {#snippet brand()}
        <span class="text-lg font-bold">PigUI</span>
    {/snippet}

    {#snippet nav()}
        <Tabbar items={tabItems} value="home" />
    {/snippet}

    {#snippet actions()}
        <Button size="md" label="Sign in" />
    {/snippet}
</Navbar>
