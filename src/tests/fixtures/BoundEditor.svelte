<script lang="ts">
    import { untrack } from "svelte";

    import RichEditor from "../../lib/editor/RichEditor.svelte";

    type Props = {
        value: string;
        report: (value: string) => void;
    };

    let { value, report }: Props = $props();

    let current = $state(untrack(() => value));

    $effect(() => report(current));
</script>

<RichEditor bind:value={current} />
