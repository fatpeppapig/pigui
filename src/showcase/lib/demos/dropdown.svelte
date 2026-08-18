<script lang="ts">
    import { Button, Dropdown, showToast } from "pigui";

    const dropdownItems = [
        { label: "Rename", onSelect: () => showToast("Renamed") },
        { label: "Duplicate", onSelect: () => showToast("Duplicated") },
        { label: "Archive", disabled: true },
        {
            label: "Delete",
            onSelect: () => showToast("Deleted", { status: "danger" }),
        },
    ];
</script>

<Dropdown items={dropdownItems} label="Actions">
    {#snippet trigger()}
        <Button size="md" label="Actions" />
    {/snippet}
</Dropdown>

<Dropdown items={dropdownItems} label="Actions" placement="top-start">
    {#snippet trigger()}
        <Button size="md" label="Open upward" />
    {/snippet}
</Dropdown>
