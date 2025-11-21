const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// CORS Configuration - Production URLs
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5000',
];
if (process.env.RENDER_EXTERNAL_URL) {
    allowedOrigins.push(process.env.RENDER_EXTERNAL_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from frontend folder
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Database Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('FATAL ERROR: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    console.log('✓ Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// API Routes
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', mongodb: mongoose.connection.readyState === 1 });
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontendPath, 'admin', 'index.html'));
});

app.get('/admin/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'admin', 'index.html'));
});

app.get('/admin/index.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'admin', 'index.html'));
});

// Catch-all for frontend SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Important for Render

const server = app.listen(PORT, HOST, () => {
  console.log(`✓ Server running on ${HOST}:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});

// Add these handlers to catch silent crashes
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});
