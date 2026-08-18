<script lang="ts">
    import IconClock from "@tabler/icons-svelte/icons/clock";
    import { Button } from "pigui";
</script>

<Button variant="secondary" icon={IconClock} label="With icon" />

<Button variant="secondary" icon={IconClock} round title="Clock" />
<Button variant="primary" label="Disabled" disabled />
