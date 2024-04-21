import React, { useRef, useState } from "react";
import clsx from "clsx";
import { TDTCellType, TDTId } from "../../../types/types";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import style from "./DTCell.module.css";
import DTCheckbox from "../../Buttons/DTCheckbox/DTCheckbox";
import DTEditInput from "../../DTEditInput/DTEditInput";
import DTEditIcon from "../../Icons/DTEdit.icon";
import DTDropdown from "../../DTDropdown/DTDropdown";

type Props<T> = {
  value: string | number | boolean;
  bold?: boolean;
  separator?: boolean;
  pointer?: boolean;
  editable?: boolean;
  id: string | number;
  propertyName: keyof T;
  type?: TDTCellType;
  options?: { label: string; value: string | number }[];
  maxWidth?: string | number;
  onDataChange?: (
    id: TDTId,
    propertyName: keyof T,
    value: boolean | string | number
  ) => void;
  onRowSelect?: () => void;
};

const DTCell = <T,>({
  id,
  propertyName,
  value,
  bold,
  editable,
  onDataChange,
  onRowSelect,
  pointer,
  separator,
  type,
  options = [],
  maxWidth,
}: Props<T>) => {
  const [editedValue, setEditionValue] = useState<string | number | boolean>(
    false
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, setIsOpen } = useOnClickOutside(inputRef);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { isOpen: isDropdown, setIsOpen: setIsDropdown } =
    useOnClickOutside(dropdownRef);

  const handleEditionOpen = async () => {
    if (type === "dropdown") {
      setIsDropdown(true);
    } else {
      await setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Escape") {
      setIsOpen(false);
    }
    if (e.code === "Enter") {
      if (onDataChange) {
        onDataChange(
          id,
          propertyName,
          typeof value === "number" ? Number(editedValue) : editedValue
        );
      }
      setIsOpen(false);
    }
  };

  const handleDropdownChange = (value: string | number) => {
    if (onDataChange) {
      onDataChange(id, propertyName, value);
      setIsDropdown(false);
    }
  };

  return (
    <td
      onClick={onRowSelect}
      style={{ maxWidth: maxWidth ? maxWidth : "auto" }}
      className={clsx(
        style.cell,
        separator && style.separator,
        (propertyName === "id" || pointer) && onRowSelect && style.cursor
      )}
    >
      <div className={style["cell-wrapper"]}>
        {typeof value === "boolean" ? (
          editable ? (
            <DTCheckbox
              mode="boolean"
              checked={value}
              onChange={() =>
                onDataChange
                  ? onDataChange(id, propertyName, !value)
                  : () => null
              }
            />
          ) : (
            <DTCheckbox mode="boolean" checked={value} readOnly />
          )
        ) : (
          <p
            className={clsx(
              typeof value === "number" && "number",
              bold && "bold",
              pointer && style.cursor
            )}
          >
            {value}
          </p>
        )}
        {editable && typeof value !== "boolean" && (
          <DTEditIcon
            data-testid="edit-button"
            className={style.icon}
            onClick={handleEditionOpen}
          />
        )}
      </div>
      {isDropdown && type === "dropdown" && (
        <DTDropdown
          ref={dropdownRef}
          onChange={handleDropdownChange}
          options={options}
        />
      )}
      {isOpen && typeof value !== "boolean" && type !== "dropdown" && (
        <form>
          <DTEditInput
            type={type === "date" ? "date" : typeof value}
            ref={inputRef}
            defaultValue={type === "date" ? value : undefined}
            placeholder={value.toString()}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setEditionValue(e.target.value)}
          />
        </form>
      )}
    </td>
  );
};

export default DTCell;
