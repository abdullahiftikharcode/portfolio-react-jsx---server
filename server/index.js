const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const statisticController = require('./controllers/statisticController');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000' // Frontend URL
}));

// Logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Initialize default statistics
statisticController.initializeStatistics();

// Routes
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/statistics', require('./routes/statisticsRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Portfolio API' });
});

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
}); 