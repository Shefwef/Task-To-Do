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

---

## Screenshots

### 🟢 Registration

![Registration Screenshot](https://pplx-res.cloudinary.com/image/private/user_uploads/79515014/1eb325d5-5fcf-4fc1-8a4b-14ffa61719cc/Screenshot-2025-07-16-220229.jpg)

### 🟢 Login & Token Generation

![Login and Token Screenshot](https://pplx-res.cloudinary.com/image/private/user_uploads/79515014/5ad52fd5-1d2a-4dd2-b189-d5c40c901348/Screenshot-2025-07-16-224048.jpg)

### 🟢 Authorization via Swagger UI

![Authorization Screenshot](https://pplx-res.cloudinary.com/image/private/user_uploads/79515014/9d99f0bc-219c-4aec-9129-33a37448a843/Screenshot-2025-07-16-224442.jpg)

---

## 🚀 Getting Started

### Prerequisites

- [Python 3.10+](https://www.python.org/)
- [Node.js (18+)](https://nodejs.org/)
- [npm](https://npmjs.com/)

---

## 1️⃣ Backend: FastAPI + SQLite

Go to the backend directory:

cd backend

(Recommended) Setup virtual environment
python -m venv venv

Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload

- Server: http://127.0.0.1:8000
- Swagger docs: http://127.0.0.1:8000/docs

---

### 2️⃣ Frontend (React)

cd frontend
npm install
npm start

- Runs at: http://localhost:3000

---

## 💡 Functionality

- **Register** (create account)
- **Login** (obtain JWT)
- **Protected Routes** (use token with Bearer authorization)
- **CRUD Tasks** (create, read, update, delete tasks scoped to user)

---

## 📝 Notes

- API endpoints except `/register` and `/login` require a valid JWT token.
- For API testing, use the **Authorize** button in Swagger UI, pasting `Bearer <access_token>`.
- Adjust CORS settings in FastAPI for production use.
- Frontend and Backend run independently; adjust API origin in frontend as necessary.

