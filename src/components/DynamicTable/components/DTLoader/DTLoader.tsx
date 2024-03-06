import style from "./DTLoader.module.css";

const DTLoader = () => {
  return (
    <div className={style.wrapper}>
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
