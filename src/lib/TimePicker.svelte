<script lang="ts">
    import IconClock from "@tabler/icons-svelte/icons/clock";

    import { colorTransition } from "./constants/animations";
    import { config } from "./constants/config.svelte";

    import { formatTimeAs, nowTime, pad, parseTimeAs } from "./utils/datetime";

    import Button from "./Button.svelte";
    import Floating from "./Floating.svelte";
    import Input from "./Input.svelte";

    type Props = {
        value?: string;
        format?: string;
        label?: string;
        minuteStep?: number;
        onChange?: (time: string) => void;
    };

    let {
        value = $bindable(nowTime()),
        format,
        label = "Time",
        minuteStep = 5,
        onChange,
    }: Props = $props();

    const timeFormat = $derived(format ?? config.timeFormat);

    let anchor: HTMLElement | undefined = $state();
    let hourList: HTMLUListElement | undefined = $state();
    let minuteList: HTMLUListElement | undefined = $state();
    let open = $state(false);
    let closedAt = 0;
    let draft: string | null = $state(null);

    const display = $derived(draft ?? formatTimeAs(value, timeFormat));

    const hours = Array.from({ length: 24 }, (_, index) => index);
    const minutes = $derived(
        Array.from(
            { length: Math.ceil(60 / minuteStep) },
            (_, index) => index * minuteStep,
        ),
    );

    const parts = $derived(value.split(":").map(Number));

    const close = () => {
        open = false;
        closedAt = Date.now();
    };

    const toggle = () => {
        if (open) {
            close();
        } else if (Date.now() - closedAt > config.dismissDebounceMs) {
            open = true;
        }
    };

    const commit = () => {
        if (draft === null) return;

        const parsed = parseTimeAs(draft, timeFormat);

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

    const pickHour = (hour: number) => {
        value = `${pad(hour)}:${pad(parts[1] ?? 0)}`;
        onChange?.(value);
    };

    const pickMinute = (minute: number) => {
        value = `${pad(parts[0] ?? 0)}:${pad(minute)}`;
        onChange?.(value);
        close();
    };

    $effect(() => {
        if (!open) return;

        requestAnimationFrame(() => {
            hourList
                ?.querySelector('[data-selected="true"]')
                ?.scrollIntoView({ block: "center" });
            minuteList
                ?.querySelector('[data-selected="true"]')
                ?.scrollIntoView({ block: "center" });
        });
    });
</script>

<div
    bind:this={anchor}
    class="flex w-full h-full min-w-28 items-center gap-1 rounded-lg border border-border bg-surface px-2 py-1"
>
    <Input
        bare
        class="w-full min-w-0 bg-transparent"
        aria-label={label}
        bind:value={() => display, (text) => (draft = text)}
        onblur={commit}
        onkeydown={keydown}
    />

    <Button
        bare
        variant="none"
        type="button"
        class="cursor-pointer"
        icon={IconClock}
        title={`${label} picker`}
        action={toggle}
    />
</div>

<Floating {anchor} {open} placement="bottom-start" onClose={close}>
    <div
        class="flex h-56 gap-1 rounded-lg border border-border bg-surface-raised p-1 shadow-md"
    >
        <ul bind:this={hourList} class="flex flex-col gap-0.5 overflow-y-auto">
            {#each hours as hour (hour)}
                <li>
                    <Button
                        bare
                        variant="none"
                        type="button"
                        data-selected={parts[0] === hour}
                        label={pad(hour)}
                        class={[
                            "w-12 cursor-pointer rounded-md border px-2 py-1 text-center",
                            colorTransition,
                            parts[0] === hour
                                ? "border-accent bg-accent-soft"
                                : "border-transparent hover:bg-muted",
                        ]}
                        action={() => pickHour(hour)}
                    />
                </li>
            {/each}
        </ul>

        <ul
            bind:this={minuteList}
            class="flex flex-col gap-0.5 overflow-y-auto"
        >
            {#each minutes as minute (minute)}
                <li>
                    <Button
                        bare
                        variant="none"
                        type="button"
                        data-selected={parts[1] === minute}
                        label={pad(minute)}
                        class={[
                            "w-12 cursor-pointer rounded-md border px-2 py-1 text-center",
                            colorTransition,
                            parts[1] === minute
                                ? "border-accent bg-accent-soft"
                                : "border-transparent hover:bg-muted",
                        ]}
                        action={() => pickMinute(minute)}
                    />
                </li>
            {/each}
        </ul>
    </div>
</Floating>
