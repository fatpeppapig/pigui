<script lang="ts">
    import { TimeSelector } from "pigui";

    let timeSelValue = $state("14:30");
</script>

<TimeSelector bind:value={timeSelValue} step={30} />
