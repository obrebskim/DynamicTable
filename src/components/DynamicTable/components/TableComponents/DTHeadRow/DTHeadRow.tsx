import style from './DTHeadRow.module.css';

type Props = { children: JSX.Element | JSX.Element[] };

const DTHeadRow = ({ children }: Props) => {
  return (
    <thead className={style.thead}>
      <tr className={style.tr}>{children}</tr>
    </thead>
  );
};

export default DTHeadRow;
