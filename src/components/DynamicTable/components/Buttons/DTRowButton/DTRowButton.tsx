import React, { ComponentPropsWithRef } from 'react'
import style from './DTRowButton.module.css'
import clsx from 'clsx';

type Props = ComponentPropsWithRef<'button'> & {label:  string | JSX.Element};

const DTRowButton = React.forwardRef<HTMLButtonElement, Props>(({label, ...props }, ref) => {
  return (
    <button className={clsx(style.button, React.isValidElement(label) && style.icon)} {...props} ref={ref}>{label}</button>
  )
})

export default DTRowButton