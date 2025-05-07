import React, { useEffect, useState } from 'react';

function PhonebookApp() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    phone_no: '',
    status: 'Active',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // 控制按钮状态

  const apiBase = 'http://localhost/codelgniter/phonebook-system/index.php/PhonebookController/';

  const fetchContacts = () => {
    fetch(apiBase)
      .then((res) => res.json())
      .then((data) => setContacts(data));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showMessage = (text) => {
    setMessage(text);
   setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 简单前端验证
    if (!formData.name || !formData.phone_no || !formData.status) {
      showMessage('All fields are required.');
      return;
    }
    if (!isValidPhoneNumber(formData.phone_no)) {
        showMessage('Invalid phone number format.');
        return;
      }

    function isValidPhoneNumber(phone) {       
        const regex = /^(\+?6?01)[02-46-9]-?[0-9]{7}$|^(\+?6?01)[1]-?[0-9]{8}$/;
        return regex.test(phone);
      }
      

    setLoading(true); // 锁定按钮
    const isEdit = formData.id !== null;
    const url = isEdit ? `${apiBase}/update/${formData.id}` : `${apiBase}/store`;
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'inserted') {
          showMessage('Contact added successfully.');
        } else if (data.status === 'updated') {
          showMessage('Contact updated successfully.');
        } else {
          showMessage('Operation failed.');
        }

        setFormData({ id: null, name: '', phone_no: '', status: 'Active' });
        fetchContacts();
      })
      .catch(() => showMessage('Network error.'))
      .finally(() => setLoading(false)); // 恢复按钮
  };

  const handleDelete = (id) => {
    if (!window.confirm('Confirm delete?')) return;

    setLoading(true);

    fetch(`${apiBase}/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'deleted') {
          showMessage('Contact deleted.');
          fetchContacts();
        } else {
          showMessage('Failed to delete.');
        }
      })
      .catch(() => showMessage('Network error.'))
      .finally(() => setLoading(false));
  };

  const handleEdit = (contact) => {
    setFormData({
      id: contact.id,
      name: contact.name,
      phone_no: contact.phone_no,
      status: contact.status,
    });
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
        className="form-control"
        name="phone_no"
        value={formData.phone_no}
        onChange={handleChange}
        required
      />
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
          onClick={() =>
            setFormData({ id: null, name: '', phone_no: '', status: 'Active' })
          }
        >
          Cancel
        </button>
      )}
    </div>
  </form>
  
  );
}

export default PhonebookApp;
