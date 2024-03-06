import { act, fireEvent, render, screen } from '@testing-library/react';
import DynamicTable from '../DynamicTable';
import { TDTColumnDefs } from '../types/types';
import userEvent from '@testing-library/user-event';

describe('DynamicTable', () => {
  type TData = { id: number; name: string; age: number; isActive: boolean };

  const onButtonClick = vi.fn();

  const data: TData[] = [
    { id: 1, age: 60, isActive: false, name: 'Patryk' },
    { id: 2, age: 18, isActive: true, name: 'Mateusz' },
  ];

  const configuration: TDTColumnDefs<TData> = {
    columns: [
      { label: 'Id', propertyName: 'id' },
      { label: 'Name', propertyName: 'name', interactions: { editable: true, sortable: true } },
      { label: 'Age', propertyName: 'age' },
      { label: 'Active', propertyName: 'isActive' },
    ],
    options: {
      rowSeparator: true,
      selectableRow: true,
      buttons: [
        {
          label: 'Send',
          fn: (row: TData[]) => {
            onButtonClick(row);
          },
          title: 'Send',
          color: 'pink',
        },
      ],
      rowButtons: [{ label: 'Edit', title: 'Edit', fn: () => {} }],
    },
  };

  it('renders table rows with correct data', () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const nameCell1 = screen.getByText('Patryk');
    const ageCell1 = screen.getByText('60');
    const nameCell2 = screen.getByText('Mateusz');
    const ageCell2 = screen.getByText('18');

    expect(nameCell1).toBeInTheDocument();
    expect(ageCell1).toBeInTheDocument();
    expect(nameCell2).toBeInTheDocument();
    expect(ageCell2).toBeInTheDocument();
  });

  it('calls onRowSelect when a row is clicked', () => {
    const onRowSelect = vi.fn();

    render(<DynamicTable data={data} configuration={configuration} onRowSelect={onRowSelect} />);

    const row1 = screen.getByText('1');
    const row2 = screen.getByText('2');

    row1?.click();
    row2?.click();

    expect(onRowSelect).toHaveBeenCalledTimes(2);
    expect(onRowSelect).toHaveBeenCalledWith(1);
    expect(onRowSelect).toHaveBeenCalledWith(2);
  });

  it('calls onButtonClick when a button is clicked', () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const button = screen.getByText('Send');
    button?.click();

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('changes value of a editable cell', async () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const editBtn = screen.getAllByTestId('edit-button')[0];
    fireEvent.click(editBtn);
    const input = await screen.findByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Jane Doe' } });
      await userEvent.type(input, '{enter}');
    });
    expect(screen.queryByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/Patryk/)).not.toBeInTheDocument();
  });

  it('renders only one filter icon', () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const filterIcons = screen.getAllByTestId('filter-icon');

    expect(filterIcons.length).toBe(1);
  });

  it('renders only rows that matches filter', async () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);

    const input = screen.getByPlaceholderText(/filter by name/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
      await userEvent.type(input, '{enter}');
    });
    expect(screen.queryByText(/Patryk/)).not.toBeInTheDocument();
  });

  it('allows to disable visible columns', () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const optionButton = screen.getByTestId('option-button');
    fireEvent.click(optionButton);
    const checkboxName = screen.getByTestId('name');
    fireEvent.click(checkboxName);
    expect(screen.queryByText(/Patryk/i)).not.toBeInTheDocument();
  });

  it('resets filters when reset button is clicked', async () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const filterIcon = screen.getByTestId('filter-icon');
    fireEvent.click(filterIcon);

    const input = screen.getByPlaceholderText(/filter by name/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
      await userEvent.type(input, '{enter}');
    });

    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    expect(screen.queryByText(/Patryk/i)).toBeInTheDocument();
  });

  it('renders row buttons', () => {
    render(<DynamicTable data={data} configuration={configuration} />);

    const editButton = screen.getAllByText(/edit/i);
    expect(editButton.length).toBe(2);
  });
});
