import { render, fireEvent } from '@testing-library/react';
import useOnClickOutside from '../useOnClickOutside';
import { describe, expect, it } from 'vitest';
import { useRef } from 'react';

describe('useOnClickOutside', () => {
  it('it should set isOpen to false', () => {
    const TestComponent = () => {
      const divRef = useRef<HTMLDivElement>(null);
      const { isOpen, setIsOpen } = useOnClickOutside(divRef);
      return (
        <div>
          <div ref={divRef}>Ref element</div>
          {isOpen && <div>Popup opened</div>}
          <button onClick={() => setIsOpen(true)}>Open popup</button>
        </div>
      );
    };

    const { getByText, queryByText } = render(<TestComponent />);
    fireEvent.click(getByText('Open popup'));
    expect(queryByText('Popup opened')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(queryByText('Popup opened')).not.toBeInTheDocument();
  });
});
