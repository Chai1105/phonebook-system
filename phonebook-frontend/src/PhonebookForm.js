import React from 'react';


const PhonebookForm = ({ formData, setFormData, handleSubmit, loading, phoneError }) => {
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setFormData({ id: null, name: '', phone_no: '', status: 'Active' });
  };

 
  return (
    
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone No</label>
        <input
          type="text"
          className={`form-control ${phoneError ? 'is-invalid' : ''}`}
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
          required
       />
        {phoneError && <div className="invalid-feedback">{phoneError}</div>}
      </div>


      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" type="submit" disabled={loading}>
          {formData.id === null ? 'Add' : 'Update'}
        </button>
        {formData.id !== null && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelEdit}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PhonebookForm;
