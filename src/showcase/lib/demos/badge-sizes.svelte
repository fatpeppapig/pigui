<script lang="ts">
    import { Badge, SIZES } from "pigui";
</script>

{#each SIZES as size (size)}
    <Badge {size} label={size} />
{/each}
