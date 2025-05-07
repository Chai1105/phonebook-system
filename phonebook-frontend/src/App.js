import React, { useState, useEffect } from 'react';
import PhonebookForm from './PhonebookForm';
import PhonebookList from './PhonebookList';
import Swal from 'sweetalert2';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', phone_no: '', status: 'Active' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  const apiBase = 'http://localhost/codelgniter/phonebook-system/index.php/PhonebookController/';

  useEffect(() => {
    fetchData(currentPage,4);
  }, [currentPage]);


  const fetchData = async (page, limit) => {
    setLoading(true);
    
    const response = await fetch(`${apiBase}?page=${page}&limit=${limit}`);
    if (response.ok) {
      const result = await response.json();
      console.log('Fetched data:', result); // 调试查看返回的数据

      // 处理返回的数据
      setData(result.contacts); // 设置当前页的联系人数据
      setTotalContacts(result.totalContacts); // 设置总数据条数
      setTotalPages(Math.ceil(result.totalContacts / limit)); // 根据总条数和每页条数计算总页数
    } else {
      console.error('Failed to fetch data');
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
  
    setLoading(true);
  
    if (formData.id === null) {
      // Add new entry
      await fetch(`${apiBase}/store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      showMessage('Contact added successfully', 'success');
    } else {
      // Update existing entry
      await fetch(`${apiBase}/update/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      showMessage('Contact updated successfully', 'success');
    }
  
    setFormData({ id: null, name: '', phone_no: '', status: 'Active' });
    fetchData(currentPage, 4);
    setLoading(false);
  };
  

  const handleEdit = (item) => {
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setLoading(true);
      await fetch(`${apiBase}delete/${id}`, {
        method: 'DELETE',
      });
      showMessage('Contact deleted successfully', 'warning');
      fetchData(currentPage, 4);
      setLoading(false);
    }
  };
  
  
  const showMessage = (text, type = 'success') => {
    Swal.fire({
      icon: type,
      title: text,
      timer: 2000,
      showConfirmButton: false,
      position: 'top',  
      customClass: {
        popup: 'custom-popup',  
      },
    });
  };
  
  

  const isValidPhoneNumber = (phone) => {
    const regex = /^(\+?6?01)[02-46-9]-?[0-9]{7}$|^(\+?6?01)[1]-?[0-9]{8}$/;
    return regex.test(phone);
  };
  
  const validateForm = (formData) => {
    setPhoneError(''); 
  
    if (!formData.name || !formData.phone_no || !formData.status) {
      showMessage('All fields are required.');
      return false;
    }
  
    if (!isValidPhoneNumber(formData.phone_no)) {
      setPhoneError('Invalid phone number format.'); 
      return false;
    }
  
    return true;
  };
  

  return (
    
    <div className="container py-4">
      <h1 className="text-center mb-4">📞 Phonebook System</h1>

      {message && (
        <div className="alert alert-${message.type} text-center" role="alert">
          {message.text}
        </div>
)}
      <PhonebookForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        phoneError={phoneError}
      />

      <PhonebookList
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
   <div className="d-flex justify-content-center align-items-center mt-3">
  <button
    className="btn btn-secondary btn-sm mr-2"
    onClick={handlePreviousPage}
    disabled={currentPage === 1 || loading}
  >
    Previous
  </button>

  {/* Page Info */}
  <span className="mx-2">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-secondary btn-sm ml-2"
    onClick={handleNextPage}
    disabled={currentPage === totalPages || loading}
  >
    Next
  </button>
</div>
    </div>
  );
}

export default App;


