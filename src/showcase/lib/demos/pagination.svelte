<script lang="ts">
    import { Pagination } from "pigui";

    let page = $state(3);
</script>

<Pagination pages={10} bind:page />
