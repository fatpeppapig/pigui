<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import RichText from "../lib/RichText.svelte";

    const { Story } = defineMeta({
        title: "Components/RichText",
        component: RichText,
        args: {
            value: "<h2>Heading</h2><p>Body copy with <strong>bold</strong> and <em>italic</em>.</p><ul><li>First</li><li>Second</li></ul>",
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
        value: `<p>Safe paragraph.</p><script>alert(1)<\/script><img src="x" onerror="alert(1)">`,
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
        value: "<blockquote>A quotation.</blockquote><pre><code>npm install pigui</code></pre><hr><ol><li>One</li><li>Two</li></ol>",
    }}
>
    {#snippet template(args)}
        <div class="max-w-xl">
            <RichText {...args} />
        </div>
    {/snippet}
</Story>
