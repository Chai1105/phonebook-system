import React from 'react';

const PhonebookList = ({ data, handleEdit, handleDelete, loading }) => {
  const displayData = [...data, ...Array(4 - data.length).fill({})];

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Contact List</h4>
      <table className="table table-bordered table-hover" style={{ tableLayout: 'fixed' }}>
        <thead className="table-light">
          <tr>
            <th style={{ width: '25%' }}>Name</th>
            <th style={{ width: '25%' }}>Phone No</th>
            <th style={{ width: '20%' }}>Status</th>
            <th style={{ width: '30%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, index) => (
            <tr key={item.id || index}>
              <td style={{ height: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.name || '\u00A0'}
              </td>
              <td style={{ height: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.phone_no || '\u00A0'}
              </td>
              <td style={{ height: '50px' }}>
                {item.status ? (
                  <span className={item.status === 'Active' ? 'badge bg-success' : 'badge bg-secondary'}>
                    {item.status}
                  </span>
                ) : (
                  '\u00A0'
                )}
              </td>
              <td style={{ height: '50px' }}>
                {item.name ? (
                  <>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  '\u00A0'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhonebookList;
