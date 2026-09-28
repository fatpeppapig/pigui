<script lang="ts">
    import "../styles/RichText.css";

    import { markdownToHtml } from "./utils/markdown";

    type Props = {
        value?: string;
        class?: string;
    };

    let { value = "", class: className }: Props = $props();

    let html: string | null = $state(null);

    $effect(() => {
        html = markdownToHtml(value);
    });
</script>

<div class={["pigui-prose", className]}>
    {#if html === null}
        {value}
    {:else}
        {@html html}
    {/if}
</div>
