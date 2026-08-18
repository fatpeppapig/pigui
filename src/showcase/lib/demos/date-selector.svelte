<script lang="ts">
    import { DateSelector } from "pigui";

    let dateSelValue = $state("2026-07-15");
</script>

<DateSelector bind:value={dateSelValue} />
