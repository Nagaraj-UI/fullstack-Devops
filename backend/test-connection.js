/**
 * Simple Backend Connection Test
 * Tests if Express server can start without MongoDB
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Simple test endpoint
app.get('/test', (req, res) => {
  console.log('✅ Test endpoint hit!');
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Health check without MongoDB
app.get('/health', (req, res) => {
  console.log('✅ Health endpoint hit!');
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Backend running without MongoDB test'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Test server running',
    endpoints: {
      test: '/test',
      health: '/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 TEST SERVER RUNNING');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`💚 http://localhost:${PORT}/health`);
  console.log(`🧪 http://localhost:${PORT}/test`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Try: Invoke-RestMethod -Uri "http://localhost:5000/test"');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Error handlers
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});
