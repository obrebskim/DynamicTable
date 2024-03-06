import { render, fireEvent } from '@testing-library/react';
import DTRowButton from './DTRowButton';

describe('DTRowButton', () => {
  it('renders the button with the provided label', () => {
    const label = 'Click me';
    const { getByText } = render(<DTRowButton label={label} />);
    const button = getByText(label);
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClick = vi.fn();
    const { getByText } = render(<DTRowButton label='Click me' onClick={onClick} />);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies additional CSS classes when provided', () => {
    const { container } = render(<DTRowButton label='Click me' className='custom-class' />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});
