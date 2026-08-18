<script lang="ts">
    import { Alert } from "pigui";
</script>

<Alert status="info" title="Heads up">This is an informational message.</Alert>

<Alert status="success" title="Saved">Your changes have been saved.</Alert>

<Alert status="warning" title="Careful">
    This action may have side effects.
</Alert>

<Alert status="danger" title="Error" onClose={() => {}}>
    Something went wrong — this alert can be dismissed.
</Alert>
