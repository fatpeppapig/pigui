<script lang="ts">
    import { RichEditor } from "pigui/editor";

    let value = $state(
        "<h3>Shopping list</h3><ul><li>Flour</li><li>Twaróg</li></ul>",
    );
</script>

<RichEditor bind:value class="min-h-56" />
