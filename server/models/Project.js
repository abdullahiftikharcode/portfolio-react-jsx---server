const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  images: [String],
  technologies: [String],
  language: {
    type: String,
    trim: true
  },
  repoUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  stargazers_count: {
    type: Number,
    default: 0
  },
  forks_count: {
    type: Number,
    default: 0
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema); 