<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import RichText from "../lib/RichText.svelte";

    const { Story } = defineMeta({
        title: "Components/RichText",
        component: RichText,
        args: {
            value: "## Heading\n\nBody copy with **bold** and *italic*.\n\n- First\n- Second",
        },
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <div class="max-w-xl">
            <RichText {...args} />
        </div>
    {/snippet}
</Story>

<Story
    name="Sanitized"
    args={{
        value: `Safe paragraph.\n\n<script>alert(1)<\/script>\n\n<img src="x" onerror="alert(1)">`,
    }}
>
    {#snippet template(args)}
        <div class="max-w-xl">
            <RichText {...args} />
        </div>
    {/snippet}
</Story>

<Story
    name="Blocks"
    args={{
        value: "> A quotation.\n\n```\nnpm install pigui\n```\n\n---\n\n1. One\n2. Two",
    }}
>
    {#snippet template(args)}
        <div class="max-w-xl">
            <RichText {...args} />
        </div>
    {/snippet}
</Story>
