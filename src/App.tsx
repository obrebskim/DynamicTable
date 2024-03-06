import DynamicTable from './components/DynamicTable/DynamicTable';
import { TDTColumnDefs } from './components/DynamicTable/types/types';

type TData = { id: number; name: string; age: number; isActive: boolean };

const data: TData[] = [
  { id: 1, age: 60, isActive: false, name: 'Patryk' },
  { id: 2, age: 18, isActive: true, name: 'Mateusz' },
  { id: 3, age: 23, isActive: false, name: 'Tomek' },
  { id: 4, age: 32, isActive: true, name: 'Maciek' },
];

const config: TDTColumnDefs<TData> = {
  columns: [
    { label: 'Id', propertyName: 'id' },
    { label: 'Name', propertyName: 'name', interactions: { editable: true, sortable: true } },
    {
      label: 'Age',
      propertyName: 'age',
      type: 'dropdown',
      interactions: { editable: true },
      options: [
        { label: '10', value: 10 },
        { label: '29', value: 29 },
      ],
    },
    { label: 'Active', propertyName: 'isActive' },
  ],
  options: {
    rowSeparator: true,
    selectableRow: true,
    buttons: [
      {
        label: 'Send',
        fn: (row: TData[]) => {
          console.log(row);
        },
        title: 'Send',
      },
    ],
  },
};

function App() {
  return (
    <>
      <DynamicTable configuration={config} data={data} />
    </>
  );
}

export default App;
