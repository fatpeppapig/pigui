<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import Card from "../lib/Card.svelte";

    const { Story } = defineMeta({
        title: "Components/Card",
        component: Card,
    });
</script>

<Story name="Default">
    {#snippet template({ children: _children, ...args })}
        <div class="w-80">
            <Card {...args}>
                <div class="flex flex-col gap-2">
                    <div class="font-bold">Card title</div>

                    <p>
                        Cards wrap arbitrary content in a themed surface with a
                        border and rounded corners.
                    </p>
                </div>
            </Card>
        </div>
    {/snippet}
</Story>
