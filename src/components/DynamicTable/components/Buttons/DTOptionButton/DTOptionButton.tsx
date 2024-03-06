import React, { ComponentPropsWithRef } from 'react';
import style from './DTOptionButton.module.css';

type Props = ComponentPropsWithRef<'button'> & { label: JSX.Element };

const DTOptionButton = React.forwardRef<HTMLButtonElement, Props>(({ label, ...props }, ref) => {
  return (
    <button role='button' className={style.button} {...props} ref={ref}>
      {label}
    </button>
  );
});

export default DTOptionButton;
