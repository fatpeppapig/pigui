<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";

    import { Table, type Column } from "../lib/Table";

    type Person = { id: number; name: string; role: string; age: number };

    const columns: Column<Person>[] = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "age", label: "Age", type: "number", width: "6rem" },
    ];

    const people: Person[] = [
        { id: 1, name: "Ada Lovelace", role: "Engineer", age: 36 },
        { id: 2, name: "Grace Hopper", role: "Admiral", age: 85 },
        { id: 3, name: "Alan Turing", role: "Mathematician", age: 41 },
        { id: 4, name: "Margaret Hamilton", role: "Engineer", age: 88 },
        { id: 5, name: "Katherine Johnson", role: "Mathematician", age: 101 },
        { id: 6, name: "Edsger Dijkstra", role: "Professor", age: 72 },
    ];

    const totalAge = people.reduce((sum, person) => sum + person.age, 0);

    const { Story } = defineMeta({
        title: "Components/Table",
        component: Table,
    });
</script>

<script lang="ts">
    let rows = $state(people.map((person) => ({ ...person })));
</script>

<Story name="Read Only">
    {#snippet template()}
        <Table {columns} rows={people} />
    {/snippet}
</Story>

<Story name="With Summary">
    {#snippet template()}
        <Table
            {columns}
            rows={people}
            summary={{ name: "Total", age: totalAge }}
        />
    {/snippet}
</Story>

<Story name="Editable">
    {#snippet template()}
        <Table
            {columns}
            {rows}
            onEdit={(row, key, value) => Object.assign(row, { [key]: value })}
            onDelete={(row) =>
                (rows = rows.filter((other) => other.id !== row.id))}
        />
    {/snippet}
</Story>
