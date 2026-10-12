/**
 * Employee Management API Server
 * Main entry point for the backend application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, closeDB } = require('./config/database');

// Initialize Express app
const app = express();

// Environment variables with defaults
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: dbStatus,
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/employees', require('./routes/employees'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Employee Management API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      employees: '/api/employees'
    }
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server - bind to all interfaces (0.0.0.0) for Windows compatibility
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Employee Management API Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔗 Server running on: http://localhost:${PORT}`);
  console.log(`🔗 Also available at: http://127.0.0.1:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/employees`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🛑 Received shutdown signal...');
  
  // Close server
  server.close(() => {
    console.log('🔌 HTTP server closed');
  });
  
  // Close database connection
  await closeDB();
  
  console.log('👋 Graceful shutdown complete');
  process.exit(0);
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION:', err);
  gracefulShutdown();
});

module.exports = app; // Export for testing
