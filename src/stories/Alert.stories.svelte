<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { STATUSES } from "../lib/constants/variants";
    import Alert from "../lib/Alert.svelte";

    const { Story } = defineMeta({
        title: "Components/Alert",
        component: Alert,
        argTypes: {
            status: { control: "select", options: STATUSES },
        },
    });
</script>

<Story name="Info" args={{ status: "info", title: "Heads up" }}>
    {#snippet template({ children: _children, ...args })}
        <Alert {...args}>This is an informational message.</Alert>
    {/snippet}
</Story>

<Story name="Success" args={{ status: "success", title: "Saved" }}>
    {#snippet template({ children: _children, ...args })}
        <Alert {...args}>Your changes have been saved.</Alert>
    {/snippet}
</Story>

<Story name="Warning" args={{ status: "warning", title: "Careful" }}>
    {#snippet template({ children: _children, ...args })}
        <Alert {...args}>This action may have side effects.</Alert>
    {/snippet}
</Story>

<Story name="Danger" args={{ status: "danger", title: "Error" }}>
    {#snippet template({ children: _children, ...args })}
        <Alert {...args}>Something went wrong.</Alert>
    {/snippet}
</Story>

<Story name="Dismissible" args={{ status: "info", title: "Notice" }}>
    {#snippet template({ children: _children, ...args })}
        <Alert {...args} onClose={() => {}}>This alert can be dismissed.</Alert>
    {/snippet}
</Story>
