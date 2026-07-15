<script lang="ts">
    type Props = {
        label?: string;
    };

    let { label = "Loading" }: Props = $props();
</script>

<div
    class="flex items-center justify-center w-full py-12"
    role="status"
    aria-label={label}
>
    <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary"
    ></div>
</div>
