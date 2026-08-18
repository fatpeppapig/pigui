<script lang="ts">
    import { createRawSnippet } from "svelte";
    import { Accordion } from "pigui";

    const paragraph = (text: string) =>
        createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

    const accordionItems = [
        {
            title: "What is PigUI?",
            content: paragraph(
                "A Svelte 5 component library themed entirely by Tailwind CSS semantic tokens.",
            ),
            open: true,
        },
        {
            title: "How is it themed?",
            content: paragraph(
                "Every color comes from a semantic token defined in theme.css.",
            ),
        },
        {
            title: "Does it support dark mode?",
            content: paragraph(
                "Yes — tokens use light-dark(), so the color-scheme property switches the palette.",
            ),
        },
    ];
</script>

<Accordion items={accordionItems} exclusive />
