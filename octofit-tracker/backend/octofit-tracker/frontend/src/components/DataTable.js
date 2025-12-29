import React, { useEffect, useState } from 'react';

export default function DataTable({ title, endpoint, columns }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // If API returns {results: [...]}, support DRF pagination; otherwise assume array
      const items = Array.isArray(json) ? json : json.results || [];
      setData(items);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return (
    <div className="card my-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div>
          <button className="btn btn-primary btn-sm me-2">Add</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={fetchData}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {loading && <div className="text-center py-4">Loading... <div className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true" /></div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map(col => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center text-muted">No data</td>
                  </tr>
                )}
                {data.map(item => (
                  <tr key={item.id || JSON.stringify(item)}>
                    {columns.map(col => (
                      <td key={col.key}>{col.render ? col.render(item) : (item[col.key] ?? '')}</td>
                    ))}
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
