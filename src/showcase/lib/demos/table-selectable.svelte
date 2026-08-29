<script lang="ts">
    import { Table, type Column } from "pigui";

    type Person = { id: number; name: string; role: string; age: number };

    const columns: Column<Person>[] = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "age", label: "Age", type: "number", width: "6rem" },
    ];

    let rows = $state<Person[]>([
        { id: 1, name: "Ada Lovelace", role: "Engineer", age: 36 },
        { id: 2, name: "Grace Hopper", role: "Admiral", age: 85 },
        { id: 3, name: "Alan Turing", role: "Mathematician", age: 41 },
        { id: 4, name: "Margaret Hamilton", role: "Engineer", age: 88 },
        { id: 5, name: "Katherine Johnson", role: "Mathematician", age: 101 },
        { id: 6, name: "Edsger Dijkstra", role: "Professor", age: 72 },
    ]);

    let selected = $state<number[]>([]);

    const selectedAge = $derived(
        rows
            .filter((person) => selected.includes(person.id))
            .reduce((sum, person) => sum + person.age, 0),
    );
</script>

<Table
    {columns}
    {rows}
    selectable
    bind:selected
    summary={{ name: `Selected: ${selected.length}`, age: selectedAge }}
    onDelete={(row) => (rows = rows.filter((other) => other.id !== row.id))}
/>
