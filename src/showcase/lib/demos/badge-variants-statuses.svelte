<script lang="ts">
    import { Badge, STATUSES, VARIANTS } from "pigui";
</script>

{#each [...VARIANTS, ...STATUSES] as variant (variant)}
    <Badge {variant} label={variant} />
{/each}
