/**
 * API Configuration for the Portfolio Backend
 */

// Base API URL - fallback to localhost if not defined in environment
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// API Endpoints
export const ENDPOINTS = {
  EDUCATION: '/api/education',
  SKILLS: '/api/skills',
  PROJECTS: '/api/projects',
  EXPERIENCES: '/api/experiences',
  STATISTICS: '/api/statistics'
};

// Default headers for API requests
export const defaultHeaders = {
  'Content-Type': 'application/json'
}; 