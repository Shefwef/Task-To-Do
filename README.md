# 📝 To-Do Application (Full Stack: React + FastAPI + SQLite)

## Overview
This project is a **full-stack To-Do Application** featuring:
- **Frontend:** React (JavaScript)
- **Backend:** FastAPI (Python)
- **Database:** SQLite (via SQLAlchemy ORM)
- **Authentication:** JWT (with OAuth2 password flow)

Users can **register**, **log in**, and manage their personal to-do tasks securely.

---

## Features
- User Registration and Login
- JWT-based Authentication
- Task Management (Create, Read, Update, Delete)
- Each user sees only their own tasks
- Responsive UI with error handling
- Interactive API documentation with Swagger UI

---

## Screenshots

### 🔧 Development Setup
![Development Setup](image1.png)
*Backend and Frontend setup instructions with server URLs*

### 🔐 OAuth2 Authentication Flow
![OAuth2 Authentication](image2.png)
*Available OAuth2 authorizations with password bearer flow*

### 🔑 Login API Response
![Login Response](image3.png)
*Successful login response with JWT access token*

### 📝 User Registration
![Registration Response](image4.png)
*User registration endpoint response*

---

## 🚀 Getting Started

### Prerequisites
- [Python 3.10+](https://www.python.org/)
- [Node.js (18+)](https://nodejs.org/)
- [npm](https://npmjs.com/)

---

## 1️⃣ Backend: FastAPI + SQLite

Go to the backend directory:
```bash
cd backend
```

### (Recommended) Setup virtual environment
```bash
python -m venv venv
```

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Install dependencies and run server
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Access Points:**
- Server: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Swagger docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm start
```

**Access Point:**
- Runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication Flow

### 1. User Registration
- **Endpoint:** `POST /register`
- **Body:** `{"username": "testuser", "email": "testuser@example.com", "password": "password"}`
- **Response:** User details with ID

### 2. User Login
- **Endpoint:** `POST /login`
- **Body:** `{"username": "testuser", "password": "password"}`
- **Response:** JWT access token and token type

### 3. Protected Routes
- **Authorization:** Bearer token required
- **Format:** `Authorization: Bearer <access_token>`

---

## 📡 API Endpoints

### Public Endpoints
- `POST /register` - User registration
- `POST /login` - User authentication

### Protected Endpoints (Require JWT)
- `GET /tasks` - Get user's tasks
- `POST /tasks` - Create new task
- `PUT /tasks/{task_id}` - Update task
- `DELETE /tasks/{task_id}` - Delete task

---

## 💡 Usage Instructions

### Testing with Swagger UI
1. Navigate to [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
2. Register a new user using the `/register` endpoint
3. Login using the `/login` endpoint to get your JWT token
4. Click the **"Authorize"** button in Swagger UI
5. Enter your token in the format: `Bearer <your_access_token>`
6. Now you can access all protected endpoints

### Testing with Frontend
1. Start both backend and frontend servers
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. Register a new account or login with existing credentials
4. Start managing your tasks!

---

## 🛠️ Technical Details

### Backend Stack
- **FastAPI:** Modern Python web framework
- **SQLAlchemy:** ORM for database operations
- **SQLite:** Lightweight database
- **JWT:** JSON Web Tokens for authentication
- **OAuth2:** Password bearer flow for security

### Frontend Stack
- **React:** JavaScript library for UI
- **Axios/Fetch:** HTTP client for API calls
- **JWT Integration:** Token-based authentication

---

## 📝 Notes
- API endpoints except `/register` and `/login` require a valid JWT token
- For API testing, use the **Authorize** button in Swagger UI with `Bearer <access_token>`
- Adjust CORS settings in FastAPI for production use
- Frontend and Backend run independently; adjust API origin in frontend as necessary
- Database file (`database.db`) is created automatically in the backend directory

---

## 🔧 Development Tips
- Use the Swagger UI for quick API testing and documentation
- Monitor the console for any CORS issues when connecting frontend to backend
- JWT tokens have expiration times - handle token refresh in production
- Consider using environment variables for sensitive configuration

---

## 🚀 Production Deployment
- Configure proper CORS origins
- Use environment variables for database URLs and JWT secrets
- Consider using PostgreSQL or MySQL for production database
- Implement proper error handling and logging
- Add rate limiting and security headers
