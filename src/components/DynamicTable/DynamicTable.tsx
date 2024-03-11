import useDynamicTable from "./hooks/useDynamicTable";
import { TDTConfiguration } from "./types/types";
import style from "./DynamicTable.module.css";
import DTButtonWrapper from "./components/DTButtonWrapper/DTButtonWrapper";
import DTOptionButton from "./components/Buttons/DTOptionButton/DTOptionButton";
import DTResetIcon from "./components/Icons/DTReset.icon";
import DTSettingsIcon from "./components/Icons/DTSettings.icon";
import DTFileIcon from "./components/Icons/DTFile.icon";
import DTTable from "./components/TableComponents/DTTable/DTTable";
import DTHeadRow from "./components/TableComponents/DTHeadRow/DTHeadRow";
import DTHeadCell from "./components/TableComponents/DTHeadCell/DTHeadCell";
import DTBody from "./components/TableComponents/DTBody/DTBody";
import DTRow from "./components/TableComponents/DTRow/DTRow";
import DTCell from "./components/TableComponents/DTCell/DTCell";
import DTButtonsCell from "./components/TableComponents/DTButtonsCell/DTButtonsCell";
import DTRowButton from "./components/Buttons/DTRowButton/DTRowButton";
import DTButton from "./components/Buttons/DTButton/DTButton";
import DTOptionWindow from "./components/DTOptionWindow/DTOptionWindow";
import DTLoader from "./components/DTLoader/DTLoader";

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
      <DTTable maxHeight={maxHeight} maxWidth={maxWidth}>
        <DTHeadRow>
          <>
            {columns
              .filter((column) => column.visible)
              .map((th) => (
                <DTHeadCell
                  key={th.propertyName}
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
                    <DTCell
                      key={key}
                      id={tr.id}
                      propertyName={key}
                      value={tr[key]}
                      bold={key === "id"}
                      editable={
                        configuration.columns.find(
                          (column) => column.propertyName === key
                        )?.interactions?.editable
                      }
                      onDataChange={handleChangeData}
                      onRowSelect={
                        key === "id" ? () => handleSelectRow(tr.id) : undefined
                      }
                      pointer={key === "id"}
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
      <DTButtonWrapper>
        {configuration.options?.buttons?.map((button, index) => (
          <DTButton
            label={button.label}
            title={button.title}
            key={index}
            style={{ borderColor: button.color, backgroundColor: button.color }}
            onClick={() => button.fn(dataset)}
            disabled={dataset.length === 0 || loading}
          />
        ))}
      </DTButtonWrapper>
      {isOptionWindowVisible && (
        <DTOptionWindow
          closeWindow={() => setIsOptionWindowVisible(false)}
          columns={columns}
          toggleColumnVisibility={handleToggleVisibleColumn}
        />
      )}
      {loading && <DTLoader />}
    </div>
  );
}

export default DynamicTable;
