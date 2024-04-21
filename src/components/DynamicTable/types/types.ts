export type TDTSortDirection = "asc" | "desc";

export type TDTCellType = "dropdown" | "date";

export type TDTId = string | number;

type TDTButton<T> = {
  label: string;
  title?: string;
  color?: string;
  fn: (data: T[]) => void;
};

type TDTRowButton<T> = {
  label: string | JSX.Element;
  title?: string;
  color?: string;
  fn: (data: T) => void;
};

export type TDTColumn<T> = {
  label: string;
  interactions?: { sortable?: boolean; editable?: boolean };
  visible?: boolean;
  propertyName: keyof T;
  bold?: boolean;
  type?: TDTCellType;
  maxWidth?: string | number;
  options?: { label: string; value: string | number }[];
};

export type TDTConfiguration<T> = {
  columns: TDTColumn<T>[];
  options?: {
    selectableRow?: boolean;
    selectablePropertyName?: string;
    rowSeparator?: boolean;
    rowButtons?: TDTRowButton<T>[];
    buttons?: TDTButton<T>[];
  };
};

interface IDTExtend {
  id: string | number;
  checked: boolean;
}

export interface IndexableIDTExtend extends IDTExtend {
  [key: string]: string | number | boolean;
}
