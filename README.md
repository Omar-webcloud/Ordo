# Ordo
Ordo is a minimalistic Task Engine for tracking, managing and assigning tasks
Task Management & Team API

Think of it as a backend for something like Trello/Linear.

Users can:

Register/login
Create projects
Create tasks inside projects
Assign tasks to users
Set priority/status/deadline
Comment on tasks
Search/filter tasks
Get notifications
Track activity

## Project Structure

task-api/
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
├── .env
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md



## Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Zod/Joi
Helmet
CORS
express-rate-limit
Morgan/Pino
Swagger/OpenAPI
Jest + Supertest
Docker





## Database Design

### User
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt



### Roles

user
admin

### Project
├── name
├── description
├── owner
├── members[]
├── createdAt
└── updatedAt


### Task
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


### Status
todo
in_progress
completed

### Priority
low
medium
high

### Comment
├── task
├── author
├── content
└── createdAt




## Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me


## Projects API
POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/:id
PATCH  /api/v1/projects/:id
DELETE /api/v1/projects/:id



## Tasks API
POST   /api/v1/projects/:projectId/tasks
GET    /api/v1/projects/:projectId/tasks
GET    /api/v1/tasks/:id
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id


## Authentication Middleware
Request
   ↓
JWT middleware
   ↓
Is token valid?
   ↓
Yes
   ↓
req.user
   ↓
Controller



## Secuirity
Helmet
CORS
Rate limiting
Password hashing
JWT expiration
Input validation
Environment variables
