<script lang="ts">
    import IconCalendar from "@tabler/icons-svelte/icons/calendar";
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    import { colorTransition, pressClasses } from "./constants/animations";
    import { config } from "./constants/config.svelte";
    import {
        formatDate,
        formatDateAs,
        parseDateAs,
        todayDate,
    } from "./utils/datetime";

    import Floating from "./Floating.svelte";

    type Props = {
        value?: string;
        format?: string;
        label?: string;
        previousMonthLabel?: string;
        nextMonthLabel?: string;
        onChange?: (date: string) => void;
    };

    let {
        value = $bindable(todayDate()),
        format,
        label = "Date",
        previousMonthLabel = "Previous month",
        nextMonthLabel = "Next month",
        onChange,
    }: Props = $props();

    const dateFormat = $derived(format ?? config.dateFormat);

    let anchor: HTMLElement | undefined = $state();
    let open = $state(false);
    let closedAt = 0;
    let draft: string | null = $state(null);
    let view = $state({ year: 1970, month: 1 });

    const display = $derived(draft ?? formatDateAs(value, dateFormat));

    const close = () => {
        open = false;
        closedAt = Date.now();
    };

    const toggle = () => {
        if (open) {
            close();
        } else if (Date.now() - closedAt > 150) {
            const [year, month] = value.split("-").map(Number);

            view = { year, month };
            open = true;
        }
    };

    const commit = () => {
        if (draft === null) return;

        const parsed = parseDateAs(draft, dateFormat);

        draft = null;

        if (parsed !== null && parsed !== value) {
            value = parsed;
            onChange?.(value);
        }
    };

    const keydown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            commit();
        }
    };

    const dateOf = (day: number) =>
        formatDate(new Date(view.year, view.month - 1, day));

    const pick = (day: number) => {
        value = dateOf(day);
        onChange?.(value);
        close();
    };

    const shiftMonth = (delta: number) => {
        const shifted = new Date(view.year, view.month - 1 + delta, 1);

        view = { year: shifted.getFullYear(), month: shifted.getMonth() + 1 };
    };

    const cells = $derived.by(() => {
        const first = new Date(view.year, view.month - 1, 1);
        const offset = (first.getDay() - config.weekStart + 7) % 7;
        const count = new Date(view.year, view.month, 0).getDate();

        return [
            ...Array.from({ length: offset }, () => null),
            ...Array.from({ length: count }, (_, index) => index + 1),
        ];
    });

    const weekdays = $derived(
        Array.from(
            { length: 7 },
            (_, index) => config.weekdayLabels[(index + config.weekStart) % 7],
        ),
    );
</script>

<div
    bind:this={anchor}
    class="flex w-full h-full items-center gap-1 rounded-lg border border-border bg-surface px-2 py-1"
>
    <input
        class="w-full min-w-0 bg-transparent"
        aria-label={label}
        value={display}
        oninput={(event) => (draft = event.currentTarget.value)}
        onblur={commit}
        onkeydown={keydown}
    />

    <button
        type="button"
        class={["cursor-pointer", pressClasses]}
        aria-label={`${label} calendar`}
        onclick={toggle}
    >
        <IconCalendar class="h-4 w-4" />
    </button>
</div>

<Floating {anchor} {open} placement="bottom-start" onClose={close}>
    <div
        class="flex w-64 flex-col gap-2 rounded-lg border border-border bg-surface-raised p-2 shadow-md"
    >
        <div class="flex items-center justify-between">
            <button
                type="button"
                class={["cursor-pointer p-1", pressClasses]}
                aria-label={previousMonthLabel}
                onclick={() => shiftMonth(-1)}
            >
                <IconChevronLeft class="h-4 w-4" />
            </button>

            <div class="font-bold">
                {config.monthLabels[view.month - 1]}
                {view.year}
            </div>

            <button
                type="button"
                class={["cursor-pointer p-1", pressClasses]}
                aria-label={nextMonthLabel}
                onclick={() => shiftMonth(1)}
            >
                <IconChevronRight class="h-4 w-4" />
            </button>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center text-sm">
            {#each weekdays as weekday (weekday)}
                <div class="text-muted-foreground">{weekday}</div>
            {/each}

            {#each cells as day, index (index)}
                {#if day === null}
                    <div></div>
                {:else}
                    <button
                        type="button"
                        class={[
                            "h-8 cursor-pointer rounded-md border",
                            pressClasses,
                            colorTransition,
                            value === dateOf(day)
                                ? "border-accent bg-accent-soft"
                                : [
                                      "hover:bg-muted",
                                      todayDate() === dateOf(day)
                                          ? "border-border"
                                          : "border-transparent",
                                  ],
                        ]}
                        onclick={() => pick(day)}
                    >
                        {day}
                    </button>
                {/if}
            {/each}
        </div>
    </div>
</Floating>
