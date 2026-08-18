<script lang="ts">
    import { DatePicker } from "pigui";

    let dateValue = $state("2026-07-15");
</script>

<DatePicker bind:value={dateValue} />
