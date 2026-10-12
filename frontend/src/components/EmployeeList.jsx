/**
 * EmployeeList Component
 * Displays list of employees in a table format
 */

import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="employee-list-container">
        <h2>📋 Employee List</h2>
        <div className="loading">Loading employees...</div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="employee-list-container">
        <h2>📋 Employee List</h2>
        <div className="no-data">
          <p>📭 No employees found</p>
          <p className="hint">Add your first employee using the form above!</p>
        </div>
      </div>
    );
  }

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'On Leave': return 'status-leave';
      default: return '';
    }
  };

  return (
    <div className="employee-list-container">
      <h2>📋 Employee List ({employees.length})</h2>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="employee-name">{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <span className="department-badge">
                    {employee.department}
                  </span>
                </td>
                <td className="salary">{formatSalary(employee.salary)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="date">
                  {employee.joiningDate ? formatDate(employee.joiningDate) : 'N/A'}
                </td>
                <td className="actions">
                  <button
                    onClick={() => onEdit(employee)}
                    className="btn btn-edit"
                    title="Edit employee"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
                        onDelete(employee._id);
                      }
                    }}
                    className="btn btn-delete"
                    title="Delete employee"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
