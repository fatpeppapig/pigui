<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";

    import { Button, CopyButton, Navbar, Tabbar, ToastContainer } from "pigui";

    import Demo from "$lib/Demo.svelte";
    import Section from "$lib/Section.svelte";

    import ButtonVariantsDemo from "$lib/demos/button-variants.svelte";
    import buttonVariantsCode from "$lib/demos/button-variants.svelte?raw";
    import ButtonSizesDemo from "$lib/demos/button-sizes.svelte";
    import buttonSizesCode from "$lib/demos/button-sizes.svelte?raw";
    import ButtonIconsStatesDemo from "$lib/demos/button-icons-states.svelte";
    import buttonIconsStatesCode from "$lib/demos/button-icons-states.svelte?raw";
    import BadgeVariantsStatusesDemo from "$lib/demos/badge-variants-statuses.svelte";
    import badgeVariantsStatusesCode from "$lib/demos/badge-variants-statuses.svelte?raw";
    import BadgeSizesDemo from "$lib/demos/badge-sizes.svelte";
    import badgeSizesCode from "$lib/demos/badge-sizes.svelte?raw";
    import LoaderDemo from "$lib/demos/loader.svelte";
    import loaderCode from "$lib/demos/loader.svelte?raw";
    import ProgressDemo from "$lib/demos/progress.svelte";
    import progressCode from "$lib/demos/progress.svelte?raw";
    import InputDemo from "$lib/demos/input.svelte";
    import inputCode from "$lib/demos/input.svelte?raw";
    import SelectDemo from "$lib/demos/select.svelte";
    import selectCode from "$lib/demos/select.svelte?raw";
    import CardDemo from "$lib/demos/card.svelte";
    import cardCode from "$lib/demos/card.svelte?raw";
    import ButtonGroupDemo from "$lib/demos/button-group.svelte";
    import buttonGroupCode from "$lib/demos/button-group.svelte?raw";
    import CopyButtonDemo from "$lib/demos/copy-button.svelte";
    import copyButtonCode from "$lib/demos/copy-button.svelte?raw";
    import CheckboxDemo from "$lib/demos/checkbox.svelte";
    import checkboxCode from "$lib/demos/checkbox.svelte?raw";
    import AlertDemo from "$lib/demos/alert.svelte";
    import alertCode from "$lib/demos/alert.svelte?raw";
    import TooltipDemo from "$lib/demos/tooltip.svelte";
    import tooltipCode from "$lib/demos/tooltip.svelte?raw";
    import TabbarDemo from "$lib/demos/tabbar.svelte";
    import tabbarCode from "$lib/demos/tabbar.svelte?raw";
    import BreadcrumbsDemo from "$lib/demos/breadcrumbs.svelte";
    import breadcrumbsCode from "$lib/demos/breadcrumbs.svelte?raw";
    import PaginationDemo from "$lib/demos/pagination.svelte";
    import paginationCode from "$lib/demos/pagination.svelte?raw";
    import ModalDemo from "$lib/demos/modal.svelte";
    import modalCode from "$lib/demos/modal.svelte?raw";
    import DialogDemo from "$lib/demos/dialog.svelte";
    import dialogCode from "$lib/demos/dialog.svelte?raw";
    import PopoverDemo from "$lib/demos/popover.svelte";
    import popoverCode from "$lib/demos/popover.svelte?raw";
    import DropdownDemo from "$lib/demos/dropdown.svelte";
    import dropdownCode from "$lib/demos/dropdown.svelte?raw";
    import FloatingDemo from "$lib/demos/floating.svelte";
    import floatingCode from "$lib/demos/floating.svelte?raw";
    import NavbarDemo from "$lib/demos/navbar.svelte";
    import navbarCode from "$lib/demos/navbar.svelte?raw";
    import ToastDemo from "$lib/demos/toast.svelte";
    import toastCode from "$lib/demos/toast.svelte?raw";
    import SearchSelectDemo from "$lib/demos/search-select.svelte";
    import searchSelectCode from "$lib/demos/search-select.svelte?raw";
    import DateSelectorDemo from "$lib/demos/date-selector.svelte";
    import dateSelectorCode from "$lib/demos/date-selector.svelte?raw";
    import TimeSelectorDemo from "$lib/demos/time-selector.svelte";
    import timeSelectorCode from "$lib/demos/time-selector.svelte?raw";
    import DatePickerDemo from "$lib/demos/date-picker.svelte";
    import datePickerCode from "$lib/demos/date-picker.svelte?raw";
    import TimePickerDemo from "$lib/demos/time-picker.svelte";
    import timePickerCode from "$lib/demos/time-picker.svelte?raw";
    import AccordionDemo from "$lib/demos/accordion.svelte";
    import accordionCode from "$lib/demos/accordion.svelte?raw";
    import TablePlainDemo from "$lib/demos/table-plain.svelte";
    import tablePlainCode from "$lib/demos/table-plain.svelte?raw";
    import TableFilterableDemo from "$lib/demos/table-filterable.svelte";
    import tableFilterableCode from "$lib/demos/table-filterable.svelte?raw";
    import TableFoldableDemo from "$lib/demos/table-foldable.svelte";
    import tableFoldableCode from "$lib/demos/table-foldable.svelte?raw";
    import TableEditableDemo from "$lib/demos/table-editable.svelte";
    import tableEditableCode from "$lib/demos/table-editable.svelte?raw";
    import TableSelectableDemo from "$lib/demos/table-selectable.svelte";
    import tableSelectableCode from "$lib/demos/table-selectable.svelte?raw";
    import RichTextDemo from "$lib/demos/rich-text.svelte";
    import richTextCode from "$lib/demos/rich-text.svelte?raw";
    import RichEditorDemo from "$lib/demos/rich-editor.svelte";
    import richEditorCode from "$lib/demos/rich-editor.svelte?raw";
    import RichEditorToolsDemo from "$lib/demos/rich-editor-tools.svelte";
    import richEditorToolsCode from "$lib/demos/rich-editor-tools.svelte?raw";

    const REPO = "https://github.com/fatpeppapig/pigui";

    const groups = [
        {
            title: "Atoms",
            items: [
                { id: "button", name: "Button" },
                { id: "badge", name: "Badge" },
                { id: "checkbox", name: "Checkbox" },
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
                { id: "rich-text", name: "RichText" },
                { id: "rich-editor", name: "RichEditor" },
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
                <Demo label="Variants" code={buttonVariantsCode}>
                    <ButtonVariantsDemo />
                </Demo>

                <Demo label="Sizes" code={buttonSizesCode}>
                    <ButtonSizesDemo />
                </Demo>

                <Demo label="Icons & states" code={buttonIconsStatesCode}>
                    <ButtonIconsStatesDemo />
                </Demo>
            </Section>

            <Section
                id="badge"
                title="Badge"
                source="import {'{ Badge }'} from 'pigui'"
                description="Compact labels that share the variant and status palettes."
            >
                <Demo
                    label="Variants & statuses"
                    code={badgeVariantsStatusesCode}
                >
                    <BadgeVariantsStatusesDemo />
                </Demo>

                <Demo label="Sizes" code={badgeSizesCode}>
                    <BadgeSizesDemo />
                </Demo>
            </Section>

            <Section
                id="loader"
                title="Loader"
                source="import {'{ Loader }'} from 'pigui'"
                description="A minimal spinner for pending states."
            >
                <Demo code={loaderCode}>
                    <LoaderDemo />
                </Demo>
            </Section>

            <Section
                id="progress"
                title="Progress"
                source="import {'{ Progress }'} from 'pigui'"
                description="A determinate progress bar in every status color and size."
            >
                <Demo inner="flex flex-col gap-3 w-64" code={progressCode}>
                    <ProgressDemo />
                </Demo>
            </Section>

            <Section
                id="input"
                title="Input"
                source="import {'{ Input }'} from 'pigui'"
                description="Text, number (with decimals and separators), and password fields."
            >
                <Demo inner="flex flex-col gap-3 w-64" code={inputCode}>
                    <InputDemo />
                </Demo>
            </Section>

            <Section
                id="select"
                title="Select"
                source="import {'{ Select }'} from 'pigui'"
                description="A native select styled with the token palette."
            >
                <Demo code={selectCode}>
                    <SelectDemo />
                </Demo>
            </Section>

            <Section
                id="card"
                title="Card"
                source="import {'{ Card }'} from 'pigui'"
                description="Wraps arbitrary content in a themed surface with a border and rounded corners."
            >
                <Demo code={cardCode}>
                    <CardDemo />
                </Demo>
            </Section>

            <Section
                id="button-group"
                title="ButtonGroup"
                source="import {'{ ButtonGroup }'} from 'pigui'"
                description="Segments a set of related buttons into a single bordered control."
            >
                <Demo code={buttonGroupCode}>
                    <ButtonGroupDemo />
                </Demo>
            </Section>

            <Section
                id="copy-button"
                title="CopyButton"
                source="import {'{ CopyButton }'} from 'pigui'"
                description="A button that runs a copy action and flips to a checkmark for feedback."
            >
                <Demo code={copyButtonCode}>
                    <CopyButtonDemo />
                </Demo>
            </Section>

            <Section
                id="checkbox"
                title="Checkbox"
                source="import {'{ Checkbox }'} from 'pigui'"
                description="A checkbox that allows user to toggle an option."
            >
                <Demo code={checkboxCode}>
                    <CheckboxDemo />
                </Demo>
            </Section>

            <Section
                id="alert"
                title="Alert"
                source="import {'{ Alert }'} from 'pigui'"
                description="Inline status messages, optionally dismissible via onClose."
            >
                <Demo inner="flex flex-col gap-3 w-full" code={alertCode}>
                    <AlertDemo />
                </Demo>
            </Section>

            <Section
                id="tooltip"
                title="Tooltip"
                source="import {'{ Tooltip }'} from 'pigui'"
                description="Hover or focus a target to reveal a positioned tooltip."
            >
                <Demo code={tooltipCode}>
                    <TooltipDemo />
                </Demo>
            </Section>

            <Section
                id="tabbar"
                title="Tabbar"
                source="import {'{ Tabbar }'} from 'pigui'"
                description="A segmented tab control that binds to the selected value."
            >
                <Demo code={tabbarCode}>
                    <TabbarDemo />
                </Demo>
            </Section>

            <Section
                id="breadcrumbs"
                title="Breadcrumbs"
                source="import {'{ Breadcrumbs }'} from 'pigui'"
                description="A trail of links with a configurable separator."
            >
                <Demo
                    inner="flex flex-col gap-3 items-start"
                    code={breadcrumbsCode}
                >
                    <BreadcrumbsDemo />
                </Demo>
            </Section>

            <Section
                id="pagination"
                title="Pagination"
                source="import {'{ Pagination }'} from 'pigui'"
                description="Page controls with a customizable label."
            >
                <Demo code={paginationCode}>
                    <PaginationDemo />
                </Demo>
            </Section>

            <Section
                id="modal"
                title="Modal"
                source="import {'{ Modal }'} from 'pigui'"
                description="A general-purpose overlay with a built-in close button and backdrop dismiss."
            >
                <Demo code={modalCode}>
                    <ModalDemo />
                </Demo>
            </Section>

            <Section
                id="dialog"
                title="Dialog"
                source="import {'{ Dialog }'} from 'pigui'"
                description="A focused confirm/cancel prompt for destructive actions."
            >
                <Demo code={dialogCode}>
                    <DialogDemo />
                </Demo>
            </Section>

            <Section
                id="popover"
                title="Popover"
                source="import {'{ Popover }'} from 'pigui'"
                description="Arbitrary content anchored to a trigger, dismissed on outside click or Escape."
            >
                <Demo code={popoverCode}>
                    <PopoverDemo />
                </Demo>
            </Section>

            <Section
                id="dropdown"
                title="Dropdown"
                source="import {'{ Dropdown }'} from 'pigui'"
                description="A menu of actions anchored to a trigger, with disabled items and placement control."
            >
                <Demo code={dropdownCode}>
                    <DropdownDemo />
                </Demo>
            </Section>

            <Section
                id="floating"
                title="Floating"
                source="import {'{ Floating }'} from 'pigui'"
                description="The positioning primitive behind Dropdown/Popover — anchor any content with the native popover API."
            >
                <Demo code={floatingCode}>
                    <FloatingDemo />
                </Demo>
            </Section>

            <Section
                id="navbar"
                title="Navbar"
                source="import {'{ Navbar }'} from 'pigui'"
                description="A responsive top bar with brand, nav, and actions snippets — it powers the header of this page."
            >
                <Demo inner="block w-full" code={navbarCode}>
                    <NavbarDemo />
                </Demo>
            </Section>

            <Section
                id="toast"
                title="Toast"
                source="import {'{ showToast, ToastContainer }'} from 'pigui'"
                description="Fire transient notifications from anywhere with showToast(). Render one ToastContainer at the app root."
            >
                <Demo code={toastCode}>
                    <ToastDemo />
                </Demo>
            </Section>

            <Section
                id="search-select"
                title="SearchSelect"
                source="import {'{ SearchSelect }'} from 'pigui'"
                description="A filterable combobox."
            >
                <Demo inner="block w-64" code={searchSelectCode}>
                    <SearchSelectDemo />
                </Demo>
            </Section>

            <Section
                id="date-selector"
                title="DateSelector"
                source="import {'{ DateSelector }'} from 'pigui'"
                description="An inline calendar for choosing a date."
            >
                <Demo code={dateSelectorCode}>
                    <DateSelectorDemo />
                </Demo>
            </Section>

            <Section
                id="time-selector"
                title="TimeSelector"
                source="import {'{ TimeSelector }'} from 'pigui'"
                description="An inline stepped time list."
            >
                <Demo code={timeSelectorCode}>
                    <TimeSelectorDemo />
                </Demo>
            </Section>

            <Section
                id="date-picker"
                title="DatePicker"
                source="import {'{ DatePicker }'} from 'pigui'"
                description="A text field with a calendar popover."
            >
                <Demo inner="block w-48" code={datePickerCode}>
                    <DatePickerDemo />
                </Demo>
            </Section>

            <Section
                id="time-picker"
                title="TimePicker"
                source="import {'{ TimePicker }'} from 'pigui'"
                description="A time field with a stepped dropdown."
            >
                <Demo inner="block w-28" code={timePickerCode}>
                    <TimePickerDemo />
                </Demo>
            </Section>

            <Section
                id="accordion"
                title="Accordion"
                source="import {'{ Accordion }'} from 'pigui'"
                description="Collapsible sections, optionally exclusive so only one stays open."
            >
                <Demo inner="block w-full max-w-xl" code={accordionCode}>
                    <AccordionDemo />
                </Demo>
            </Section>

            <Section
                id="rich-text"
                title="RichText"
                source="import {'{ RichText }'} from 'pigui'"
                description="Renders untrusted HTML through DOMPurify, styled by the token palette instead of a typography plugin."
            >
                <Demo inner="block w-full" code={richTextCode}>
                    <RichTextDemo />
                </Demo>
            </Section>

            <Section
                id="rich-editor"
                title="RichEditor"
                source="import {'{ RichEditor }'} from 'pigui/editor'"
                description="A Tiptap editor with a PigUI toolbar. Shipped from the pigui/editor subpath, so Tiptap stays optional for everyone else."
            >
                <Demo
                    label="Default"
                    inner="block w-full"
                    code={richEditorCode}
                >
                    <RichEditorDemo />
                </Demo>

                <Demo
                    label="Custom toolbar"
                    inner="block w-full"
                    code={richEditorToolsCode}
                >
                    <RichEditorToolsDemo />
                </Demo>
            </Section>

            <Section
                id="table"
                title="Table"
                source="import {'{ Table }'} from 'pigui'"
                description="A sortable data table with optional filtering, foldable columns, editing, and a summary row."
            >
                <Demo label="Plain" inner="block w-full" code={tablePlainCode}>
                    <TablePlainDemo />
                </Demo>

                <Demo
                    label="Filterable"
                    inner="block w-full"
                    code={tableFilterableCode}
                >
                    <TableFilterableDemo />
                </Demo>

                <Demo
                    label="Foldable"
                    inner="block w-full"
                    code={tableFoldableCode}
                >
                    <TableFoldableDemo />
                </Demo>

                <Demo
                    label="Editable"
                    inner="block w-full"
                    code={tableEditableCode}
                >
                    <TableEditableDemo />
                </Demo>

                <Demo
                    label="Selectable"
                    inner="block w-full"
                    code={tableSelectableCode}
                >
                    <TableSelectableDemo />
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
