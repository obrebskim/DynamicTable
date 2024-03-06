import { ComponentPropsWithoutRef } from 'react';

const DTFilterIcon = ({ ...props }: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 16 16'
      height='200px'
      width='200px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z'></path>
    </svg>
  );
};

export default DTFilterIcon;
