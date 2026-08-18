<script lang="ts">
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";

    import IconCode from "@tabler/icons-svelte/icons/code";

    import { Button, CopyButton } from "pigui";

    import { highlight } from "./code";

    let {
        label,
        inner = "flex flex-wrap items-center gap-4",
        code,
        children,
    }: {
        label?: string;
        inner?: string;
        code?: string;
        children: Snippet;
    } = $props();

    let open = $state(false);
    let html = $state("");

    const sample = $derived(code?.trim() ?? "");

    const toggle = async () => {
        open = !open;

        if (open && !html) {
            html = await highlight(sample);
        }
    };
</script>

<div class="overflow-hidden rounded-xl border border-border bg-surface">
    {#if label || code}
        <div
            class="flex items-center justify-between gap-4 border-b border-border py-1 pl-4 pr-2"
        >
            <span class="text-xs font-medium text-muted-foreground">
                {label ?? ""}
            </span>

            {#if code}
                <Button
                    variant="tertiary"
                    size="sm"
                    icon={IconCode}
                    label={open ? "Hide code" : "Code"}
                    active={open}
                    action={toggle}
                />
            {/if}
        </div>
    {/if}

    <div class="p-6 {inner}">
        {@render children()}
    </div>

    {#if code && open}
        <div
            class="relative border-t border-border bg-background"
            transition:slide={{ duration: 150 }}
        >
            <div class="absolute right-2 top-2 z-10">
                <CopyButton
                    round
                    size="sm"
                    variant="tertiary"
                    title="Copy code"
                    action={() => navigator.clipboard.writeText(sample)}
                />
            </div>

            {#if html}
                {@html html}
            {:else}
                <pre class="shiki">{sample}</pre>
            {/if}
        </div>
    {/if}
</div>
