<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    import { addMinutes, nowTime } from "./utils/datetime";

    import Button from "./Button.svelte";
    import TimePicker from "./TimePicker.svelte";

    type Props = {
        value?: string;
        format?: string;
        label?: string;
        step?: number;
        onChange?: (time: string) => void;
    };

    let {
        value = $bindable(nowTime()),
        format,
        label,
        step = 15,
        onChange,
    }: Props = $props();

    const shift = (minutes: number) => {
        value = addMinutes(value || nowTime(), minutes);
        onChange?.(value);
    };
</script>

<div class="flex gap-2">
    <div class="w-10 h-10">
        <Button round action={() => shift(-step)} icon={IconChevronLeft} />
    </div>

    <div class="flex w-28">
        <TimePicker bind:value {format} {label} minuteStep={step} {onChange} />
    </div>

    <div class="w-10 h-10">
        <Button round action={() => shift(step)} icon={IconChevronRight} />
    </div>
</div>
