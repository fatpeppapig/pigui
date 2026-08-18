<script lang="ts">
    import { Button, Tooltip } from "pigui";
</script>

<Tooltip text="More information">
    <Button size="md" label="Hover me" />
</Tooltip>

<Tooltip text="To the right" placement="right" delay={0}>
    <Button size="md" label="Hover me" />
</Tooltip>
