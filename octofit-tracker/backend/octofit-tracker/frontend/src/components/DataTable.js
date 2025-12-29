import React, { useEffect, useState } from 'react';
import ModalForm from './ModalForm';

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

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null);

  const formFields = columns.filter(c => c.key !== 'id').map(c => {
    // guess field type
    const type = c.type || (c.key === 'duration' || c.key === 'score' ? 'number' : (c.key === 'description' ? 'textarea' : 'text'));
    return { key: c.key, label: c.label, type };
  });

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      const res = await fetch(`${endpoint}${item.id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchData();
    } catch (err) {
      alert('Delete failed: ' + (err.message || ''));
    }
  };

  const handleSubmitForm = async (values) => {
    try {
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      const url = modalMode === 'add' ? endpoint : `${endpoint}${selectedItem.id}/`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Save failed: ' + (err.message || ''));
    }
  };

  return (
    <div className="card my-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={handleAddClick}>Add</button>
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
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(item)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <ModalForm show={showModal} title={modalMode === 'add' ? `Add ${title}` : `Edit ${title}`} fields={formFields} initialValues={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleSubmitForm} submitLabel={modalMode === 'add' ? 'Create' : 'Save'} />
      )}
    </div>
  );
}
