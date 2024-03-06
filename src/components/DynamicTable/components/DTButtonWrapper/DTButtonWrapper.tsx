import style from './DTButtonWrapper.module.css';

type Props = { children: JSX.Element | JSX.Element[] | undefined };

const DTButtonWrapper = ({ children }: Props) => {
  return <div className={style['button-wrapper']}>{children}</div>;
};

export default DTButtonWrapper;
