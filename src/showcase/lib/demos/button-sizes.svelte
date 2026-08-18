<script lang="ts">
    import { Button, SIZES } from "pigui";
</script>

{#each SIZES as size (size)}
    <Button variant="primary" {size} label={size} />
{/each}
