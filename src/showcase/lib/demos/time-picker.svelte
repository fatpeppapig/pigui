<script lang="ts">
    import { TimePicker } from "pigui";

    let timeValue = $state("14:30");
</script>

<TimePicker bind:value={timeValue} minuteStep={15} />
