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

<script lang="ts">
    const catalogue = [
        "Apple",
        "Apricot",
        "Avocado",
        "Banana",
        "Blackberry",
        "Blueberry",
        "Cherry",
        "Grape",
        "Mango",
        "Orange",
        "Peach",
        "Pear",
        "Plum",
    ];

    const lookup = (query: string) => {
        const needle = query.trim().toLowerCase();

        return catalogue
            .filter((label) => label.toLowerCase().includes(needle))
            .map((label) => ({ value: label.toLowerCase(), label }));
    };

    let results = $state(lookup(""));
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="w-64">
            <SearchSelect {...args} />
        </div>
    {/snippet}
</Story>

<Story name="Server Search">
    {#snippet template(args)}
        <div class="w-64">
            <SearchSelect
                {...args}
                options={results}
                oninput={(query) => (results = lookup(query))}
            />
        </div>
    {/snippet}
</Story>
