<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    import Button from "./Button.svelte";

    type Props = {
        page?: number;
        pages: number;
        label?: (current: number, pages: number) => string;
        previousLabel?: string;
        nextLabel?: string;
        onChange?: (page: number) => void;
    };

    let {
        page = $bindable(1),
        pages,
        label = (current, total) => `Page: ${current} / ${total}`,
        previousLabel = "Previous page",
        nextLabel = "Next page",
        onChange,
    }: Props = $props();

    const current = $derived(Math.max(1, Math.min(page, pages)));

    const go = (target: number) => {
        const clamped = Math.max(1, Math.min(pages, target));

        if (clamped === current) return;

        page = clamped;
        onChange?.(page);
    };
</script>

<div class="flex items-center gap-4">
    <div class="w-10 h-10">
        <Button
            round
            title={previousLabel}
            action={() => go(current - 1)}
            icon={IconChevronLeft}
        />
    </div>

    <div class="flex text-nowrap justify-center">
        {label(current, pages)}
    </div>

    <div class="w-10 h-10">
        <Button
            round
            title={nextLabel}
            action={() => go(current + 1)}
            icon={IconChevronRight}
        />
    </div>
</div>
