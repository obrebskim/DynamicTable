import { render, fireEvent, screen } from '@testing-library/react';
import DTCell from './DTCell';

describe('DTCell', () => {
  it('renders without crashing', () => {
    render(<DTCell id={1} propertyName='name' value='John Doe' />);
  });

  it('displays the correct value', () => {
    const { getByText } = render(<DTCell id={1} propertyName='name' value='John Doe' />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('calls the onDataChange callback when value is changed', async () => {
    const onDataChange = vi.fn();
    render(
      <DTCell id={1} propertyName='name' value='John Doe' editable onDataChange={onDataChange} />,
    );
    const editBtn = screen.getByTestId('edit-button');
    fireEvent.click(editBtn);
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onDataChange).toHaveBeenCalledWith(1, 'name', 'Jane Doe');
  });

  it('calls the onRowSelect callback when cell is clicked', () => {
    const onRowSelect = vi.fn();
    render(
      <DTCell id={1} propertyName='name' value='John Doe' pointer onRowSelect={onRowSelect} />,
    );
    const idCell = screen.getByText(/john doe/i);
    fireEvent.click(idCell);
    expect(onRowSelect).toHaveBeenCalled();
  });
});
