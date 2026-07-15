<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import DatePicker from "../lib/DatePicker.svelte";

    const { Story } = defineMeta({
        title: "Components/DatePicker",
        component: DatePicker,
        args: { value: "2026-07-15" },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="w-48">
            <DatePicker {...args} />
        </div>
    {/snippet}
</Story>

<Story name="Custom Format" args={{ format: "DD.MM.YYYY" }}>
    {#snippet template(args)}
        <div class="w-48">
            <DatePicker {...args} />
        </div>
    {/snippet}
</Story>
