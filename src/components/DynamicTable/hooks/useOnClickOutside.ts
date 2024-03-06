import { RefObject, useEffect, useState } from 'react';

type TRef = HTMLDivElement | HTMLTableCellElement | HTMLInputElement | HTMLUListElement;

const useOnClickOutside = (ref: RefObject<TRef>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return { ref, isOpen, setIsOpen };
};

export default useOnClickOutside;
