<script lang="ts">
    import { RichText } from "pigui";

    const recipe = `## Simple Dumplings

High protein dumplings.

1. Beat the egg.
2. Add flour and salt, mix until *smooth*.
3. Add twaróg and knead with a hand.

> Rest the dough for half an hour.

Boil in salted water until they float — about \`3 minutes\`.`;
</script>

<RichText value={recipe} />
