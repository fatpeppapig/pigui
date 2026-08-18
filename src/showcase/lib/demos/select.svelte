<script lang="ts">
    import { Select } from "pigui";

    let selectValue = $state<string | number>("md");

    const selectOptions = [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
    ];
</script>

<Select options={selectOptions} bind:value={selectValue} />
