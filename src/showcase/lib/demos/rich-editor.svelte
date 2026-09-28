<script lang="ts">
    import { RichEditor } from "pigui/editor";

    let value = $state(`## Shopping list

- Flour
- **Twaróg**
- Eggs`);
</script>

<RichEditor bind:value class="min-h-56" />
