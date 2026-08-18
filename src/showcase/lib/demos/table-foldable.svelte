<script lang="ts">
    import { Table, type Column } from "pigui";

    type Person = { id: number; name: string; role: string; age: number };

    const foldableColumns: Column<Person>[] = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role", foldable: true },
        {
            key: "age",
            label: "Age",
            type: "number",
            width: "6rem",
            foldable: true,
        },
    ];

    let tableFolded = $state(false);

    let rows = $state<Person[]>([
        { id: 1, name: "Ada Lovelace", role: "Engineer", age: 36 },
        { id: 2, name: "Grace Hopper", role: "Admiral", age: 85 },
        { id: 3, name: "Alan Turing", role: "Mathematician", age: 41 },
        { id: 4, name: "Margaret Hamilton", role: "Engineer", age: 88 },
        { id: 5, name: "Katherine Johnson", role: "Mathematician", age: 101 },
        { id: 6, name: "Edsger Dijkstra", role: "Professor", age: 72 },
    ]);
</script>

<Table columns={foldableColumns} {rows} bind:folded={tableFolded} />
