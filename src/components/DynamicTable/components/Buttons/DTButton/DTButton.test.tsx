import { fireEvent, render, screen } from '@testing-library/react';
import DTButton from './DTButton';
import { describe, expect, it, vi } from 'vitest';

describe('DTButton', () => {
  it('renders without crashing', () => {
    render(<DTButton label='Test Button' />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    render(<DTButton label='Test Button' />);
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  it('calls onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<DTButton label='Test Button' onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
