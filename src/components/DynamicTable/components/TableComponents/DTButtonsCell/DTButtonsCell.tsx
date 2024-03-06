import style from './DTButtonSCell.module.css';

type Props = { children: JSX.Element | JSX.Element[] };

const DTButtonsCell = ({ children }: Props) => {
  return (
    <td className={style.td}>
      <div>{children}</div>
    </td>
  );
};

export default DTButtonsCell;
