
# Ordo

Ordo is a minimalistic task engine for tracking, managing, and assigning tasks.

It provides a production-style REST API for team task management, inspired by tools like *Trello* and *Linear*.

## Features

Users can:

- Register and log in
- Create and manage projects
- Create tasks within projects
- Assign tasks to team members
- Set task priorities and statuses
- Set task deadlines
- Comment on tasks
- Search and filter tasks
- Receive notifications
- Track activity

---

## Project Structure


ordo/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   └── task.service.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   └── ApiError.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
````



# Tech Stack

## Core

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB** — Database
* **Mongoose** — MongoDB ODM

## Authentication & Security

* **JWT** — Authentication
* **bcrypt** — Password hashing
* **Zod** — Request validation
* **Helmet** — HTTP security headers
* **CORS** — Cross-origin resource sharing
* **express-rate-limit** — Rate limiting

## Development & Testing

* **Morgan / Pino** — Logging
* **Swagger / OpenAPI** — API documentation
* **Jest** — Testing framework
* **Supertest** — HTTP API testing
* **Docker** — Containerization

---

# Database Design

## User


User
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt
```

### Roles


user
admin
```

---

## Project

```text
Project
├── name
├── description
├── owner
├── members[]
├── createdAt
└── updatedAt
```

---

## Task


Task
├── title
├── description
├── project
├── assignedTo
├── createdBy
├── status
├── priority
├── dueDate
├── createdAt
└── updatedAt
```

### Status


todo
in_progress
completed
```

### Priority


low
medium
high
```

---

## Comment


Comment
├── task
├── author
├── content
└── createdAt
```

---

# API Endpoints

All API endpoints are versioned under:


/api/v1
```

## Authentication

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| `POST` | `/api/v1/auth/register` | Register a new user        |
| `POST` | `/api/v1/auth/login`    | Log in a user              |
| `GET`  | `/api/v1/auth/me`       | Get the authenticated user |

---

## Projects

| Method   | Endpoint               | Description         |
| -------- | ---------------------- | ------------------- |
| `POST`   | `/api/v1/projects`     | Create a project    |
| `GET`    | `/api/v1/projects`     | Get user's projects |
| `GET`    | `/api/v1/projects/:id` | Get a project       |
| `PATCH`  | `/api/v1/projects/:id` | Update a project    |
| `DELETE` | `/api/v1/projects/:id` | Delete a project    |

---

## Tasks

| Method   | Endpoint                            | Description       |
| -------- | ----------------------------------- | ----------------- |
| `POST`   | `/api/v1/projects/:projectId/tasks` | Create a task     |
| `GET`    | `/api/v1/projects/:projectId/tasks` | Get project tasks |
| `GET`    | `/api/v1/tasks/:id`                 | Get a task        |
| `PATCH`  | `/api/v1/tasks/:id`                 | Update a task     |
| `DELETE` | `/api/v1/tasks/:id`                 | Delete a task     |

---

# Authentication Flow

Protected endpoints use JWT-based authentication.


Client
  │
  │ Authorization: Bearer <token>
  ↓
JWT Middleware
  │
  ├── Invalid → 401 Unauthorized
  │
  └── Valid
       ↓
    req.user
       ↓
   Controller
       ↓
    Service
       ↓
   Database
```

---

# Security

Ordo follows common API security practices, including:

* Helmet security headers
* CORS configuration
* Request rate limiting
* Password hashing with bcrypt
* JWT expiration
* Request validation
* Environment variables for secrets
* Centralized error handling

Sensitive configuration should be stored in `.env` and never committed to the repository.

---

# Development Roadmap

## Phase 1 — Core API

* [ ] Initialize Express application
* [ ] Configure MongoDB
* [ ] Create database models
* [ ] Implement project CRUD
* [ ] Implement task CRUD

## Phase 2 — Authentication

* [ ] User registration
* [ ] User login
* [ ] Password hashing
* [ ] JWT authentication
* [ ] Authentication middleware
* [ ] `/auth/me` endpoint

## Phase 3 — Production Features

* [ ] Request validation
* [ ] Centralized error handling
* [ ] Authorization
* [ ] Pagination
* [ ] Filtering
* [ ] Search
* [ ] API versioning
* [ ] Consistent API responses

## Phase 4 — Security & Reliability

* [ ] Rate limiting
* [ ] Security headers
* [ ] Logging
* [ ] Unit tests
* [ ] Integration tests

## Phase 5 — Deployment

* [ ] Swagger/OpenAPI documentation
* [ ] Docker configuration
* [ ] Docker Compose
* [ ] CI/CD pipeline
* [ ] Production deployment

---

# API Response Format

Ordo aims to maintain a consistent response structure.

## Success


{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {}
  }
}
```

## Error


{
  "success": false,
  "message": "Task not found",
  "statusCode": 404
}
```

---

# Project Goal

Ordo is being built as a **production-style backend project** to demonstrate practical API development concepts including:

* REST API design
* Authentication and authorization
* Database modeling
* Validation
* Error handling
* Security
* Testing
* API documentation
* Containerization
* Deployment

The goal is not just to build a CRUD API, but to understand how a maintainable backend application is structured and developed.

```
