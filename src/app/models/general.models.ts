export interface PageConfig {
    tableConfig: TableConfig;
    formConfig: FormConfig;
}

export interface TableConfig {
    title: string;
    columns: TableColumn[];
}

export interface FormConfig {
    title: string;
    fields: FormField[];
}

export interface TableColumn {
    name: string,
    title: string;
    format?: 'date' | 'number';
    sortable?: boolean;
}

export interface FormField {
    name: string;
    title: string;
    placeholder: string;
    type: 'text' | 'number' | 'radio' | 'date';
    required?: boolean;
    options?: string[];
}