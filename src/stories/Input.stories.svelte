<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Input from "../lib/Input.svelte";

    const { Story } = defineMeta({
        title: "Components/Input",
        component: Input,
    });
</script>

<Story name="Text" args={{ placeholder: "Type something…" }} />

<Story name="Number" args={{ type: "number", value: 1234.5, decimals: 2 }} />

<Story name="Password" args={{ type: "password", placeholder: "Password" }} />
