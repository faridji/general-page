export interface PageConfig {    
    tableConfig: TableConfig;
    formConfig: FormConfig;
}

export interface TableConfig {
    slug: string;

    title: string;
    columns: TableColumn[];
    rowActions?: RowAction[];
}

export interface FormConfig {
    slug: string;

    title: string;
    fields: FormField[];
}

export interface TableColumn {
    name: string,
    title: string;

    visible?: boolean;
    format?: 'date' | 'number';
    sortable?: boolean;
}

export interface RowAction {
    name: string;
    title: string;
    action: string;
    icon: string;

    condition?: (row: any, action: string) => boolean
}

export interface FormField {
    name: string;
    title: string;
    placeholder: string;
    type: 'text' | 'number' | 'radio' | 'date';
    required?: boolean;
    options?: string[];
}

export interface TableSignal {
    type: string;
    row: any;
}