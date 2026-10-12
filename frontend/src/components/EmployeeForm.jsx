/**
 * EmployeeForm Component
 * Form for creating and editing employees
 */

import React, { useState, useEffect } from 'react';

const DEPARTMENTS = [
  'Engineering',
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Operations',
  'IT',
  'Other'
];

const STATUSES = ['Active', 'Inactive', 'On Leave'];

const EmployeeForm = ({ onSubmit, editingEmployee, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: 'Engineering',
    salary: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        position: editingEmployee.position || '',
        department: editingEmployee.department || 'Engineering',
        salary: editingEmployee.salary || '',
        status: editingEmployee.status || 'Active'
      });
    } else {
      resetForm();
    }
  }, [editingEmployee]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      position: '',
      department: 'Engineering',
      salary: '',
      status: 'Active'
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) < 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      salary: Number(formData.salary)
    };

    onSubmit(submitData);
    if (!editingEmployee) {
      resetForm();
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    onCancel();
  };

  return (
    <div className="employee-form-container">
      <h2>{editingEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="john.doe@company.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={errors.position ? 'input-error' : ''}
              placeholder="Senior Developer"
            />
            {errors.position && <span className="error-message">{errors.position}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary ($) *</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={errors.salary ? 'input-error' : ''}
              placeholder="50000"
              min="0"
              step="1000"
            />
            {errors.salary && <span className="error-message">{errors.salary}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingEmployee ? '💾 Update Employee' : '➕ Add Employee'}
          </button>
          {editingEmployee && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
