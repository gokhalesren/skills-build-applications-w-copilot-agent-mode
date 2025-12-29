import React from 'react';
import DataTable from './DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
];

export default function Users() {
  return <DataTable title="Users" endpoint="/api/users/" columns={columns} />;
}
