<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import TimePicker from "../lib/TimePicker.svelte";

    const { Story } = defineMeta({
        title: "Components/TimePicker",
        component: TimePicker,
        args: { value: "14:30" },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="w-28">
            <TimePicker {...args} />
        </div>
    {/snippet}
</Story>

<Story name="Quarter Hours" args={{ minuteStep: 15 }}>
    {#snippet template(args)}
        <div class="w-28">
            <TimePicker {...args} />
        </div>
    {/snippet}
</Story>
