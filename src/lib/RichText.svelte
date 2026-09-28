<script lang="ts">
    import "../styles/RichText.css";

    import { htmlToText, sanitizeHtml } from "./utils/html";

    type Props = {
        value?: string;
        class?: string;
    };

    let { value = "", class: className }: Props = $props();

    let sanitized: string | null = $state(null);

    $effect(() => {
        sanitized = sanitizeHtml(value);
    });
</script>

<div class={["pigui-prose", className]}>
    {#if sanitized === null}
        {htmlToText(value)}
    {:else}
        {@html sanitized}
    {/if}
</div>
