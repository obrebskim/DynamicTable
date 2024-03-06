import React, { ComponentPropsWithRef } from "react";
import style from './DTEditInput.module.css'

const DTEditInput = React.forwardRef<HTMLInputElement,ComponentPropsWithRef<'input'>>(({...props}, ref) => {
  return (
    <input className={style.input} {...props} ref={ref}/>
  )
})

export default DTEditInput