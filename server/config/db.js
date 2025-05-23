const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use fallback URI if environment variable is not set
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 