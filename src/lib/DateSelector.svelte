<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    import { addDays, todayDate } from "./utils/datetime";

    import Button from "./Button.svelte";
    import DatePicker from "./DatePicker.svelte";

    type Props = {
        value?: string;
        format?: string;
        label?: string;
        onChange?: (date: string) => void;
    };

    let {
        value = $bindable(todayDate()),
        format,
        label,
        onChange,
    }: Props = $props();

    const shiftDay = (days: number) => {
        value = addDays(value || todayDate(), days);
        onChange?.(value);
    };
</script>

<div class="flex gap-2">
    <div class="w-10 h-10">
        <Button round action={() => shiftDay(-1)} icon={IconChevronLeft} />
    </div>

    <div class="flex w-40">
        <DatePicker bind:value {format} {label} {onChange} />
    </div>

    <div class="w-10 h-10">
        <Button round action={() => shiftDay(1)} icon={IconChevronRight} />
    </div>
</div>
