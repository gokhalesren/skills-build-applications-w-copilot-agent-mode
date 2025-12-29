import React, { useEffect, useState } from 'react';

export default function ModalForm({ show, title, fields, initialValues = {}, onClose, onSubmit, submitLabel = 'Save' }) {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({ ...fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {}), ...initialValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, show]);

  if (!show) return null;

  const handleChange = (key, v) => setValues(prev => ({ ...prev, [key]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {fields.map(field => (
                <div className="mb-3" key={field.key}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea className="form-control" value={values[field.key] || ''} onChange={e => handleChange(field.key, e.target.value)} />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      className="form-control"
                      value={values[field.key] || ''}
                      onChange={e => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{submitLabel}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  );
}
