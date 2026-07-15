<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import SearchSelect from "../lib/SearchSelect.svelte";

    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "grape", label: "Grape" },
        { value: "orange", label: "Orange" },
        { value: "pear", label: "Pear" },
        { value: "plum", label: "Plum" },
    ];

    const { Story } = defineMeta({
        title: "Components/SearchSelect",
        component: SearchSelect,
        args: { options, placeholder: "Search fruit…" },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="w-64">
            <SearchSelect {...args} />
        </div>
    {/snippet}
</Story>
