# 🚀 Velocity Tasks — Production-Ready Task Management API

A scalable and production-grade **Task Management REST API** built with **Django REST Framework**, featuring secure JWT authentication, PostgreSQL persistence, CI/CD automation, and cloud deployment.

Designed with modern backend engineering practices including protected endpoints, rate limiting, environment-based configuration, Swagger API documentation, and production deployment pipelines.

---

# 🌐 Live Demo

### 🔗 API Documentation

https://task-manager-1-ndia.onrender.com/swagger/

### 🔗 Frontend Application

https://task-manager-2i37vvjuz-rohans-projects-98f5ed53.vercel.app/

---

# ⚡ Core Features

✅ JWT Authentication (SimpleJWT)
✅ Secure Protected API Endpoints
✅ Full CRUD Task Management
✅ User-Specific Task Isolation
✅ PostgreSQL Production Database
✅ Swagger API Documentation
✅ Search, Filtering & Ordering
✅ Pagination Support
✅ CI/CD with GitHub Actions
✅ Production Deployment (Render + Vercel)
✅ Environment Variable Configuration
✅ DRF Throttling & Security Enhancements
✅ Error Boundaries & Protected Routes

---

# 🛠️ Tech Stack

## Backend

* Django
* Django REST Framework
* SimpleJWT
* Gunicorn
* drf-yasg (Swagger)

## Frontend

* React
* Tailwind CSS
* Axios
* React Router DOM

## Database

* PostgreSQL

## Deployment & DevOps

* Render
* Vercel
* GitHub Actions (CI/CD)

---

# 🔐 Authentication Flow

Velocity Tasks uses JWT-based authentication.

After successful login:

* Access Token is used for authenticated requests
* Protected endpoints require Bearer token authorization
* User data is isolated securely per authenticated user

Example header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📌 API Endpoints

# 🔑 Authentication

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/register/`      | Register new user         |
| POST   | `/api/token/`         | Login & obtain JWT tokens |
| POST   | `/api/token/refresh/` | Refresh access token      |

---

# 📋 Task Management

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/api/tasks/`      | Retrieve all tasks   |
| POST   | `/api/tasks/`      | Create task          |
| GET    | `/api/tasks/{id}/` | Retrieve single task |
| PUT    | `/api/tasks/{id}/` | Update task          |
| PATCH  | `/api/tasks/{id}/` | Partial update       |
| DELETE | `/api/tasks/{id}/` | Delete task          |

---

# 🔍 Query Features

## Filter Tasks

```bash
/api/tasks/?completed=true
```

## Search Tasks

```bash
/api/tasks/?title=study
```

## Order Tasks

```bash
/api/tasks/?ordering=-created_at
```

---

# 🧪 Example Request

## Create Task

```json
{
  "title": "Complete backend deployment",
  "completed": false
}
```

---

# ⚙️ Local Development Setup

## Clone Repository

```bash
git clone https://github.com/rohantiwari9573/task-manager.git
cd task-manager
```

---

## Backend Setup

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## Frontend Setup

```bash
cd task-manager-frontend
npm install
npm start
```

---

# 🚀 CI/CD Pipeline

This project uses GitHub Actions for automated Continuous Integration and Continuous Deployment.

### Workflow Includes:

* Automated backend validation
* React production build checks
* Automatic deployment to Render
* Automatic deployment to Vercel

Every push to the `main` branch automatically triggers deployment pipelines.

---

# 🔒 Production Security

Implemented production-grade security configurations:

* JWT Authentication
* Protected API Routes
* DRF Request Throttling
* Environment Variable Isolation
* HTTPS Security Flags
* CORS Configuration
* User-Specific Data Access Control

---

# 📈 Future Enhancements

* Task Priorities & Due Dates
* Redis Caching
* Dockerization
* Unit & Integration Testing
* Token Rotation & Refresh Flow
* WebSocket Real-Time Updates
* Kanban Drag-and-Drop Board
* Sentry Monitoring & Logging

---

# 👨‍💻 Author

## Rohan Tiwari

📧 [rohantiwari166@gmail.com](mailto:rohantiwari166@gmail.com)

🔗 GitHub
https://github.com/rohantiwari9573

---

# ⭐ Project Highlights

This project demonstrates:

* Backend API Engineering
* Authentication & Authorization
* Production Deployment
* CI/CD Automation
* REST API Design
* Database Integration
* Frontend-Backend Integration
* Cloud Infrastructure Basics
* Production Security Practices

---
