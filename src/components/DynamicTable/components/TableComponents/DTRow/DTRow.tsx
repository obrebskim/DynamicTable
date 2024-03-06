import clsx from 'clsx';
import style from './DTRow.module.css';

type Props = {children: JSX.Element | JSX.Element[], selected?: boolean}

const DTRow = ({children, selected}: Props) => {
  return (
    <tr className={clsx(style.row, selected && style.selected)}>{children}</tr>
  )
}

export default DTRow