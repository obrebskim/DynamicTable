import React from 'react';
import style from './DTDropdown.module.css';

type Props = {
  options: { label: string; value: string | number }[];
  onChange: (id: string | number) => void;
};

const DTDropdown = React.forwardRef<HTMLUListElement, Props>(({ options, onChange }, ref) => {
  return (
    <ul ref={ref} className={style.dropdown}>
      {options.map((option) => (
        <li className={style.li} key={option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </li>
      ))}
    </ul>
  );
});

export default DTDropdown;
