<script lang="ts">
    import { Progress, STATUSES } from "pigui";
</script>

<Progress value={40} label="Progress" />

{#each STATUSES as status (status)}
    <Progress value={40} {status} />
{/each}
