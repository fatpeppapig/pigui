<script lang="ts">
    import { browser } from "$app/environment";
    import { createRawSnippet, onMount } from "svelte";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconClock from "@tabler/icons-svelte/icons/clock";

    import {
        Accordion,
        Alert,
        Badge,
        Breadcrumbs,
        Button,
        ButtonGroup,
        Card,
        CopyButton,
        DatePicker,
        DateSelector,
        Dialog,
        Dropdown,
        Floating,
        Input,
        Loader,
        Modal,
        Navbar,
        Pagination,
        Popover,
        Progress,
        SearchSelect,
        Select,
        SIZES,
        STATUSES,
        Table,
        Tabbar,
        TimePicker,
        TimeSelector,
        ToastContainer,
        Tooltip,
        VARIANTS,
        showToast,
        type Column,
    } from "pigui";

    import Demo from "$lib/Demo.svelte";
    import Section from "$lib/Section.svelte";

    const REPO = "https://github.com/fatpeppapig/pigui";

    const groups = [
        {
            title: "Atoms",
            items: [
                { id: "button", name: "Button" },
                { id: "badge", name: "Badge" },
                { id: "loader", name: "Loader" },
                { id: "progress", name: "Progress" },
                { id: "input", name: "Input" },
                { id: "select", name: "Select" },
                { id: "card", name: "Card" },
            ],
        },
        {
            title: "Molecules",
            items: [
                { id: "button-group", name: "ButtonGroup" },
                { id: "copy-button", name: "CopyButton" },
                { id: "alert", name: "Alert" },
                { id: "tooltip", name: "Tooltip" },
                { id: "tabbar", name: "Tabbar" },
                { id: "breadcrumbs", name: "Breadcrumbs" },
                { id: "pagination", name: "Pagination" },
            ],
        },
        {
            title: "Organisms",
            items: [
                { id: "modal", name: "Modal" },
                { id: "dialog", name: "Dialog" },
                { id: "popover", name: "Popover" },
                { id: "dropdown", name: "Dropdown" },
                { id: "floating", name: "Floating" },
                { id: "navbar", name: "Navbar" },
                { id: "toast", name: "Toast" },
                { id: "search-select", name: "SearchSelect" },
                { id: "date-selector", name: "DateSelector" },
                { id: "time-selector", name: "TimeSelector" },
                { id: "date-picker", name: "DatePicker" },
                { id: "time-picker", name: "TimePicker" },
                { id: "accordion", name: "Accordion" },
                { id: "table", name: "Table" },
            ],
        },
    ];

    const schemeItems = [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "light dark", label: "System" },
    ];

    let scheme = $state<string>(
        browser
            ? (localStorage.getItem("pigui-scheme") ?? "light dark")
            : "light dark",
    );

    $effect(() => {
        if (!browser) return;
        document.documentElement.style.colorScheme = scheme;
        localStorage.setItem("pigui-scheme", scheme);
    });

    let activeId = $state("button");

    let modalOpen = $state(false);
    let dialogOpen = $state(false);

    let floatingAnchor = $state<HTMLElement>();
    let floatingOpen = $state(false);

    let tab = $state<string | number>("home");

    const tabItems = [
        { value: "home", label: "Home" },
        { value: "reports", label: "Reports" },
        { value: "settings", label: "Settings" },
    ];

    let page = $state(3);

    let selectValue = $state<string | number>("md");

    const selectOptions = [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
    ];

    let fruit = $state<string | null>(null);

    const fruitOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "grape", label: "Grape" },
        { value: "orange", label: "Orange" },
        { value: "pear", label: "Pear" },
        { value: "plum", label: "Plum" },
    ];

    let inputText = $state("");
    let inputNumber = $state<string | number>(1234.5);
    let inputPassword = $state("");

    let dateValue = $state("2026-07-15");
    let dateSelValue = $state("2026-07-15");
    let timeValue = $state("14:30");
    let timeSelValue = $state("14:30");

    const dropdownItems = [
        { label: "Rename", onSelect: () => showToast("Renamed") },
        { label: "Duplicate", onSelect: () => showToast("Duplicated") },
        { label: "Archive", disabled: true },
        {
            label: "Delete",
            onSelect: () => showToast("Deleted", { status: "danger" }),
        },
    ];

    const breadcrumbItems = [
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Breadcrumbs" },
    ];

    const paragraph = (text: string) =>
        createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

    const accordionItems = [
        {
            title: "What is PigUI?",
            content: paragraph(
                "A Svelte 5 component library themed entirely by Tailwind CSS semantic tokens.",
            ),
            open: true,
        },
        {
            title: "How is it themed?",
            content: paragraph(
                "Every color comes from a semantic token defined in theme.css.",
            ),
        },
        {
            title: "Does it support dark mode?",
            content: paragraph(
                "Yes — tokens use light-dark(), so the color-scheme property switches the palette.",
            ),
        },
    ];

    type Person = { id: number; name: string; role: string; age: number };

    const columns: Column<Person>[] = [
        { key: "name", label: "Name", editable: true },
        { key: "role", label: "Role", editable: true },
        {
            key: "age",
            label: "Age",
            type: "number",
            width: "6rem",
            editable: true,
        },
    ];

    const plainColumns: Column<Person>[] = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "age", label: "Age", type: "number", width: "6rem" },
    ];

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

    const totalAge = $derived(rows.reduce((sum, p) => sum + p.age, 0));

    onMount(() => {
        const sections = [...document.querySelectorAll("section[id]")];
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) activeId = entry.target.id;
                }
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );

        for (const section of sections) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    });
</script>

<svelte:head>
    <title>PigUI — Svelte 5 component library</title>
</svelte:head>

<ToastContainer />

<div class="min-h-screen bg-background text-foreground">
    <div class="sticky top-0 z-40 border-b border-border">
        <Navbar>
            {#snippet brand()}
                <a href="#top" class="text-lg font-bold">PigUI</a>
            {/snippet}

            {#snippet nav()}
                <Tabbar
                    items={schemeItems}
                    value={scheme}
                    onChange={(value) => (scheme = String(value))}
                    label="Color scheme"
                />
            {/snippet}

            {#snippet actions()}
                <Button
                    variant="tertiary"
                    size="md"
                    icon={IconBrandGithub}
                    label="GitHub"
                    action={() => window.open(REPO, "_blank")}
                />
            {/snippet}
        </Navbar>
    </div>

    <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 lg:px-8">
        <aside class="hidden w-56 shrink-0 lg:block">
            <nav
                class="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-5 overflow-y-auto py-10 pr-2 text-sm"
            >
                {#each groups as group (group.title)}
                    <div class="flex flex-col gap-1">
                        <div
                            class="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            {group.title}
                        </div>

                        {#each group.items as item (item.id)}
                            <a
                                href="#{item.id}"
                                class="rounded-md px-2 py-1 transition-colors hover:bg-muted {activeId ===
                                item.id
                                    ? 'bg-muted font-medium text-foreground'
                                    : 'text-muted-foreground'}"
                                aria-current={activeId === item.id
                                    ? "true"
                                    : undefined}
                            >
                                {item.name}
                            </a>
                        {/each}
                    </div>
                {/each}
            </nav>
        </aside>

        <main class="flex min-w-0 flex-1 flex-col gap-16 py-10">
            <header id="top" class="flex flex-col gap-4 scroll-mt-24">
                <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
                    PigUI
                </h1>

                <p class="max-w-2xl text-lg text-muted-foreground">
                    A Svelte 5 component library themed entirely by Tailwind CSS
                    V4 semantic tokens. Override the tokens in one
                    <code class="text-foreground">@theme</code> block to reskin every
                    component — light and dark in one go.
                </p>

                <div class="flex flex-wrap items-center gap-3">
                    <Button
                        variant="primary"
                        size="lg"
                        icon={IconBrandGithub}
                        label="View on GitHub"
                        action={() => window.open(REPO, "_blank")}
                    />

                    <CopyButton
                        variant="secondary"
                        size="lg"
                        label="npm i github:fatpeppapig/pigui"
                        action={() =>
                            navigator.clipboard.writeText(
                                "npm i github:fatpeppapig/pigui",
                            )}
                    />
                </div>
            </header>

            <Section
                id="button"
                title="Button"
                source="import {'{ Button }'} from 'pigui'"
                description="Four variants across three sizes, with optional icons and a round icon-only mode."
            >
                <Demo label="Variants">
                    {#each VARIANTS as variant (variant)}
                        <Button {variant} label={variant} />
                    {/each}
                </Demo>

                <Demo label="Sizes">
                    {#each SIZES as size (size)}
                        <Button variant="primary" {size} label={size} />
                    {/each}
                </Demo>

                <Demo label="Icons & states">
                    <Button
                        variant="secondary"
                        icon={IconClock}
                        label="With icon"
                    />

                    <Button
                        variant="secondary"
                        icon={IconClock}
                        round
                        title="Clock"
                    />
                    <Button variant="primary" label="Disabled" disabled />
                </Demo>
            </Section>

            <Section
                id="badge"
                title="Badge"
                source="import {'{ Badge }'} from 'pigui'"
                description="Compact labels that share the variant and status palettes."
            >
                <Demo label="Variants & statuses">
                    {#each [...VARIANTS, ...STATUSES] as variant (variant)}
                        <Badge {variant} label={variant} />
                    {/each}
                </Demo>

                <Demo label="Sizes">
                    {#each SIZES as size (size)}
                        <Badge {size} label={size} />
                    {/each}
                </Demo>
            </Section>

            <Section
                id="loader"
                title="Loader"
                source="import {'{ Loader }'} from 'pigui'"
                description="A minimal spinner for pending states."
            >
                <Demo>
                    <Loader />

                    <Loader label="Loading…" />
                </Demo>
            </Section>

            <Section
                id="progress"
                title="Progress"
                source="import {'{ Progress }'} from 'pigui'"
                description="A determinate progress bar in every status color and size."
            >
                <Demo inner="flex flex-col gap-3 w-64">
                    <Progress value={40} label="Progress" />

                    {#each STATUSES as status (status)}
                        <Progress value={40} {status} />
                    {/each}
                </Demo>
            </Section>

            <Section
                id="input"
                title="Input"
                source="import {'{ Input }'} from 'pigui'"
                description="Text, number (with decimals and separators), and password fields."
            >
                <Demo inner="flex flex-col gap-3 w-64">
                    <Input
                        placeholder="Type something…"
                        bind:value={inputText}
                    />

                    <Input
                        type="number"
                        decimals={2}
                        bind:value={inputNumber}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        bind:value={inputPassword}
                    />
                </Demo>
            </Section>

            <Section
                id="select"
                title="Select"
                source="import {'{ Select }'} from 'pigui'"
                description="A native select styled with the token palette. Value: {selectValue}."
            >
                <Demo>
                    <Select options={selectOptions} bind:value={selectValue} />
                </Demo>
            </Section>

            <Section
                id="card"
                title="Card"
                source="import {'{ Card }'} from 'pigui'"
                description="Wraps arbitrary content in a themed surface with a border and rounded corners."
            >
                <Demo>
                    <div class="w-80">
                        <Card>
                            <div class="flex flex-col gap-2">
                                <div class="font-bold">Card title</div>

                                <p>
                                    Cards wrap arbitrary content in a themed
                                    surface with a border and rounded corners.
                                </p>
                            </div>
                        </Card>
                    </div>
                </Demo>
            </Section>

            <Section
                id="button-group"
                title="ButtonGroup"
                source="import {'{ ButtonGroup }'} from 'pigui'"
                description="Segments a set of related buttons into a single bordered control."
            >
                <Demo>
                    <ButtonGroup label="Alignment">
                        <Button size="md" label="Left" />

                        <Button size="md" label="Center" active />

                        <Button size="md" label="Right" />
                    </ButtonGroup>
                </Demo>
            </Section>

            <Section
                id="copy-button"
                title="CopyButton"
                source="import {'{ CopyButton }'} from 'pigui'"
                description="A button that runs a copy action and flips to a checkmark for feedback."
            >
                <Demo>
                    <CopyButton
                        label="Copy"
                        action={() => navigator.clipboard.writeText("pigui")}
                    />

                    <CopyButton
                        round
                        title="Copy to clipboard"
                        action={() => navigator.clipboard.writeText("pigui")}
                    />
                </Demo>
            </Section>

            <Section
                id="alert"
                title="Alert"
                source="import {'{ Alert }'} from 'pigui'"
                description="Inline status messages, optionally dismissible via onClose."
            >
                <Demo inner="flex flex-col gap-3 w-full">
                    <Alert status="info" title="Heads up">
                        This is an informational message.
                    </Alert>

                    <Alert status="success" title="Saved">
                        Your changes have been saved.
                    </Alert>

                    <Alert status="warning" title="Careful">
                        This action may have side effects.
                    </Alert>

                    <Alert status="danger" title="Error" onClose={() => {}}>
                        Something went wrong — this alert can be dismissed.
                    </Alert>
                </Demo>
            </Section>

            <Section
                id="tooltip"
                title="Tooltip"
                source="import {'{ Tooltip }'} from 'pigui'"
                description="Hover or focus a target to reveal a positioned tooltip."
            >
                <Demo>
                    <Tooltip text="More information">
                        <Button size="md" label="Hover me" />
                    </Tooltip>

                    <Tooltip text="To the right" placement="right" delay={0}>
                        <Button size="md" label="Hover me" />
                    </Tooltip>
                </Demo>
            </Section>

            <Section
                id="tabbar"
                title="Tabbar"
                source="import {'{ Tabbar }'} from 'pigui'"
                description="A segmented tab control. Bound value: {tab}."
            >
                <Demo>
                    <Tabbar
                        items={tabItems}
                        bind:value={tab}
                        label="Sections"
                    />
                </Demo>
            </Section>

            <Section
                id="breadcrumbs"
                title="Breadcrumbs"
                source="import {'{ Breadcrumbs }'} from 'pigui'"
                description="A trail of links with a configurable separator."
            >
                <Demo inner="flex flex-col gap-3 items-start">
                    <Breadcrumbs items={breadcrumbItems} />

                    <Breadcrumbs items={breadcrumbItems} separator="›" />
                </Demo>
            </Section>

            <Section
                id="pagination"
                title="Pagination"
                source="import {'{ Pagination }'} from 'pigui'"
                description="Page controls with a customizable label. Current page: {page}."
            >
                <Demo>
                    <Pagination pages={10} bind:page />
                </Demo>
            </Section>

            <Section
                id="modal"
                title="Modal"
                source="import {'{ Modal }'} from 'pigui'"
                description="A general-purpose overlay with a built-in close button and backdrop dismiss."
            >
                <Demo>
                    <Button
                        variant="primary"
                        size="md"
                        label="Open modal"
                        action={() => (modalOpen = true)}
                    />
                    <Modal open={modalOpen} onClose={() => (modalOpen = false)}>
                        <div class="flex w-96 max-w-full flex-col gap-2 p-6">
                            <div class="font-bold">Modal title</div>

                            <p>
                                Any content can go here. The close button in the
                                corner and the backdrop click are built in.
                            </p>
                        </div>
                    </Modal>
                </Demo>
            </Section>

            <Section
                id="dialog"
                title="Dialog"
                source="import {'{ Dialog }'} from 'pigui'"
                description="A focused confirm/cancel prompt for destructive actions."
            >
                <Demo>
                    <Button
                        variant="primary"
                        size="md"
                        label="Delete row"
                        action={() => (dialogOpen = true)}
                    />

                    <Dialog
                        open={dialogOpen}
                        title="Delete row?"
                        message="This action cannot be undone."
                        confirmLabel="Delete"
                        cancelLabel="Keep it"
                        onConfirm={() => {
                            dialogOpen = false;
                            showToast("Row deleted", { status: "danger" });
                        }}
                        onCancel={() => (dialogOpen = false)}
                    />
                </Demo>
            </Section>

            <Section
                id="popover"
                title="Popover"
                source="import {'{ Popover }'} from 'pigui'"
                description="Arbitrary content anchored to a trigger, dismissed on outside click or Escape."
            >
                <Demo>
                    <Popover>
                        {#snippet trigger()}
                            <Button size="md" label="Open popover" />
                        {/snippet}

                        <div class="flex max-w-60 flex-col gap-1">
                            <div class="font-bold">Popover</div>

                            <p>Click outside or press Escape to dismiss.</p>
                        </div>
                    </Popover>
                </Demo>
            </Section>

            <Section
                id="dropdown"
                title="Dropdown"
                source="import {'{ Dropdown }'} from 'pigui'"
                description="A menu of actions anchored to a trigger, with disabled items and placement control."
            >
                <Demo>
                    <Dropdown items={dropdownItems} label="Actions">
                        {#snippet trigger()}
                            <Button size="md" label="Actions" />
                        {/snippet}
                    </Dropdown>

                    <Dropdown
                        items={dropdownItems}
                        label="Actions"
                        placement="top-start"
                    >
                        {#snippet trigger()}
                            <Button size="md" label="Open upward" />
                        {/snippet}
                    </Dropdown>
                </Demo>
            </Section>

            <Section
                id="floating"
                title="Floating"
                source="import {'{ Floating }'} from 'pigui'"
                description="The positioning primitive behind Dropdown/Popover — anchor any content with the native popover API."
            >
                <Demo>
                    <div bind:this={floatingAnchor} class="inline-flex h-10">
                        <Button
                            label={floatingOpen ? "Hide" : "Show"}
                            action={() => (floatingOpen = !floatingOpen)}
                        />
                    </div>

                    <Floating
                        anchor={floatingAnchor}
                        open={floatingOpen}
                        placement="bottom"
                        onClose={() => (floatingOpen = false)}
                    >
                        <div
                            class="rounded-lg border border-border bg-surface-raised p-3 shadow-md"
                        >
                            Anchored to the button with the native popover API.
                        </div>
                    </Floating>
                </Demo>
            </Section>

            <Section
                id="navbar"
                title="Navbar"
                source="import {'{ Navbar }'} from 'pigui'"
                description="A responsive top bar with brand, nav, and actions snippets — it powers the header of this page."
            >
                <Demo inner="block w-full">
                    <Navbar>
                        {#snippet brand()}
                            <span class="text-lg font-bold">PigUI</span>
                        {/snippet}

                        {#snippet nav()}
                            <Tabbar items={tabItems} value="home" />
                        {/snippet}

                        {#snippet actions()}
                            <Button size="md" label="Sign in" />
                        {/snippet}
                    </Navbar>
                </Demo>
            </Section>

            <Section
                id="toast"
                title="Toast"
                source="import {'{ showToast, ToastContainer }'} from 'pigui'"
                description="Fire transient notifications from anywhere with showToast(). Render one ToastContainer at the app root."
            >
                <Demo>
                    {#each STATUSES as status (status)}
                        <Button
                            size="md"
                            label={status}
                            action={() =>
                                showToast(`This is a ${status} toast.`, {
                                    status,
                                    title: status,
                                })}
                        />
                    {/each}
                </Demo>
            </Section>

            <Section
                id="search-select"
                title="SearchSelect"
                source="import {'{ SearchSelect }'} from 'pigui'"
                description="A filterable combobox. Value: {fruit ?? '—'}."
            >
                <Demo inner="block w-64">
                    <SearchSelect
                        options={fruitOptions}
                        placeholder="Search fruit…"
                        bind:value={fruit}
                    />
                </Demo>
            </Section>

            <Section
                id="date-selector"
                title="DateSelector"
                source="import {'{ DateSelector }'} from 'pigui'"
                description="An inline calendar for choosing a date. Value: {dateSelValue}."
            >
                <Demo>
                    <DateSelector bind:value={dateSelValue} />
                </Demo>
            </Section>

            <Section
                id="time-selector"
                title="TimeSelector"
                source="import {'{ TimeSelector }'} from 'pigui'"
                description="An inline stepped time list. Value: {timeSelValue}."
            >
                <Demo>
                    <TimeSelector bind:value={timeSelValue} step={30} />
                </Demo>
            </Section>

            <Section
                id="date-picker"
                title="DatePicker"
                source="import {'{ DatePicker }'} from 'pigui'"
                description="A text field with a calendar popover. Value: {dateValue}."
            >
                <Demo inner="block w-48">
                    <DatePicker bind:value={dateValue} />
                </Demo>
            </Section>

            <Section
                id="time-picker"
                title="TimePicker"
                source="import {'{ TimePicker }'} from 'pigui'"
                description="A time field with a stepped dropdown. Value: {timeValue}."
            >
                <Demo inner="block w-28">
                    <TimePicker bind:value={timeValue} minuteStep={15} />
                </Demo>
            </Section>

            <Section
                id="accordion"
                title="Accordion"
                source="import {'{ Accordion }'} from 'pigui'"
                description="Collapsible sections, optionally exclusive so only one stays open."
            >
                <Demo inner="block w-full max-w-xl">
                    <Accordion items={accordionItems} exclusive />
                </Demo>
            </Section>

            <Section
                id="table"
                title="Table"
                source="import {'{ Table }'} from 'pigui'"
                description="A sortable data table with optional filtering, foldable columns, editing, and a summary row."
            >
                <Demo label="Plain" inner="block w-full">
                    <Table columns={plainColumns} {rows} />
                </Demo>

                <Demo label="Filterable" inner="block w-full">
                    <Table columns={plainColumns} {rows} filterable />
                </Demo>

                <Demo label="Foldable" inner="block w-full">
                    <Table
                        columns={foldableColumns}
                        {rows}
                        bind:folded={tableFolded}
                    />
                </Demo>

                <Demo label="Editable" inner="block w-full">
                    <Table
                        {columns}
                        {rows}
                        summary={{ name: "Total", age: totalAge }}
                        onEdit={(row, key, value) =>
                            Object.assign(row, { [key]: value })}
                        onDelete={(row) =>
                            (rows = rows.filter(
                                (other) => other.id !== row.id,
                            ))}
                    />
                </Demo>
            </Section>

            <footer
                class="mt-8 border-t border-border pt-8 text-sm text-muted-foreground"
            >
                Built with PigUI · themed by Tailwind CSS V4 semantic tokens ·

                <a class="underline" href={REPO}>source on GitHub</a>
            </footer>
        </main>
    </div>
</div>
