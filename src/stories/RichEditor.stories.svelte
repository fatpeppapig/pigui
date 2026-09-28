<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { SIZES } from "../lib/constants/variants";
    import RichEditor from "../lib/editor/RichEditor.svelte";

    const { Story } = defineMeta({
        title: "Components/RichEditor",
        component: RichEditor,
        argTypes: {
            size: { control: "select", options: SIZES },
        },
        args: {
            value: "<h3>Notes</h3><p>Write something here.</p>",
        },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="h-80 max-w-2xl">
            <RichEditor {...args} />
        </div>
    {/snippet}
</Story>

<Story
    name="Custom toolbar"
    args={{
        tools: [
            ["bold", "italic", "strike", "code"],
            ["blockquote", "horizontalRule"],
            ["undo", "redo"],
        ],
    }}
>
    {#snippet template(args)}
        <div class="h-80 max-w-2xl">
            <RichEditor {...args} />
        </div>
    {/snippet}
</Story>

<Story name="Read only" args={{ editable: false }}>
    {#snippet template(args)}
        <div class="h-80 max-w-2xl">
            <RichEditor {...args} />
        </div>
    {/snippet}
</Story>
