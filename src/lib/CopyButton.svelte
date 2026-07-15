<script lang="ts">
    import IconCheck from "@tabler/icons-svelte/icons/check";
    import IconCopy from "@tabler/icons-svelte/icons/copy";

    import type { Size, Variant } from "./constants/variants";

    import Button from "./Button.svelte";

    type Props = {
        action: () => Promise<void> | void;
        label?: string;
        title?: string;
        round?: boolean;
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
    };

    let { action, label, title, round, variant, size, disabled }: Props =
        $props();

    let copied = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    const copy = async () => {
        await action();

        copied = true;
        clearTimeout(timer);
        timer = setTimeout(() => (copied = false), 1500);
    };
</script>

<Button
    icon={copied ? IconCheck : IconCopy}
    {label}
    {title}
    {round}
    {variant}
    {size}
    {disabled}
    action={copy}
/>
