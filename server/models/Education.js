const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  field: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Year/duration is required']
  },
  score: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null // null for ongoing education
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  achievements: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Education', educationSchema); 