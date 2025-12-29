import React from 'react';
import DataTable from './DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'User (ID)' },
  { key: 'score', label: 'Score' },
];

export default function Leaderboards() {
  return <DataTable title="Leaderboards" endpoint="/api/leaderboards/" columns={columns} />;
}
