export type Column<T> = {
    key: keyof T & string;
    label: string;
    type?: "text" | "number";
    editable?: boolean;
    width?: string;
    foldable?: boolean;
};

export type TableLabels = {
    filter: string;
    toggleFilters: string;
    toggleFoldedColumns: string;
    delete: string;
    deleteConfirm: string;
    deleteTitle: string;
    deleteMessage: string;
    noRows: string;
    perPage: string;
    previousPage: string;
    nextPage: string;
    cancel: string;
    close: string;
    page: (current: number, pages: number) => string;
    rows: (count: number) => string;
};
