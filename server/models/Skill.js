const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  icon: {
    type: String,
    default: null
  },
  value: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  years: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema); 