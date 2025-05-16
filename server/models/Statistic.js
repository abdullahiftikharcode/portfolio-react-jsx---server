const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['total_hours', 'projects_done', 'satisfied', 'certifications'] // Valid statistic names
  },
  value: {
    type: Number,
    required: true,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
StatisticSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Statistic', StatisticSchema); 