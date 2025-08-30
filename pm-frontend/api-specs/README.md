# Scrum Management System - API Specifications

This directory contains the OpenAPI 3.0.3 specifications for all microservices in the Scrum Management System, based on the microservices architecture defined in `microservices-architecture.md`.

## Overview

The Scrum Management System is built using a microservices architecture with the following services:

## 📋 Microservices API Specifications

### 1. User Management Service
**File:** `user-management-service.yaml`
**Base URL:** `https://api.scrummanagement.com/user-service/v1`

**Responsibilities:**
- User registration and authentication
- Two-factor authentication (2FA)
- SSO integration (Google, GitHub)
- User profile management

**Key Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/sso/{provider}` - SSO authentication
- `POST /auth/2fa/enable` - Enable 2FA
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### 2. Project Management Service
**File:** `project-management-service.yaml`
**Base URL:** `https://api.scrummanagement.com/project-service/v1`

**Responsibilities:**
- Project CRUD operations
- Project member management
- Role and permission management
- Project invitations
- Project settings

**Key Endpoints:**
- `GET /projects` - List projects
- `POST /projects` - Create project
- `GET /projects/{projectId}/members` - Get project members
- `POST /projects/{projectId}/members` - Add member to project
- `POST /projects/{projectId}/invitations` - Send invitation
- `GET /projects/{projectId}/settings` - Get project settings

### 3. Backlog & Task Management Service
**File:** `backlog-task-management-service.yaml`
**Base URL:** `https://api.scrummanagement.com/backlog-service/v1`

**Responsibilities:**
- Work item management (Stories, Tasks, Bugs, SubTasks)
- Epic management
- Task relationships and dependencies
- Comments and mentions
- File attachments
- Labels and categorization

**Key Endpoints:**
- `GET /projects/{projectId}/work-items` - List work items
- `POST /projects/{projectId}/work-items` - Create work item
- `PUT /projects/{projectId}/work-items/{workItemId}` - Update work item
- `GET /projects/{projectId}/work-items/{workItemId}/comments` - Get comments
- `POST /projects/{projectId}/work-items/{workItemId}/relationships` - Create relationship
- `GET /projects/{projectId}/epics` - List epics

### 4. Sprint Lifecycle Management Service
**File:** `sprint-lifecycle-management-service.yaml`
**Base URL:** `https://api.scrummanagement.com/sprint-service/v1`

**Responsibilities:**
- Sprint CRUD operations
- Sprint planning and execution
- Sprint board management
- Sprint progress tracking
- Sprint review and retrospective
- Burndown charts and metrics

**Key Endpoints:**
- `GET /projects/{projectId}/sprints` - List sprints
- `POST /projects/{projectId}/sprints` - Create sprint
- `POST /projects/{projectId}/sprints/{sprintId}/start` - Start sprint
- `GET /projects/{projectId}/sprints/{sprintId}/board` - Get sprint board
- `GET /projects/{projectId}/sprints/{sprintId}/progress` - Get sprint progress
- `POST /projects/{projectId}/sprints/{sprintId}/review` - Create sprint review
- `POST /projects/{projectId}/sprints/{sprintId}/retrospective` - Create retrospective

### 5. Daily Scrum Service
**File:** `daily-scrum-service.yaml`
**Base URL:** `https://api.scrummanagement.com/daily-scrum-service/v1`

**Responsibilities:**
- Daily scrum record management
- Daily reminders and notifications
- Daily summary and analytics
- Participation tracking

**Key Endpoints:**
- `GET /projects/{projectId}/daily-records` - Get daily records
- `POST /projects/{projectId}/daily-records` - Create/update daily record
- `GET /projects/{projectId}/sprints/{sprintId}/daily-summary` - Get daily summary
- `POST /projects/{projectId}/daily-reminders` - Set daily reminder
- `GET /projects/{projectId}/daily-analytics` - Get analytics

### 6. Notification Service
**File:** `notification-service.yaml`
**Base URL:** `https://api.scrummanagement.com/notification-service/v1`

**Responsibilities:**
- Notification delivery (email, in-app, push)
- Notification settings management
- Notification templates
- Bulk notification operations

**Key Endpoints:**
- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/mark-all-read` - Mark all as read
- `GET /projects/{projectId}/notification-settings` - Get notification settings
- `POST /notifications/send` - Send bulk notifications
- `GET /notifications/templates` - Get notification templates

## 🔐 Authentication

All APIs use **Bearer Token Authentication** with JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Common Response Patterns

### Success Responses
- `200 OK` - Successful GET/PUT operations
- `201 Created` - Successful POST operations
- `204 No Content` - Successful DELETE operations

### Error Responses
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity` - Validation errors

### Pagination
List endpoints support pagination with the following query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10-25, max: 250)

Response includes pagination metadata:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🏗️ Data Models

### Base Model
All entities extend from a base model with common fields:
```typescript
interface BaseModel {
  id: UUID
  createdAt: Date
  updatedAt: Date
  createdBy: UUID
  updatedBy: UUID
}
```

### Key Entities
- **User** - System users with authentication
- **Project** - Scrum projects with settings
- **WorkItem** - Stories, tasks, bugs, subtasks
- **Sprint** - Sprint lifecycle management
- **DailyRecord** - Daily scrum updates
- **Notification** - System notifications

## 🚀 Getting Started

1. **Authentication**: Start with the User Management Service to register/login users
2. **Project Setup**: Use Project Management Service to create projects and add members
3. **Backlog Management**: Use Backlog & Task Management Service to create work items
4. **Sprint Planning**: Use Sprint Lifecycle Management Service to plan and execute sprints
5. **Daily Updates**: Use Daily Scrum Service for daily standup management
6. **Notifications**: Configure notification preferences using Notification Service

## 📝 API Documentation

Each YAML file can be imported into tools like:
- **Swagger UI** - Interactive API documentation
- **Postman** - API testing and collection management
- **Insomnia** - REST client for API testing
- **OpenAPI Generator** - Generate client SDKs

## 🔄 Inter-Service Communication

Services communicate through:
- **REST APIs** - Synchronous communication
- **Event Bus** - Asynchronous notifications
- **Shared Database** - For reference data (user info, project membership)

## 📋 Environment Configuration

### Development
```
USER_SERVICE_URL=http://localhost:3001
PROJECT_SERVICE_URL=http://localhost:3002
BACKLOG_SERVICE_URL=http://localhost:3003
SPRINT_SERVICE_URL=http://localhost:3004
DAILY_SCRUM_SERVICE_URL=http://localhost:3005
NOTIFICATION_SERVICE_URL=http://localhost:3006
```

### Production
```
USER_SERVICE_URL=https://api.scrummanagement.com/user-service/v1
PROJECT_SERVICE_URL=https://api.scrummanagement.com/project-service/v1
BACKLOG_SERVICE_URL=https://api.scrummanagement.com/backlog-service/v1
SPRINT_SERVICE_URL=https://api.scrummanagement.com/sprint-service/v1
DAILY_SCRUM_SERVICE_URL=https://api.scrummanagement.com/daily-scrum-service/v1
NOTIFICATION_SERVICE_URL=https://api.scrummanagement.com/notification-service/v1
```

## 🧪 Testing

Each service should include:
- Unit tests for business logic
- Integration tests for API endpoints
- Contract tests for inter-service communication
- End-to-end tests for critical user journeys

## 📚 Additional Resources

- [Microservices Architecture Document](../microservices-architecture.md)
- [API Design Guidelines](./api-design-guidelines.md)
- [Authentication & Authorization Guide](./auth-guide.md)
- [Error Handling Standards](./error-handling.md)