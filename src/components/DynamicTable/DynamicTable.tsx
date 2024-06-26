import useDynamicTable from "./hooks/useDynamicTable";
import { TDTConfiguration } from "./types/types";
import style from "./DynamicTable.module.css";
import {
  DTBody,
  DTButton,
  DTButtonWrapper,
  DTButtonsCell,
  DTCell,
  DTFileIcon,
  DTHeadCell,
  DTHeadRow,
  DTLoader,
  DTOptionButton,
  DTOptionWindow,
  DTResetIcon,
  DTRow,
  DTRowButton,
  DTSettingsIcon,
  DTTable,
} from "./components";

function DynamicTable<T extends { id: string | number }>({
  configuration,
  data,
  maxHeight = "100%",
  maxWidth = "100%",
  onRowSelect,
  onFileGenerate,
  loading,
}: {
  data: T[];
  maxWidth?: string | number;
  maxHeight?: string | number;
  configuration: TDTConfiguration<T>;
  onRowSelect?: (id: string | number) => void;
  onFileGenerate?: (data: T[]) => void;
  loading?: boolean;
}) {
  const {
    columns,
    dataset,
    filteredDataset,
    filters,
    handleChangeData,
    handleFilterBy,
    handleResetFilters,
    handleSelectRow,
    handleSort,
    handleToggleVisibleColumn,
    isOptionWindowVisible,
    setIsOptionWindowVisible,
    handleFileGenerate,
  } = useDynamicTable({ data, configuration, onRowSelect, onFileGenerate });

  return (
    <div
      style={{ maxHeight, maxWidth }}
      className={style["dynamic-table-wrapper"]}
    >
      <DTButtonWrapper>
        <>
          {Object.values(filters).some((filter) => filter !== "") && (
            <DTOptionButton
              label={<DTResetIcon />}
              title="Reset filter"
              style={{
                backgroundColor: "var(--red)",
                borderColor: "var(--red)",
              }}
              onClick={handleResetFilters}
              data-testid="reset-button"
              disabled={loading}
            />
          )}
        </>
        <DTOptionButton
          title="Options"
          label={<DTSettingsIcon />}
          onClick={() => setIsOptionWindowVisible((prev) => !prev)}
          data-testid="option-button"
          disabled={loading}
        />
        <>
          {onFileGenerate && (
            <DTOptionButton
              title="Generate a file"
              label={<DTFileIcon />}
              disabled={loading}
              onClick={handleFileGenerate}
            />
          )}
        </>
      </DTButtonWrapper>
      <DTTable>
        <DTHeadRow>
          <>
            {columns
              .filter((column) => column.visible)
              .map((th) => (
                <DTHeadCell
                  key={th.propertyName.toString()}
                  label={th.label}
                  interactive={th.interactions?.sortable}
                  propertyName={th.propertyName}
                  filterValue={filters[th.propertyName]}
                  onFilter={handleFilterBy}
                  onSort={handleSort}
                  type={th.type}
                />
              ))}
            {configuration.options?.rowButtons && (
              <DTHeadCell
                filterValue=""
                label=""
                onSort={() => null}
                onFilter={() => null}
                propertyName=""
              />
            )}
          </>
        </DTHeadRow>
        <DTBody>
          {filteredDataset.map((tr) => (
            <DTRow key={tr.id} selected={tr.checked}>
              <>
                {columns
                  .filter((column) => column.visible)
                  .map((column) => column.propertyName)
                  .map((key) => (
                    <DTCell<T>
                      key={key as string}
                      id={tr.id}
                      propertyName={key}
                      value={tr[key]}
                      maxWidth={
                        configuration.columns.find(
                          (column) => column.propertyName === key
                        )?.maxWidth || "auto"
                      }
                      bold={
                        key ===
                        (configuration.options?.selectablePropertyName
                          ? configuration.options?.selectablePropertyName
                          : "id")
                      }
                      editable={
                        configuration.columns.find(
                          (column) => column.propertyName === key
                        )?.interactions?.editable
                      }
                      onDataChange={handleChangeData}
                      onRowSelect={
                        key ===
                        (configuration.options?.selectablePropertyName
                          ? configuration.options?.selectablePropertyName
                          : "id")
                          ? () => handleSelectRow(tr.id)
                          : undefined
                      }
                      pointer={
                        key ===
                        (configuration.options?.selectablePropertyName
                          ? configuration.options?.selectablePropertyName
                          : "id")
                      }
                      separator={configuration.options?.rowSeparator}
                      type={
                        configuration.columns.find(
                          (column) => column.propertyName === key
                        )?.type
                      }
                      options={
                        configuration.columns.find(
                          (column) => column.propertyName === key
                        )?.options
                      }
                    />
                  ))}
                {configuration.options?.rowButtons && (
                  <DTButtonsCell>
                    {configuration.options.rowButtons.map((button, index) => (
                      <DTRowButton
                        label={button.label}
                        title={button.title}
                        key={index}
                        style={{
                          borderColor: button.color,
                          color: button.color,
                        }}
                        onClick={() => button.fn(tr)}
                      />
                    ))}
                  </DTButtonsCell>
                )}
              </>
            </DTRow>
          ))}
        </DTBody>
      </DTTable>
      {configuration.options?.buttons && (
        <DTButtonWrapper>
          {configuration.options?.buttons?.map((button, index) => (
            <DTButton
              label={button.label}
              title={button.title}
              key={index}
              style={{
                borderColor: button.color,
                backgroundColor: button.color,
              }}
              onClick={() => button.fn(dataset)}
              disabled={dataset.length === 0 || loading}
            />
          ))}
        </DTButtonWrapper>
      )}
      {isOptionWindowVisible && (
        <DTOptionWindow
          closeWindow={() => setIsOptionWindowVisible(false)}
          columns={columns}
          toggleColumnVisibility={handleToggleVisibleColumn}
        />
      )}
      {loading && (
        <DTLoader withButtons={configuration.options?.buttons !== undefined} />
      )}
    </div>
  );
}

export default DynamicTable;
