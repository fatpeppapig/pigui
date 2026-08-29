<script lang="ts">
    type Props = {
        checked?: boolean;
        title?: string;
    };

    let { checked = $bindable(false), title }: Props = $props();
</script>

<input type="checkbox" {title} class="cursor-pointer" bind:checked />
