import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import style from './DTCheckbox.module.css';

type Props = {
  mode?: 'on/off' | 'boolean';
  width?: string | number;
  testId?: string;
};

const DTCheckbox = ({
  mode = 'on/off',
  width = '4rem',
  testId,
  ...res
}: Props & ComponentPropsWithoutRef<'input'>) => {
  return (
    <label className={style.checkbox} style={{ width }}>
      <input className={style.input} type='checkbox' data-testid={testId} {...res} />
      <div className={clsx(style.shadow, mode === 'boolean' && style['always-on'])}></div>
      <div className={clsx(style.round, mode === 'boolean' && style['always-on'])}></div>
    </label>
  );
};

export default DTCheckbox;
