import { API_BASE_URL, ENDPOINTS, defaultHeaders } from './config';

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Education API
 */
export const educationApi = {
  getAll: () => apiRequest(ENDPOINTS.EDUCATION),
  getById: (id) => apiRequest(`${ENDPOINTS.EDUCATION}/${id}`),
  create: (data) => apiRequest(ENDPOINTS.EDUCATION, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${ENDPOINTS.EDUCATION}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${ENDPOINTS.EDUCATION}/${id}`, {
    method: 'DELETE'
  })
};

/**
 * Skills API
 */
export const skillsApi = {
  getAll: () => apiRequest(ENDPOINTS.SKILLS),
  getById: (id) => apiRequest(`${ENDPOINTS.SKILLS}/${id}`),
  create: (data) => apiRequest(ENDPOINTS.SKILLS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${ENDPOINTS.SKILLS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${ENDPOINTS.SKILLS}/${id}`, {
    method: 'DELETE'
  })
};

/**
 * Projects API
 */
export const projectsApi = {
  getAll: () => apiRequest(ENDPOINTS.PROJECTS),
  getById: (id) => apiRequest(`${ENDPOINTS.PROJECTS}/${id}`),
  create: (data) => apiRequest(ENDPOINTS.PROJECTS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${ENDPOINTS.PROJECTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${ENDPOINTS.PROJECTS}/${id}`, {
    method: 'DELETE'
  })
};

/**
 * Experiences API
 */
export const experiencesApi = {
  getAll: () => apiRequest(ENDPOINTS.EXPERIENCES),
  getById: (id) => apiRequest(`${ENDPOINTS.EXPERIENCES}/${id}`),
  create: (data) => apiRequest(ENDPOINTS.EXPERIENCES, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${ENDPOINTS.EXPERIENCES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${ENDPOINTS.EXPERIENCES}/${id}`, {
    method: 'DELETE'
  })
};

/**
 * Statistics API
 */
export const statisticsApi = {
  getAll: () => apiRequest(ENDPOINTS.STATISTICS),
  getByName: (name) => apiRequest(`${ENDPOINTS.STATISTICS}/${name}`),
  create: (data) => apiRequest(ENDPOINTS.STATISTICS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (name, data) => apiRequest(`${ENDPOINTS.STATISTICS}/${name}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (name) => apiRequest(`${ENDPOINTS.STATISTICS}/${name}`, {
    method: 'DELETE'
  })
}; 