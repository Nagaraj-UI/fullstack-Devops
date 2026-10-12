/**
 * Employee Routes
 * RESTful API endpoints for employee CRUD operations
 */

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

/**
 * @route   GET /api/employees
 * @desc    Get all employees
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching employees'
    });
  }
});

/**
 * @route   GET /api/employees/:id
 * @desc    Get single employee by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error while fetching employee'
    });
  }
});

/**
 * @route   POST /api/employees
 * @desc    Create new employee
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, position, department, salary, status } = req.body;
    
    // Basic validation
    if (!name || !email || !position || !department || salary === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, position, department, salary'
      });
    }
    
    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    const employee = await Employee.create({
      name,
      email,
      position,
      department,
      salary,
      status: status || 'Active'
    });
    
    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error while creating employee'
    });
  }
});

/**
 * @route   PUT /api/employees/:id
 * @desc    Update employee
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, email, position, department, salary, status } = req.body;
    
    // Check if employee exists
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    // If email is being changed, check if new email already exists
    if (email && email.toLowerCase() !== employee.email) {
      const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }
    
    // Update employee
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, department, salary, status },
      {
        new: true, // Return updated document
        runValidators: true // Run model validators
      }
    );
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error while updating employee'
    });
  }
});

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete employee
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    await Employee.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error while deleting employee'
    });
  }
});

module.exports = router;
