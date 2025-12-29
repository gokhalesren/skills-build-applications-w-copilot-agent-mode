import React from 'react';
import DataTable from './DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'User (ID)' },
  { key: 'type', label: 'Type' },
  { key: 'duration', label: 'Duration (min)' },
];

export default function Activities() {
  return <DataTable title="Activities" endpoint="/api/activities/" columns={columns} />;
}
