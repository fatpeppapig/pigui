<script lang="ts">
    import { Button, VARIANTS } from "pigui";
</script>

{#each VARIANTS as variant (variant)}
    <Button {variant} label={variant} />
{/each}
