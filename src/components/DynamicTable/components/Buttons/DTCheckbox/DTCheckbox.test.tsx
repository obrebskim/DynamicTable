import { render, screen, fireEvent } from '@testing-library/react';
import DTCheckbox from './DTCheckbox';
import { describe, expect, test, vi } from 'vitest';

describe('DTCheckbox', () => {
  test('renders without errors', () => {
    render(<DTCheckbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with correct mode prop', () => {
    render(<DTCheckbox mode='boolean' />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with correct width prop', () => {
    render(<DTCheckbox width='6rem' />);
    expect(screen.getByRole('checkbox').parentNode).toHaveStyle({ width: '6rem' });
  });

  test('calls onChange callback when clicked', () => {
    const onChange = vi.fn();
    render(<DTCheckbox onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
