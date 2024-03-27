import { convertHeightValue } from "../../../utils/convertHeightValue";
import style from "./DTTable.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
  maxHeight?: string | number;
  maxWidth?: string | number;
};

const DTTable = ({ children, maxHeight, maxWidth }: Props) => {
  return (
    <div
      className={style.wrapper}
      style={{
        maxHeight: maxHeight
          ? `calc(${convertHeightValue(maxHeight)}px - 86px)`
          : undefined,
        maxWidth,
      }}
    >
      <table className={style["dynamic-table"]}>{children}</table>
    </div>
  );
};

export default DTTable;
