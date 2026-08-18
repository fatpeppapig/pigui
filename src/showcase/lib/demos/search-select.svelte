<script lang="ts">
    import { SearchSelect } from "pigui";

    let fruit = $state<string | null>(null);

    const fruitOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "grape", label: "Grape" },
        { value: "orange", label: "Orange" },
        { value: "pear", label: "Pear" },
        { value: "plum", label: "Plum" },
    ];
</script>

<SearchSelect
    options={fruitOptions}
    placeholder="Search fruit…"
    bind:value={fruit}
/>
