import DTOptionWindow from './DTOptionWindow';
import { fireEvent, render, screen } from '@testing-library/react';

describe('DTOptionWindow', () => {
  const columns = [
    { id: 'column1', label: 'Column 1', visible: true, propertyName: 'one' },
    { id: 'column2', label: 'Column 2', visible: false, propertyName: 'two' },
  ];

  const toggleColumnVisibility = vi.fn();
  const closeWindow = vi.fn();

  beforeEach(() => {
    render(
      <DTOptionWindow
        columns={columns}
        toggleColumnVisibility={toggleColumnVisibility}
        closeWindow={closeWindow}
      />,
    );
  });

  it('renders the option window', () => {
    expect(screen.getByText(/columns/i)).toBeInTheDocument();
  });

  it('renders the column checkboxes', () => {
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();
  });

  it('toggles column visibility when checkbox is clicked', () => {
    fireEvent.click(screen.getByTestId('one'));
    expect(toggleColumnVisibility).toHaveBeenCalled();
  });

  it('calls closeWindow when close button is clicked', () => {
    fireEvent.click(screen.getByTestId('close-button'));
    expect(closeWindow).toHaveBeenCalled();
  });
});
