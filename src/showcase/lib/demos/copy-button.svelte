<script lang="ts">
    import { CopyButton } from "pigui";
</script>

<CopyButton
    label="Copy"
    action={() => navigator.clipboard.writeText("pigui")}
/>

<CopyButton
    round
    title="Copy to clipboard"
    action={() => navigator.clipboard.writeText("pigui")}
/>
