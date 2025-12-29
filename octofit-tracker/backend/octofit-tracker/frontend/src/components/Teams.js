import React from 'react';
import DataTable from './DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
];

export default function Teams() {
  return <DataTable title="Teams" endpoint="/api/teams/" columns={columns} />;
}
