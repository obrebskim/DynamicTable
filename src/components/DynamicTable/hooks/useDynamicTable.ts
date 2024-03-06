import { useCallback, useEffect, useState } from 'react';
import { IndexableIDTExtend, TDTColumnDefs, TDTSortDirection } from '../types/types';

const createFilters = <T extends { id: string | number }>(config: TDTColumnDefs<T>) => {
  const sortable = config.columns.filter((column) => column.interactions?.sortable);
  const filters: Record<string, string> = {};
  sortable.forEach((column) => {
    filters[column.propertyName] = '';
  });
  return filters;
};

type Extendable<T> = T & IndexableIDTExtend;

function useDynamicTable<T extends { id: string | number }>({
  configuration,
  data,
  onRowSelect,
}: {
  data: T[];
  configuration: TDTColumnDefs<T>;
  onRowSelect?: (id: string | number) => void;
}) {
  // STATE
  const [dataset, setDataset] = useState<Extendable<T>[]>(
    data.map((row) => ({ ...row, id: row.id, checked: false })),
  );
  const [columns, setColumns] = useState(
    configuration.columns.map((column) => ({
      ...column,
      visible: column.visible !== undefined ? column.visible : true,
    })),
  );
  const [filteredDataset, setFilteredDataset] = useState(dataset);
  const [filters, setFilters] = useState(createFilters(configuration));
  const [isOptionWindowVisible, setIsOptionWindowVisible] = useState(false);

  // EFFECTS
  useEffect(() => {
    let filtered = structuredClone(dataset);
    Object.keys(filters).forEach((key) => {
      filtered = filtered.filter((filter) =>
        (filter[key] + '').toLowerCase().includes(filters[key as string].toLowerCase()),
      );
    });
    setFilteredDataset(filtered);
  }, [dataset, filters]);

  //FUNCTIONS
  const handleSelectRow = useCallback((id: number | string) => {
    if (configuration.options?.selectableRow) {
      setDataset((prev) =>
        prev.map((row) => (row.id === id ? { ...row, checked: true } : { ...row, checked: false })),
      );
    }
    if (onRowSelect) {
      onRowSelect(id);
    }
  }, []);

  const handleToggleVisibleColumn = useCallback((id: string) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.propertyName === id ? { ...column, visible: !column.visible } : { ...column },
      ),
    );
  }, []);

  const handleChangeData = useCallback(
    (id: string | number, propertyName: string, value: boolean | string | number) => {
      setDataset((prev) =>
        prev.map((row) => {
          if (row.id === id) return { ...row, [propertyName]: value };
          else {
            return { ...row };
          }
        }),
      );
    },
    [],
  );

  const handleFilterBy = useCallback((propertyName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [propertyName]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(createFilters(configuration));
  }, []);

  const handleSort = useCallback((direction: TDTSortDirection, propertyName: string) => {
    setDataset((prev) =>
      [...prev].sort((a, b) => {
        if (direction === 'asc') {
          if (a[propertyName] > b[propertyName]) return 1;
          if (a[propertyName] < b[propertyName]) return -1;
          return 0;
        } else {
          if (a[propertyName] < b[propertyName]) return 1;
          if (a[propertyName] > b[propertyName]) return -1;
          return 0;
        }
      }),
    );
  }, []);

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
  };
}
export default useDynamicTable;
