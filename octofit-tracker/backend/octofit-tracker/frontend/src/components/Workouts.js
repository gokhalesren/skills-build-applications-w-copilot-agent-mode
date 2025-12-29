import React from 'react';
import DataTable from './DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
];

export default function Workouts() {
  return <DataTable title="Workouts" endpoint="/api/workouts/" columns={columns} />;
}
