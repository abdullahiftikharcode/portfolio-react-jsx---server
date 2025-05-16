# Portfolio Backend

Backend API for a personal portfolio website. Built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS for cross-origin requests

## Features

RESTful API endpoints for:
- Education
- Skills
- Projects
- Work Experience

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone [your-repo-url]
cd portfolio-backend
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

4. Start the server
```
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Education
- `GET /api/education` - Get all education entries
- `GET /api/education/:id` - Get a single education entry
- `POST /api/education` - Create a new education entry
- `PUT /api/education/:id` - Update an education entry
- `DELETE /api/education/:id` - Delete an education entry

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get a single skill
- `POST /api/skills` - Create a new skill
- `PUT /api/skills/:id` - Update a skill
- `DELETE /api/skills/:id` - Delete a skill

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Work Experience
- `GET /api/experiences` - Get all work experiences
- `GET /api/experiences/:id` - Get a single work experience
- `POST /api/experiences` - Create a new work experience
- `PUT /api/experiences/:id` - Update a work experience
- `DELETE /api/experiences/:id` - Delete a work experience

## Frontend Integration

To connect a React frontend:
1. Set up Axios with the base URL
```js
// In your React app
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Example request
const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/api/projects`);
  return response.data;
};
```

## License

This project is licensed under the ISC License.
