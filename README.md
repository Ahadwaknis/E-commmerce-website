# E-commerce Website

A modern, responsive e-commerce platform built with React.js and Node.js.

## Features

- User authentication (JWT)
- Product catalog with search and filters
- Shopping cart
- Checkout process
- User dashboard
- Admin panel
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

## Setup

1. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Start MongoDB locally or update MONGO_URI in backend/.env

3. Start the backend:
   ```
   cd backend && node server.js
   ```

4. Start the frontend:
   ```
   cd frontend && npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Technologies

- Frontend: React, React Router, Framer Motion, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, JWT, bcrypt