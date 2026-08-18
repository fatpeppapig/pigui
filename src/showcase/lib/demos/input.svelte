<script lang="ts">
    import { Input } from "pigui";

    let inputText = $state("");

    let inputNumber = $state<string | number>(1234.5);

    let inputPassword = $state("");
</script>

<Input placeholder="Type something…" bind:value={inputText} />

<Input type="number" decimals={2} bind:value={inputNumber} />

<Input type="password" placeholder="Password" bind:value={inputPassword} />
