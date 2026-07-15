<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { createRawSnippet } from "svelte";

    import Accordion from "../lib/Accordion.svelte";

    const content = (text: string) =>
        createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

    const items = [
        {
            title: "What is PigUI?",
            content: content(
                "A Svelte 5 component library themed entirely by Tailwind CSS semantic tokens.",
            ),
            open: true,
        },
        {
            title: "How is it themed?",
            content: content(
                "Every color comes from a semantic token defined in theme.css.",
            ),
        },
        {
            title: "Does it support dark mode?",
            content: content(
                "Yes — tokens use light-dark(), so the color-scheme property switches the palette.",
            ),
        },
    ];

    const { Story } = defineMeta({
        title: "Components/Accordion",
        component: Accordion,
        args: { items },
    });
</script>

<Story name="Default" />

<Story name="Exclusive" args={{ exclusive: true }} />
