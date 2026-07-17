<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        id,
        title,
        description,
        source,
        children,
    }: {
        id: string;
        title: string;
        description?: string;
        source?: string;
        children: Snippet;
    } = $props();
</script>

<section {id} class="scroll-mt-24">
    <div class="mb-4 flex flex-col gap-1">
        <div class="flex items-baseline gap-3">
            <h2 class="text-2xl font-bold tracking-tight text-foreground">
                {title}
            </h2>
            {#if source}
                <code class="text-xs text-muted-foreground">{source}</code>
            {/if}
        </div>

        {#if description}
            <p class="max-w-2xl text-sm text-muted-foreground">{description}</p>
        {/if}
    </div>

    <div class="flex flex-col gap-4">
        {@render children()}
    </div>
</section>
