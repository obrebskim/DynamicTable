import style from "./DTLoader.module.css";

const DTLoader = ({ withButtons }: { withButtons: boolean }) => {
  return (
    <div
      className={`${style.wrapper} ${withButtons ? "" : style["without-buttons"]}`}
    >
      <div className={style["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DTLoader;
