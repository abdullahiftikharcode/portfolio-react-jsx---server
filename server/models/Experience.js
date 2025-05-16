const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null // null for current position
  },
  description: {
    type: String,
    trim: true
  },
  responsibilities: [String],
  achievements: [String],
  technologies: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema); 