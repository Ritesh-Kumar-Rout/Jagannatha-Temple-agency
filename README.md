# Jagannatha Temple Agency

This project features a modern, full-stack client-server architecture. It includes an interactive React frontend and a Node.js Express backend structured similarly to a robust MVC Spring Boot architecture.

## Project Structure

```
├── client/          # Frontend application (React + Vite + TypeScript)
│   ├── public/      # Static assets
│   ├── src/         # Main application code
│   │   ├── pages/   # Application routes and pages
│   │   ├── components/ # Reusable UI components
│   │   ├── assets/  # Images and static files
│   │   ├── hooks/   # React logic hooks
│   │   └── lib/     # Utilities and helper JS
│   └── package.json 
├── server/          # Backend APIs (Node.js/Express)
│   ├── config/      # Environment/DB configuration
│   ├── controllers/ # API route handlers that handle HTTP requests
│   ├── services/    # Business logic separating HTTP from logic layer
│   ├── repositories/# Database interactions and queries
│   ├── models/      # Mongoose schemas representing domain entities
│   ├── routes/      # Express API routes
│   ├── resources/   # Static server resources
│   └── package.json 
└── README.md
```

## How to Run

### Backend (Server)
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend server (starts on `localhost:8080`):
   ```bash
   node server.js
   ```

### Frontend (Client)
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Application opens in your browser at `http://localhost:3000` and automatically proxies `/api` calls to the backend on port 8080.
