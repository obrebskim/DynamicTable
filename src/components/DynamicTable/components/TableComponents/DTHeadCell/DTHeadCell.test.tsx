import { fireEvent, render, screen } from '@testing-library/react';
import DTHeadCell from './DTHeadCell';

describe('DTHeadCell', () => {
  const onFilter = vi.fn();
  const onSort = vi.fn();
  it('renders the cell with the correct label', () => {
    const label = 'Name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName=''
        label={label}
      />,
    );
    const cell = screen.getByText(label);
    expect(cell).toBeInTheDocument();
  });

  it('opens filter window when the filter icon is clicked', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  it('closes filter window when the close icon is clicked', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);
    expect(screen.queryByText(/reset/i)).not.toBeVisible();
  });

  it('calls onFilter when the reset button is clicked', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue='test'
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    expect(onFilter).toHaveBeenCalledWith(propertyName, '');
  });

  it('calls onSort with asc when the asc button is clicked', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    const ascButton = screen.getByTestId('button-asc');
    fireEvent.click(ascButton);
    expect(onSort).toHaveBeenCalled();
  });

  it('calls onSort with desc when the desc button is clicked', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    const descButton = screen.getByTestId('button-desc');
    fireEvent.click(descButton);
    expect(onSort).toHaveBeenCalled();
  });

  it('calls onFilter when the input value changes', () => {
    const propertyName = 'name';
    render(
      <DTHeadCell
        filterValue=''
        onFilter={onFilter}
        onSort={onSort}
        propertyName={propertyName}
        label='Name'
        interactive
      />,
    );
    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);
    const input = screen.getByPlaceholderText(/filter by name/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onFilter).toHaveBeenCalled();
  });
});
