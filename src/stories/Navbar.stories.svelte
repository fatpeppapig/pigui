<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Button from "../lib/Button.svelte";
    import Navbar from "../lib/Navbar.svelte";
    import Tabbar from "../lib/Tabbar.svelte";

    const { Story } = defineMeta({
        title: "Components/Navbar",
        component: Navbar,
        parameters: { layout: "fullscreen" },
    });
</script>

<Story name="Default">
    {#snippet template({
        brand: _brand,
        nav: _nav,
        actions: _actions,
        ...args
    })}
        <Navbar {...args}>
            {#snippet brand()}
                <span class="text-lg font-bold">🐷 PigUI</span>
            {/snippet}

            {#snippet nav()}
                <Tabbar
                    items={[
                        { value: "home", label: "Home" },
                        { value: "reports", label: "Reports" },
                        { value: "settings", label: "Settings" },
                    ]}
                    value="home"
                />
            {/snippet}

            {#snippet actions()}
                <Button size="md" label="Sign in" />
            {/snippet}
        </Navbar>
    {/snippet}
</Story>
