# Portfolio Backend

A Node.js Express API server that powers the portfolio website, providing data for education, skills, projects, work experience, and statistics.

## Prerequisites

- Node.js (v14.x or later)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-react-jsx-server
```

2. Install server dependencies
```bash
cd server
npm install
```

## Configuration

Create a `.env` file in the server directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
# Add any other environment variables needed
```

### MongoDB Setup

- **Local MongoDB**: Make sure MongoDB is installed and running on your machine
- **MongoDB Atlas**: Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a cluster, and use the connection string in your `.env` file

## Running the Backend

```bash
# From the server directory
npm start

# For development with auto-reload
npm run dev
```

The server will start running at http://localhost:5000 (or the port specified in your .env file).

## API Endpoints

The backend provides the following endpoints:

- **Education**: `/api/education`
- **Skills**: `/api/skills`  
- **Projects**: `/api/projects`
- **Work Experience**: `/api/experiences`
- **Statistics**: `/api/statistics`

Each resource supports standard CRUD operations:
- `GET /api/resource` - Get all items
- `GET /api/resource/:id` - Get a single item
- `POST /api/resource` - Create a new item
- `PUT /api/resource/:id` - Update an item
- `DELETE /api/resource/:id` - Delete an item

Statistics endpoints use the statistic name as the identifier:
- `GET /api/statistics/:name` - Get a statistic by name

## Initial Data

The server automatically initializes default statistics on startup. You can add sample data for other collections using the seed scripts if available.

## Frontend Integration

To connect the React frontend to this backend:

1. Start the backend server first
2. Make sure the frontend API URL is correctly set to `http://localhost:5000` (or your custom port)
3. Start the React frontend in a separate terminal

## Troubleshooting

- **Connection refused**: Make sure MongoDB is running
- **Authentication failed**: Check your MongoDB connection string
- **CORS errors**: The API is configured to allow requests from http://localhost:3000. If your frontend runs on a different port, update the CORS configuration in `server/index.js` 