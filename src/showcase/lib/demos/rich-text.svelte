<script lang="ts">
    import { RichText } from "pigui";

    const article = `
        <h2>Simple Dumplings</h2>
        <p>High protein dumplings.</p>
        <ul>
            <li>Beat the egg.</li>
            <li>Add flour and salt, mix until <em>smooth</em>.</li>
            <li>Add twaróg and knead with a hand.</li>
        </ul>
        <blockquote>Rest the dough for half an hour.</blockquote>
    `;
</script>

<RichText value={article} />
