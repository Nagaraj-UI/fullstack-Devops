/**
 * Main App Component
 * Manages application state and orchestrates components
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { employeeService } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Check API health on mount
  useEffect(() => {
    checkHealth();
    const healthInterval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(healthInterval);
  }, []);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const checkHealth = async () => {
    try {
      await employeeService.checkHealth();
      setHealthStatus(true);
    } catch (error) {
      setHealthStatus(false);
      console.error('Health check failed:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAll();
      setEmployees(response.data || []);
      setHealthStatus(true);
    } catch (error) {
      showNotification('Failed to fetch employees: ' + error.message, 'error');
      setHealthStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000);
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      const response = await employeeService.create(employeeData);
      setEmployees(prev => [response.data, ...prev]);
      showNotification('✅ Employee created successfully!', 'success');
    } catch (error) {
      showNotification('❌ ' + error.message, 'error');
    }
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      const response = await employeeService.update(editingEmployee._id, employeeData);
      setEmployees(prev => 
        prev.map(emp => emp._id === editingEmployee._id ? response.data : emp)
      );
      setEditingEmployee(null);
      showNotification('✅ Employee updated successfully!', 'success');
    } catch (error) {
      showNotification('❌ ' + error.message, 'error');
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await employeeService.delete(id);
      setEmployees(prev => prev.filter(emp => emp._id !== id));
      showNotification('✅ Employee deleted successfully!', 'success');
    } catch (error) {
      showNotification('❌ ' + error.message, 'error');
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleSubmit = async (employeeData) => {
    if (editingEmployee) {
      await handleUpdateEmployee(employeeData);
    } else {
      await handleCreateEmployee(employeeData);
    }
  };

  return (
    <div className="app">
      <Navbar healthStatus={healthStatus} />
      
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="main-content">
        <EmployeeForm
          onSubmit={handleSubmit}
          editingEmployee={editingEmployee}
          onCancel={handleCancelEdit}
        />
        
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDeleteEmployee}
          loading={loading}
        />
      </main>

      <footer className="footer">
        <p>Employee Management System | DevOps Learning Project | Phase 1: Foundation</p>
      </footer>
    </div>
  );
}

export default App;
