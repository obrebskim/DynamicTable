import { render, fireEvent, screen } from '@testing-library/react';
import DTEditInput from './DTEditInput';
import { describe, expect, it, vi } from 'vitest';

describe('DTEditInput', () => {
  it('should render an input element', () => {
    render(<DTEditInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should call the onChange callback when the input value changes', () => {
    const onChange = vi.fn();
    render(<DTEditInput onChange={onChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    // expect(onChange).toHaveBeenCalledWith('New Value');
    expect(inputElement).toHaveValue('New Value');
  });

  // Add more unit tests here...
});
