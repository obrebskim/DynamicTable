import style from "./DTButtonSCell.module.css";

type Props = { children: JSX.Element | JSX.Element[] };

const DTButtonsCell = ({ children }: Props) => {
  return (
    <td className={style.td}>
      <div className={style.cell}>{children}</div>
    </td>
  );
};

export default DTButtonsCell;
