import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { TDTCellType, TDTSortDirection } from '../../../types/types';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import style from './DTHeadCell.module.css';
import DTFilterIcon from '../../Icons/DTFilter.icon';
import DTSortAscIcon from '../../Icons/DTSortAsc.icon';
import DTSortDescIcon from '../../Icons/DTSortDesc.icon';
import DTCloseIcon from '../../Icons/DTClose.icon';

type Props = {
  label: string;
  interactive?: boolean;
  propertyName: string;
  filterValue: string;
  type?: TDTCellType;
  onSort: (direction: TDTSortDirection, propertyName: string) => void;
  onFilter: (propertyName: string, value: string) => void;
};

const DTHeadCell = ({
  label,
  filterValue,
  onFilter,
  onSort,
  propertyName,
  interactive = false,
  type,
}: Props) => {
  const [localFilterValue, setLocalFilterValue] = useState(filterValue);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, setIsOpen } = useOnClickOutside(cellRef);

  const handleSort = (direction: TDTSortDirection) => {
    onSort(direction, propertyName);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onFilter(propertyName, localFilterValue);
      setIsOpen(false);
    }
    if (e.code === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleToggleFilters = async () => {
    await setIsOpen((prev) => !prev);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    onFilter(propertyName, '');
    setLocalFilterValue('');
    setIsOpen(false);
  };

  return (
    <th className={style.th} ref={cellRef}>
      <div className={style['th-wrapper']}>
        {label}
        {interactive &&
          (!isOpen ? (
            <DTFilterIcon
              data-testid='filter-icon'
              className={style.icon}
              onClick={handleToggleFilters}
            />
          ) : (
            <DTCloseIcon
              data-testid='close-icon'
              className={style.icon}
              onClick={handleToggleFilters}
            />
          ))}
      </div>
      {interactive && (
        <dialog open={isOpen} className={style['option-window']}>
          <div className={style.wrapper}>
            <input
              type={type === 'date' ? 'date' : 'text'}
              className={style['filter-input']}
              placeholder={`filter by ${label}`}
              onChange={(e) => setLocalFilterValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={localFilterValue}
              ref={inputRef}
            />
            <button
              data-testid='button-asc'
              className={style.sort}
              onClick={() => handleSort('asc')}
            >
              <DTSortAscIcon className={style.icon} />
            </button>
            <button
              data-testid='button-desc'
              className={style.sort}
              onClick={() => handleSort('desc')}
            >
              <DTSortDescIcon className={style.icon} />
            </button>
            <button className={clsx(style.sort, style.reset)} onClick={handleReset}>
              Reset
            </button>
          </div>
        </dialog>
      )}
    </th>
  );
};

export default DTHeadCell;
