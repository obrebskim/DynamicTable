import React, { ComponentPropsWithRef } from 'react';
import style from './DTButton.module.css';

type Props = ComponentPropsWithRef<'button'> & { label: string };

const DTButton = React.forwardRef<HTMLButtonElement, Props>(({ label, ...props }, ref) => {
  return (
    <button className={style.button} {...props} ref={ref}>
      {label}
    </button>
  );
});

export default DTButton;
