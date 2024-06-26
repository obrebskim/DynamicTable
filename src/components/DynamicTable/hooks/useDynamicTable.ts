import { useCallback, useEffect, useState } from "react";
import {
  IndexableIDTExtend,
  TDTConfiguration,
  TDTSortDirection,
} from "../types/types";

const createFilters = <T extends { id: string | number }>(
  config: TDTConfiguration<T>
) => {
  const sortable = config.columns.filter(
    (column) => column.interactions?.sortable
  );
  const filters: Partial<Record<keyof T, string>> = {};
  sortable.forEach((column) => {
    filters[column.propertyName] = "";
  });
  return filters as Record<keyof T, string>;
};

type Extendable<T> = T & IndexableIDTExtend;

function useDynamicTable<T extends { id: string | number }>({
  configuration,
  data,
  onRowSelect,
  onFileGenerate,
}: {
  data: T[];
  configuration: TDTConfiguration<T>;
  onRowSelect?: (id: string | number) => void;
  onFileGenerate?: (data: T[]) => void;
}) {
  // STATE
  const [dataset, setDataset] = useState<Extendable<T>[]>(
    data.map((row) => ({ ...row, id: row.id, checked: false }))
  );
  const [columns, setColumns] = useState(
    configuration.columns.map((column) => ({
      ...column,
      visible: column.visible !== undefined ? column.visible : true,
    }))
  );
  const [filteredDataset, setFilteredDataset] = useState(dataset);
  const [filters, setFilters] = useState(createFilters(configuration));
  const [isOptionWindowVisible, setIsOptionWindowVisible] = useState(false);

  // EFFECTS

  useEffect(() => {
    data.map((row) => ({ ...row, id: row.id, checked: false }));
  }, [data]);

  useEffect(() => {
    let filtered = structuredClone(dataset);
    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof T;
      filtered = filtered.filter((filter) =>
        (filter[filterKey] + "")
          .toLowerCase()
          .includes(filters[filterKey].toLowerCase())
      );
    });
    setFilteredDataset(filtered);
  }, [dataset, filters]);

  //FUNCTIONS
  const handleSelectRow = useCallback((id: number | string) => {
    if (configuration.options?.selectableRow) {
      setDataset((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, checked: true } : { ...row, checked: false }
        )
      );
    }
    if (onRowSelect) {
      onRowSelect(id);
    }
  }, []);

  const handleFileGenerate = useCallback(() => {
    if (onFileGenerate) {
      onFileGenerate(dataset);
    }
  }, []);

  const handleToggleVisibleColumn = useCallback((id: string) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.propertyName === id
          ? { ...column, visible: !column.visible }
          : { ...column }
      )
    );
  }, []);

  const handleChangeData = useCallback(
    (
      id: string | number,
      propertyName: keyof T,
      value: boolean | string | number
    ) => {
      setDataset((prev) =>
        prev.map((row) => {
          if (row.id === id) return { ...row, [propertyName]: value };
          else {
            return { ...row };
          }
        })
      );
    },
    []
  );

  const handleFilterBy = useCallback((propertyName: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [propertyName]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(createFilters(configuration));
  }, []);

  const handleSort = useCallback(
    (direction: TDTSortDirection, propertyName: keyof T) => {
      setDataset((prev) =>
        [...prev].sort((a, b) => {
          if (direction === "asc") {
            if (a[propertyName] > b[propertyName]) return 1;
            if (a[propertyName] < b[propertyName]) return -1;
            return 0;
          } else {
            if (a[propertyName] < b[propertyName]) return 1;
            if (a[propertyName] > b[propertyName]) return -1;
            return 0;
          }
        })
      );
    },
    []
  );

  return {
    dataset,
    columns,
    filteredDataset,
    filters,
    isOptionWindowVisible,
    setFilters,
    setIsOptionWindowVisible,
    handleSelectRow,
    handleToggleVisibleColumn,
    handleChangeData,
    handleSort,
    handleFilterBy,
    handleResetFilters,
    handleFileGenerate,
  };
}
export default useDynamicTable;
