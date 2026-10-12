/**
 * Employee Model
 * Mongoose schema for employee data
 */

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters']
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      enum: {
        values: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'IT', 'Other'],
        message: '{VALUE} is not a valid department'
      }
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary cannot be negative'],
      max: [10000000, 'Salary value too large']
    },
    joiningDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave'],
      default: 'Active'
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1 });

// Virtual for formatted salary
employeeSchema.virtual('formattedSalary').get(function() {
  return `$${this.salary.toLocaleString()}`;
});

// Pre-save middleware - example
employeeSchema.pre('save', function(next) {
  // You can add custom logic here before saving
  // For example, logging, validation, etc.
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
