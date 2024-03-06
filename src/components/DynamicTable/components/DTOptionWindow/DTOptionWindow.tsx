import { TDTColumn } from '../../types/types';
import style from './DTOptionWindow.module.css';
import DTCheckbox from '../Buttons/DTCheckbox/DTCheckbox';
import DTOptionButton from '../Buttons/DTOptionButton/DTOptionButton';
import DTCloseIcon from '../Icons/DTClose.icon';

type Props = {
  columns: TDTColumn[];
  toggleColumnVisibility: (id: string) => void;
  closeWindow: () => void;
};

const DTOptionWindow = ({ closeWindow, columns, toggleColumnVisibility }: Props) => {
  return (
    <dialog className={style.dialog}>
      <p className={style.heading}>Columns</p>
      <ul className={style.ul}>
        {columns.map((column) => (
          <li className={style['option-item']} key={column.propertyName}>
            <DTCheckbox
              mode='on/off'
              checked={column.visible}
              onChange={() => toggleColumnVisibility(column.propertyName)}
              testId={`${column.propertyName}`}
            />
            <p>{column.label}</p>
          </li>
        ))}
      </ul>
      <DTOptionButton
        className={style['close-button']}
        label={<DTCloseIcon onClick={closeWindow} />}
        data-testid='close-button'
        onClick={closeWindow}
      />
    </dialog>
  );
};

export default DTOptionWindow;
