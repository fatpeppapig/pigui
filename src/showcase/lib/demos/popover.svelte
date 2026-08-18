<script lang="ts">
    import { Button, Popover } from "pigui";
</script>

<Popover>
    {#snippet trigger()}
        <Button size="md" label="Open popover" />
    {/snippet}

    <div class="flex max-w-60 flex-col gap-1">
        <div class="font-bold">Popover</div>

        <p>Click outside or press Escape to dismiss.</p>
    </div>
</Popover>
