import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DTOptionButton from './DTOptionButton';
import { describe, expect, it, vi } from 'vitest';

describe('DTOptionButton', () => {
  it('renders without crashing', () => {
    render(<DTOptionButton label={<span>Test Label</span>} />);
  });

  it('renders the label correctly', () => {
    const { getByText } = render(<DTOptionButton label={<span>Test Label</span>} />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <DTOptionButton label={<span>Test Label</span>} onClick={onClickMock} />,
    );
    fireEvent.click(getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('forwards the ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<DTOptionButton label={<span>Test Label</span>} ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
