<script lang="ts" generics="T extends { id: number | string }">
    import IconCaretDown from "@tabler/icons-svelte/icons/caret-down";
    import IconCaretUp from "@tabler/icons-svelte/icons/caret-up";
    import IconFilter from "@tabler/icons-svelte/icons/filter";
    import IconLayoutColumns from "@tabler/icons-svelte/icons/layout-columns";
    import IconTrash from "@tabler/icons-svelte/icons/trash";

    import Button from "../Button.svelte";
    import Dialog from "../Dialog.svelte";
    import Input from "../Input.svelte";
    import Pagination from "../Pagination.svelte";
    import Select from "../Select.svelte";

    import type { Column, TableLabels } from "./types";

    type Props = {
        columns: Column<T>[];
        rows: T[];
        summary?: Partial<Record<keyof T & string, string | number>>;
        labels?: Partial<TableLabels>;
        folded?: boolean;
        onEdit?: (
            row: T,
            key: keyof T & string,
            value: string | number,
        ) => void;
        onDelete?: (row: T) => void;
        onRowClick?: (row: T) => void;
    };

    let {
        columns,
        rows,
        summary,
        labels,
        folded = $bindable(false),
        onEdit,
        onDelete,
        onRowClick,
    }: Props = $props();

    const defaultLabels: TableLabels = {
        filter: "Filter",
        toggleFilters: "toggle filters",
        toggleFoldedColumns: "toggle folded columns",
        delete: "delete",
        deleteConfirm: "Delete",
        deleteTitle: "Delete Row?",
        deleteMessage: "Do you really want to remove this row?",
        noRows: "no rows",
        perPage: "Per Page",
        previousPage: "previous page",
        nextPage: "next page",
        cancel: "Cancel",
        close: "Close",
        page: (current, pages) => `Page: ${current} / ${pages}`,
        rows: (count) => (count === 1 ? `${count} row` : `${count} rows`),
    };

    const effectiveLabels = $derived({ ...defaultLabels, ...labels });

    const PAGE_SIZE_KEY = "table-page-size";
    const PAGE_SIZES = [5, 10, 25, 50, 100].map((size) => ({ value: size }));
    const DEFAULT_PAGE_SIZE = 25;

    const storedPageSize = (): number | null => {
        try {
            return JSON.parse(localStorage.getItem(PAGE_SIZE_KEY) ?? "null");
        } catch {
            return null;
        }
    };

    let pageSize = $state(storedPageSize() ?? DEFAULT_PAGE_SIZE);

    $effect(() => {
        localStorage.setItem(PAGE_SIZE_KEY, JSON.stringify(pageSize));
    });

    let sortKey: string | null = $state(null);
    let sortDir: 1 | -1 = $state(1);
    let filters: Record<string, string> = $state({});
    let filtersVisible = $state(false);
    let page = $state(1);
    let editing: { id: number | string; key: string } | null = $state(null);
    let draft: string | number = $state("");
    let deleting: T | null = $state(null);

    const hasFoldableColumns = $derived(columns.some((c) => c.foldable));
    const visibleColumns = $derived(
        columns.filter((c) => !c.foldable || !folded),
    );

    const compare = (a: unknown, b: unknown) =>
        typeof a === "number" && typeof b === "number"
            ? a - b
            : String(a).localeCompare(String(b));

    const filtered = $derived(
        rows.filter((row) =>
            Object.entries(filters).every(([key, filter]) => {
                const needle = filter.trim().toLowerCase();

                if (!needle) return true;

                return String(row[key as keyof T] ?? "")
                    .toLowerCase()
                    .includes(needle);
            }),
        ),
    );

    const sorted = $derived.by(() => {
        const key = sortKey as (keyof T & string) | null;

        if (key === null) return filtered;

        return [...filtered].sort((a, b) => compare(a[key], b[key]) * sortDir);
    });

    const pages = $derived(Math.max(1, Math.ceil(sorted.length / pageSize)));
    const current = $derived(Math.min(page, pages));
    const paged = $derived(
        sorted.slice((current - 1) * pageSize, current * pageSize),
    );

    const sortBy = (key: string) => {
        if (sortKey !== key) {
            sortKey = key;
            sortDir = 1;
        } else if (sortDir === 1) {
            sortDir = -1;
        } else {
            sortKey = null;
            sortDir = 1;
        }
    };

    const editable = (column: Column<T>) =>
        onEdit !== undefined && column.editable !== false;

    const alignClass = (column: Column<T>) =>
        column.type === "number" ? "text-right" : "text-left";

    const display = (row: T, column: Column<T>) => {
        const value = row[column.key];

        return column.type === "number" && typeof value === "number"
            ? value.toFixed(2)
            : value;
    };

    const displaySummary = (column: Column<T>) => {
        const value = summary?.[column.key];

        return typeof value === "number" ? value.toFixed(2) : (value ?? "");
    };

    const startEdit = (row: T, column: Column<T>) => {
        editing = { id: row.id, key: column.key };
        draft = String(row[column.key] ?? "");
    };

    const commit = (row: T, column: Column<T>) => {
        if (!editing) return;

        const value = column.type === "number" ? Number(draft) : draft;

        editing = null;

        if (typeof value === "number" && Number.isNaN(value)) return;
        if (value === row[column.key]) return;

        onEdit?.(row, column.key, value);
    };

    const confirmDelete = () => {
        if (deleting) onDelete?.(deleting);

        deleting = null;
    };

    const keydown = (event: KeyboardEvent, row: T, column: Column<T>) => {
        if (event.key === "Enter") {
            commit(row, column);
        }

        if (event.key === "Escape") {
            event.preventDefault();
            editing = null;
        }
    };

    const cellClass =
        "border-b border-r last:border-r-0 border-border h-12 truncate";

    const bodyClass = [cellClass, "bg-surface"];
    const headClass = [cellClass, "bg-secondary"];
    const summaryClass = [
        "border-t border-r last:border-r-0 border-border h-12 truncate",
    ];

    const rowClass = (index: number) =>
        index % 2 ? "bg-secondary" : "bg-surface-alt";
</script>

<div class="flex flex-col h-full justify-between">
    <div class="flex overflow-x-auto rounded-xl border border-border">
        <table
            class="w-full table-fixed border-collapse [&>tbody>tr:last-child>td]:border-b-0"
            style:min-width={`${visibleColumns.length * 6 + 2}rem`}
        >
            <thead>
                <tr>
                    {#each visibleColumns as column (column.key)}
                        <th
                            class={[
                                headClass,
                                "p-0",
                                column.type === "number"
                                    ? "text-right"
                                    : "text-left",
                            ]}
                            style:width={column.width}
                        >
                            <Button
                                bare
                                variant="none"
                                class={[
                                    "w-full px-2 py-1 font-bold cursor-pointer flex items-center justify-between gap-1",
                                    alignClass(column),
                                    column.type === "number" &&
                                        "flex-row-reverse",
                                ]}
                                action={() => sortBy(column.key)}
                            >
                                {#snippet children()}
                                    <span class="truncate">{column.label}</span>

                                    {#if sortKey === column.key}
                                        {#if sortDir === 1}
                                            <IconCaretUp class="h-4 w-4" />
                                        {:else}
                                            <IconCaretDown class="h-4 w-4" />
                                        {/if}
                                    {/if}
                                {/snippet}
                            </Button>
                        </th>
                    {/each}

                    <th
                        class={[
                            headClass,
                            "p-0",
                            hasFoldableColumns ? "w-16" : "w-8",
                        ]}
                    >
                        <div class="flex items-center justify-center h-full">
                            {#if hasFoldableColumns}
                                <Button
                                    bare
                                    variant="none"
                                    icon={IconLayoutColumns}
                                    title={effectiveLabels.toggleFoldedColumns}
                                    class={[
                                        "px-2 py-1 cursor-pointer flex items-center justify-center",
                                        folded && "text-accent-foreground",
                                    ]}
                                    action={() => (folded = !folded)}
                                />
                            {/if}

                            <Button
                                bare
                                variant="none"
                                icon={IconFilter}
                                title={effectiveLabels.toggleFilters}
                                class={[
                                    "px-2 py-1 cursor-pointer flex items-center justify-center",
                                    filtersVisible && "text-accent-foreground",
                                ]}
                                action={() =>
                                    (filtersVisible = !filtersVisible)}
                            />
                        </div>
                    </th>
                </tr>

                {#if filtersVisible}
                    <tr>
                        {#each visibleColumns as column (column.key)}
                            <th class={[headClass, "p-1 font-normal"]}>
                                <Input
                                    placeholder={effectiveLabels.filter}
                                    bind:value={
                                        () => filters[column.key] ?? "",
                                        (value) => (filters[column.key] = value)
                                    }
                                />
                            </th>
                        {/each}

                        <th class={headClass}></th>
                    </tr>
                {/if}
            </thead>

            <tbody>
                {#each paged as row, index (row.id)}
                    <tr class={rowClass(index)}>
                        {#each visibleColumns as column (column.key)}
                            {#if editing?.id === row.id && editing.key === column.key}
                                <td class={[cellClass, "p-1"]}>
                                    <Input
                                        autofocus
                                        type={column.type ?? "text"}
                                        bind:value={draft}
                                        onblur={() => commit(row, column)}
                                        onkeydown={(event) =>
                                            keydown(event, row, column)}
                                    />
                                </td>
                            {:else if editable(column)}
                                <td class={[cellClass, "p-0"]}>
                                    <Button
                                        bare
                                        variant="none"
                                        class={[
                                            "w-full px-2 py-1 cursor-text truncate",
                                            alignClass(column),
                                        ]}
                                        action={() => startEdit(row, column)}
                                        onfocus={() => startEdit(row, column)}
                                    >
                                        {#snippet children()}
                                            {display(row, column)}
                                        {/snippet}
                                    </Button>
                                </td>
                            {:else if onRowClick}
                                <td class={[cellClass, "p-0"]}>
                                    <Button
                                        bare
                                        variant="none"
                                        class={[
                                            "w-full px-2 py-1 cursor-pointer truncate",
                                            alignClass(column),
                                        ]}
                                        action={() => onRowClick(row)}
                                    >
                                        {#snippet children()}
                                            {display(row, column)}
                                        {/snippet}
                                    </Button>
                                </td>
                            {:else}
                                <td
                                    class={[
                                        cellClass,
                                        "px-2 py-1",
                                        alignClass(column),
                                    ]}
                                >
                                    {display(row, column)}
                                </td>
                            {/if}
                        {/each}

                        <td class={[cellClass, "p-0 text-center"]}>
                            {#if onDelete}
                                <Button
                                    bare
                                    variant="none"
                                    icon={IconTrash}
                                    title={effectiveLabels.delete}
                                    class="px-2 py-1 cursor-pointer align-middle"
                                    action={() => (deleting = row)}
                                />
                            {/if}
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td
                            class={[bodyClass, "px-2 py-1 text-center"]}
                            colspan={visibleColumns.length + 1}
                        >
                            {effectiveLabels.noRows}
                        </td>
                    </tr>
                {/each}
            </tbody>

            {#if summary}
                <tfoot>
                    <tr class={rowClass(paged.length)}>
                        {#each visibleColumns as column (column.key)}
                            <td
                                class={[
                                    summaryClass,
                                    "px-2 py-1 font-bold",
                                    alignClass(column),
                                ]}
                            >
                                {displaySummary(column)}
                            </td>
                        {/each}

                        <td class={summaryClass}></td>
                    </tr>
                </tfoot>
            {/if}
        </table>
    </div>

    <div class="flex items-center justify-between flex-wrap gap-y-2 py-1 mt-4">
        <div class="hidden md:flex w-1/2 md:w-1/3">
            {effectiveLabels.rows(sorted.length)}
        </div>

        {#if pages > 1}
            <div
                class="flex items-center justify-start md:justify-center w-1/2 md:w-1/3"
            >
                <Pagination
                    bind:page
                    {pages}
                    label={effectiveLabels.page}
                    previousLabel={effectiveLabels.previousPage}
                    nextLabel={effectiveLabels.nextPage}
                />
            </div>
        {/if}

        <div class="flex items-center justify-end grow gap-2 md:w-1/3">
            <Select bind:value={pageSize} options={PAGE_SIZES} />

            <div class="flex text-nowrap">{effectiveLabels.perPage}</div>
        </div>
    </div>
</div>

<Dialog
    open={deleting !== null}
    title={effectiveLabels.deleteTitle}
    message={effectiveLabels.deleteMessage}
    confirmLabel={effectiveLabels.deleteConfirm}
    cancelLabel={effectiveLabels.cancel}
    closeTitle={effectiveLabels.close}
    onConfirm={confirmDelete}
    onCancel={() => (deleting = null)}
/>
