# API Specifications cho Hệ thống Scrum Management

## 1. User Management Service API

### Base URL: `/api/v1/users`

#### Authentication & Registration

```yaml
POST /auth/register
Description: Đăng ký tài khoản mới
Request Body:
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "phone": "+84901234567"
  }
Response: 201
  {
    "id": "uuid",
    "email": "user@example.com", 
    "fullName": "John Doe",
    "isEmailVerified": false,
    "message": "Registration successful. Please verify your email."
  }
```

```yaml
POST /auth/login
Description: Đăng nhập
Request Body:
  {
    "email": "user@example.com",
    "password": "password123",
    "rememberMe": true
  }
Response: 200
  {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "avatar": "url"
    }
  }
```

```yaml
POST /auth/logout
Description: Đăng xuất
Headers: Authorization: Bearer {token}
Request Body:
  {
    "refreshToken": "refresh-token"
  }
Response: 200
  {
    "message": "Logged out successfully"
  }
```

```yaml
POST /auth/refresh
Description: Làm mới token
Request Body:
  {
    "refreshToken": "refresh-token"
  }
Response: 200
  {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-token",
    "expiresIn": 3600
  }
```

#### Two-Factor Authentication

```yaml
POST /auth/2fa/enable
Description: Bật 2FA
Headers: Authorization: Bearer {token}
Response: 200
  {
    "qrCode": "data:image/png;base64,xxx",
    "secret": "base32-secret",
    "backupCodes": ["code1", "code2"]
  }

POST /auth/2fa/verify
Description: Xác thực 2FA code
Headers: Authorization: Bearer {token}
Request Body:
  {
    "code": "123456"
  }
Response: 200
  {
    "message": "2FA enabled successfully"
  }

POST /auth/2fa/disable
Description: Tắt 2FA
Headers: Authorization: Bearer {token}
Request Body:
  {
    "password": "current-password",
    "code": "123456"
  }
Response: 200
  {
    "message": "2FA disabled successfully"
  }
```

#### SSO Authentication

```yaml
GET /auth/sso/google
Description: Redirect to Google OAuth
Response: 302 (Redirect to Google)

GET /auth/sso/google/callback
Description: Google OAuth callback
Query Params: code, state
Response: 200
  {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {...},
    "isNewUser": false
  }

GET /auth/sso/github
Description: Redirect to GitHub OAuth
Response: 302 (Redirect to GitHub)

GET /auth/sso/github/callback
Description: GitHub OAuth callback
Query Params: code, state
Response: 200 (same as Google)
```

#### User Profile Management

```yaml
GET /profile
Description: Lấy thông tin profile
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+84901234567",
    "avatar": "url",
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "ssoProviders": ["google"],
    "createdAt": "2024-01-01T00:00:00Z"
  }

PUT /profile
Description: Cập nhật profile
Headers: Authorization: Bearer {token}
Request Body:
  {
    "fullName": "John Updated",
    "phone": "+84987654321",
    "avatar": "new-avatar-url"
  }
Response: 200
  {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Updated",
    "phone": "+84987654321",
    "avatar": "new-avatar-url",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /profile/password
Description: Đổi mật khẩu
Headers: Authorization: Bearer {token}
Request Body:
  {
    "currentPassword": "old-password",
    "newPassword": "new-password"
  }
Response: 200
  {
    "message": "Password updated successfully"
  }
```

#### Session Management

```yaml
GET /sessions
Description: Lấy danh sách sessions đang active
Headers: Authorization: Bearer {token}
Response: 200
  {
    "sessions": [
      {
        "id": "session-uuid",
        "device": "Chrome on Windows",
        "location": "Ho Chi Minh City, Vietnam",
        "lastActive": "2024-01-01T00:00:00Z",
        "isCurrent": true
      }
    ]
  }

DELETE /sessions/{sessionId}
Description: Đăng xuất session cụ thể
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Session terminated successfully"
  }

DELETE /sessions/all
Description: Đăng xuất tất cả sessions (trừ current)
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "All other sessions terminated"
  }
```

## 2. Project Management Service API

### Base URL: `/api/v1/projects`

#### Project CRUD

```yaml
GET /projects
Description: Lấy danh sách projects của user
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (Active|Inactive|Completed)
  - limit?: number (default: 20)
  - offset?: number (default: 0)
  - search?: string
Response: 200
  {
    "projects": [
      {
        "id": "uuid",
        "name": "E-commerce Website",
        "description": "Build online shopping platform",
        "status": "Active",
        "startDate": "2024-01-01",
        "endDate": "2024-06-01",
        "role": "Product Owner",
        "memberCount": 8,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "limit": 20,
    "offset": 0
  }

POST /projects
Description: Tạo project mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "name": "New Project",
    "description": "Project description",
    "startDate": "2024-01-01",
    "endDate": "2024-06-01"
  }
Response: 201
  {
    "id": "uuid",
    "name": "New Project",
    "description": "Project description",
    "status": "Active",
    "startDate": "2024-01-01",
    "endDate": "2024-06-01",
    "createdBy": "user-uuid",
    "role": "Product Owner",
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /projects/{projectId}
Description: Lấy chi tiết project
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "name": "E-commerce Website",
    "description": "Build online shopping platform",
    "status": "Active",
    "startDate": "2024-01-01",
    "endDate": "2024-06-01",
    "createdBy": "user-uuid",
    "userRole": "Product Owner",
    "stats": {
      "totalSprints": 10,
      "activeSprints": 1,
      "totalMembers": 8,
      "totalStories": 45,
      "completedStories": 32
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /projects/{projectId}
Description: Cập nhật project
Headers: Authorization: Bearer {token}
Request Body:
  {
    "name": "Updated Project Name",
    "description": "Updated description",
    "status": "Active",
    "startDate": "2024-01-01",
    "endDate": "2024-07-01"
  }
Response: 200
  {
    "id": "uuid",
    "name": "Updated Project Name",
    "description": "Updated description",
    "status": "Active",
    "startDate": "2024-01-01",
    "endDate": "2024-07-01",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /projects/{projectId}
Description: Xóa project (chỉ PO)
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Project deleted successfully"
  }
```

#### Member Management

```yaml
GET /projects/{projectId}/members
Description: Lấy danh sách members
Headers: Authorization: Bearer {token}
Query Params:
  - role?: string (PO|SM|Developer|Viewer)
Response: 200
  {
    "members": [
      {
        "id": "uuid",
        "userId": "user-uuid",
        "email": "member@example.com",
        "fullName": "Member Name",
        "avatar": "url",
        "role": "Developer",
        "joinedAt": "2024-01-01T00:00:00Z",
        "lastActive": "2024-01-01T00:00:00Z"
      }
    ]
  }

POST /projects/{projectId}/members
Description: Thêm member mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "email": "newmember@example.com",
    "role": "Developer"
  }
Response: 201
  {
    "id": "uuid",
    "userId": "user-uuid",
    "email": "newmember@example.com",
    "fullName": "New Member",
    "role": "Developer",
    "joinedAt": "2024-01-01T00:00:00Z"
  }

PUT /projects/{projectId}/members/{memberId}/role
Description: Thay đổi role của member
Headers: Authorization: Bearer {token}
Request Body:
  {
    "role": "Scrum Master"
  }
Response: 200
  {
    "id": "uuid",
    "role": "Scrum Master",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /projects/{projectId}/members/{memberId}
Description: Xóa member khỏi project
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Member removed successfully"
  }
```

#### Permissions & Roles

```yaml
GET /projects/{projectId}/permissions
Description: Lấy permissions của user trong project
Headers: Authorization: Bearer {token}
Response: 200
  {
    "role": "Product Owner",
    "permissions": [
      {
        "resource": "project",
        "actions": ["create", "read", "update", "delete"]
      },
      {
        "resource": "user_story",
        "actions": ["create", "read", "update", "delete", "prioritize"]
      }
    ]
  }

GET /roles
Description: Lấy danh sách roles và permissions
Headers: Authorization: Bearer {token}
Response: 200
  {
    "roles": [
      {
        "name": "Product Owner",
        "description": "Manages product backlog and priorities",
        "permissions": [...]
      },
      {
        "name": "Scrum Master",
        "description": "Facilitates scrum processes",
        "permissions": [...]
      }
    ]
  }
```

## 3. Product Backlog Service API

### Base URL: `/api/v1/projects/{projectId}/backlog`

#### User Stories

```yaml
GET /user-stories
Description: Lấy danh sách user stories
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (Backlog|Planned|Done|Canceled)
  - priority?: string (High|Medium|Low)
  - assignee?: string
  - sprint?: string
  - search?: string
  - limit?: number (default: 50)
  - offset?: number (default: 0)
Response: 200
  {
    "stories": [
      {
        "id": "uuid",
        "title": "User can login to system",
        "description": "As a user, I want to login so that I can access my account",
        "priority": "High",
        "storyPoint": 5,
        "status": "Backlog",
        "assignee": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatar": "url"
        },
        "reporter": {
          "id": "uuid", 
          "fullName": "Jane Smith"
        },
        "timeEstimation": 8,
        "sprint": {
          "id": "uuid",
          "name": "Sprint 1"
        },
        "attachments": [
          {
            "id": "uuid",
            "filename": "mockup.png",
            "url": "url"
          }
        ],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }

POST /user-stories
Description: Tạo user story mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "User can register account",
    "description": "As a new user, I want to register an account so that I can use the system",
    "priority": "High",
    "storyPoint": 3,
    "assignee": "user-uuid",
    "timeEstimation": 6
  }
Response: 201
  {
    "id": "uuid",
    "title": "User can register account",
    "description": "As a new user, I want to register an account so that I can use the system",
    "priority": "High",
    "storyPoint": 3,
    "status": "Backlog",
    "assignee": {
      "id": "user-uuid",
      "fullName": "John Doe"
    },
    "reporter": {
      "id": "current-user-uuid",
      "fullName": "Current User"
    },
    "timeEstimation": 6,
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /user-stories/{storyId}
Description: Lấy chi tiết user story
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "title": "User can login to system",
    "description": "As a user, I want to login so that I can access my account",
    "priority": "High",
    "storyPoint": 5,
    "status": "In Progress",
    "assignee": {...},
    "reporter": {...},
    "timeEstimation": 8,
    "sprint": {...},
    "attachments": [...],
    "tasks": [
      {
        "id": "task-uuid",
        "title": "Design login form",
        "status": "Done"
      }
    ],
    "comments": [
      {
        "id": "uuid",
        "author": "John Doe",
        "content": "Need to add forgot password link",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /user-stories/{storyId}
Description: Cập nhật user story
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "Updated title",
    "description": "Updated description",
    "priority": "Medium",
    "storyPoint": 8,
    "assignee": "new-assignee-uuid",
    "timeEstimation": 12
  }
Response: 200
  {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "priority": "Medium",
    "storyPoint": 8,
    "assignee": {...},
    "timeEstimation": 12,
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /user-stories/{storyId}
Description: Xóa user story
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "User story deleted successfully"
  }
```

#### Prioritization & Sprint Assignment

```yaml
PUT /user-stories/{storyId}/priority
Description: Thay đổi priority của story
Headers: Authorization: Bearer {token}
Request Body:
  {
    "priority": "High",
    "position": 1
  }
Response: 200
  {
    "id": "uuid",
    "priority": "High",
    "position": 1,
    "updatedAt": "2024-01-01T00:00:00Z"
  }

POST /user-stories/{storyId}/assign-sprint
Description: Gán story vào sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "sprintId": "sprint-uuid"
  }
Response: 200
  {
    "id": "uuid",
    "sprint": {
      "id": "sprint-uuid",
      "name": "Sprint 1"
    },
    "status": "Planned",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /user-stories/{storyId}/assign-sprint
Description: Gỡ story khỏi sprint
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "sprint": null,
    "status": "Backlog",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

POST /user-stories/bulk-assign
Description: Gán nhiều stories vào sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "storyIds": ["uuid1", "uuid2", "uuid3"],
    "sprintId": "sprint-uuid"
  }
Response: 200
  {
    "assigned": ["uuid1", "uuid2"],
    "failed": [
      {
        "storyId": "uuid3",
        "reason": "Story point limit exceeded"
      }
    ]
  }
```

#### Epics Management

```yaml
GET /epics
Description: Lấy danh sách epics
Headers: Authorization: Bearer {token}
Response: 200
  {
    "epics": [
      {
        "id": "uuid",
        "title": "User Authentication Epic",
        "description": "All features related to user authentication",
        "status": "In Progress",
        "stories": [
          {
            "id": "story-uuid",
            "title": "User login",
            "status": "Done"
          }
        ],
        "progress": {
          "total": 5,
          "completed": 2,
          "percentage": 40
        },
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }

POST /epics
Description: Tạo epic mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "Payment Epic",
    "description": "All payment related features",
    "storyIds": ["story1", "story2"]
  }
Response: 201
  {
    "id": "uuid",
    "title": "Payment Epic",
    "description": "All payment related features",
    "status": "Open",
    "stories": [...],
    "createdAt": "2024-01-01T00:00:00Z"
  }

PUT /epics/{epicId}/stories
Description: Thêm/bỏ stories khỏi epic
Headers: Authorization: Bearer {token}
Request Body:
  {
    "addStories": ["story1", "story2"],
    "removeStories": ["story3"]
  }
Response: 200
  {
    "id": "uuid",
    "stories": [...],
    "updatedAt": "2024-01-01T00:00:00Z"
  }
```

## 4. Sprint Management Service API

### Base URL: `/api/v1/projects/{projectId}/sprints`

#### Sprint CRUD

```yaml
GET /
Description: Lấy danh sách sprints
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (Upcoming|In progress|Completed|Canceled)
  - limit?: number (default: 20)
  - offset?: number (default: 0)
Response: 200
  {
    "sprints": [
      {
        "id": "uuid",
        "name": "Sprint 1",
        "goal": "Implement basic user authentication",
        "status": "In progress",
        "plannedStartDate": "2024-01-01",
        "plannedEndDate": "2024-01-14",
        "actualStartDate": "2024-01-01",
        "actualEndDate": null,
        "storyPointLimit": 20,
        "velocity": 0,
        "progress": {
          "totalStoryPoints": 18,
          "completedStoryPoints": 8,
          "totalTasks": 12,
          "completedTasks": 5,
          "percentage": 44
        },
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1
  }

POST /
Description: Tạo sprint mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "name": "Sprint 2",
    "goal": "Implement user profile management",
    "plannedStartDate": "2024-01-15",
    "plannedEndDate": "2024-01-28",
    "storyPointLimit": 25
  }
Response: 201
  {
    "id": "uuid",
    "name": "Sprint 2",
    "goal": "Implement user profile management",
    "status": "Upcoming",
    "plannedStartDate": "2024-01-15",
    "plannedEndDate": "2024-01-28",
    "storyPointLimit": 25,
    "velocity": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{sprintId}
Description: Lấy chi tiết sprint
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "name": "Sprint 1",
    "goal": "Implement basic user authentication",
    "status": "In progress",
    "plannedStartDate": "2024-01-01",
    "plannedEndDate": "2024-01-14",
    "actualStartDate": "2024-01-01",
    "actualEndDate": null,
    "storyPointLimit": 20,
    "velocity": 0,
    "backlog": {
      "stories": [
        {
          "id": "uuid",
          "title": "User login",
          "storyPoint": 5,
          "status": "Done",
          "assignee": "John Doe"
        }
      ],
      "tasks": [
        {
          "id": "uuid",
          "title": "Design login form",
          "status": "Done",
          "assignee": "Jane Smith"
        }
      ]
    },
    "stats": {
      "totalStoryPoints": 18,
      "completedStoryPoints": 8,
      "remainingStoryPoints": 10,
      "totalTasks": 12,
      "completedTasks": 5,
      "inProgressTasks": 3,
      "todoTasks": 4,
      "completionRate": 44.4
    },
    "team": [
      {
        "id": "uuid",
        "fullName": "John Doe",
        "role": "Developer",
        "assignedTasks": 4,
        "completedTasks": 2
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /{sprintId}
Description: Cập nhật sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "name": "Sprint 1 - Updated",
    "goal": "Updated goal",
    "plannedEndDate": "2024-01-16",
    "storyPointLimit": 22
  }
Response: 200
  {
    "id": "uuid",
    "name": "Sprint 1 - Updated",
    "goal": "Updated goal",
    "plannedEndDate": "2024-01-16",
    "storyPointLimit": 22,
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /{sprintId}
Description: Xóa sprint (chỉ khi status = Upcoming)
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Sprint deleted successfully"
  }
```

#### Sprint Lifecycle Management

```yaml
POST /{sprintId}/start
Description: Bắt đầu sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "duration": 14
  }
Response: 200
  {
    "id": "uuid",
    "status": "In progress",
    "actualStartDate": "2024-01-01",
    "actualEndDate": "2024-01-15",
    "message": "Sprint started successfully"
  }

POST /{sprintId}/complete
Description: Hoàn thành sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "incompleteItems": [
      {
        "itemId": "story-uuid",
        "action": "move_to_backlog"
      },
      {
        "itemId": "task-uuid", 
        "action": "move_to_next_sprint"
      }
    ]
  }
Response: 200
  {
    "id": "uuid",
    "status": "Completed",
    "actualEndDate": "2024-01-14",
    "velocity": 18,
    "summary": {
      "completedStoryPoints": 18,
      "completedTasks": 12,
      "movedToBacklog": 1,
      "movedToNextSprint": 2
    },
    "message": "Sprint completed successfully"
  }

POST /{sprintId}/cancel
Description: Hủy sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "reason": "Requirements changed significantly"
  }
Response: 200
  {
    "id": "uuid",
    "status": "Canceled",
    "message": "Sprint canceled successfully"
  }
```

#### Sprint Planning

```yaml
GET /{sprintId}/planning
Description: Lấy dữ liệu cho sprint planning
Headers: Authorization: Bearer {token}
Response: 200
  {
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1",
      "storyPointLimit": 20,
      "currentStoryPoints": 5
    },
    "availableStories": [
      {
        "id": "uuid",
        "title": "User registration",
        "storyPoint": 8,
        "priority": "High",
        "canAdd": true
      }
    ],
    "teamCapacity": {
      "totalAvailableHours": 320,
      "members": [
        {
          "id": "uuid",
          "fullName": "John Doe",
          "availableHours": 80,
          "currentAssignedHours": 20
        }
      ]
    }
  }

POST /{sprintId}/planning/add-items
Description: Thêm items vào sprint
Headers: Authorization: Bearer {token}
Request Body:
  {
    "stories": ["story1", "story2"],
    "tasks": ["task1", "task2"]
  }
Response: 200
  {
    "added": {
      "stories": ["story1"],
      "tasks": ["task1", "task2"]
    },
    "failed": [
      {
        "itemId": "story2",
        "reason": "Story point limit exceeded"
      }
    ],
    "currentStoryPoints": 18
  }

DELETE /{sprintId}/planning/items/{itemId}
Description: Xóa item khỏi sprint
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Item removed from sprint",
    "currentStoryPoints": 10
  }
```

#### Sprint Board

```yaml
GET /{sprintId}/board
Description: Lấy sprint board data
Headers: Authorization: Bearer {token}
Response: 200
  {
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1",
      "status": "In progress"
    },
    "columns": {
      "todo": [
        {
          "id": "uuid",
          "type": "task",
          "title": "Setup database",
          "assignee": "John Doe",
          "storyPoint": 3,
          "priority": "High",
          "labels": ["backend"],
          "parentStory": "User authentication"
        }
      ],
      "inProgress": [...],
      "inReview": [...],
      "done": [...]
    },
    "members": [
      {
        "id": "uuid",
        "fullName": "John Doe",
        "avatar": "url",
        "workload": {
          "todo": 2,
          "inProgress": 1,
          "inReview": 0,
          "done": 4
        }
      }
    ]
  }

PUT /{sprintId}/board/items/{itemId}/status
Description: Cập nhật status của item trên board
Headers: Authorization: Bearer {token}
Request Body:
  {
    "status": "In Progress",
    "assignee": "user-uuid"
  }
Response: 200
  {
    "id": "uuid",
    "status": "In Progress", 
    "assignee": "John Doe",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /{sprintId}/board/items/{itemId}/position
Description: Thay đổi vị trí item trên board (drag & drop)
Headers: Authorization: Bearer {token}
Request Body:
  {
    "status": "In Progress",
    "position": 2
  }
Response: 200
  {
    "message": "Item position updated"
  }
```

## 5. Task Management Service API

### Base URL: `/api/v1/projects/{projectId}/tasks`

#### Task CRUD

```yaml
GET /
Description: Lấy danh sách tasks
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (To Do|In Progress|In Review|Done|Blocked)
  - type?: string (Task|Bug|SubTask)
  - assignee?: string
  - sprint?: string
  - parent?: string (for subtasks)
  - search?: string
  - limit?: number (default: 50)
  - offset?: number (default: 0)
Response: 200
  {
    "tasks": [
      {
        "id": "uuid",
        "title": "Setup CI/CD pipeline",
        "description": "Configure GitHub Actions for automated testing and deployment",
        "type": "Task",
        "status": "In Progress",
        "priority": "High",
        "assignee": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatar": "url"
        },
        "reporter": {
          "id": "uuid",
          "fullName": "Jane Smith"
        },
        "storyPoint": 5,
        "timeEstimation": 8,
        "timeSpent": 3,
        "labels": ["devops", "automation"],
        "sprint": {
          "id": "uuid",
          "name": "Sprint 1"
        },
        "parentStory": {
          "id": "uuid",
          "title": "Development Infrastructure"
        },
        "subtasks": [
          {
            "id": "uuid",
            "title": "Configure test pipeline",
            "status": "Done"
          }
        ],
        "attachments": [...],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1
  }

POST /
Description: Tạo task mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "Implement user login API",
    "description": "Create REST API endpoint for user authentication",
    "type": "Task",
    "priority": "High",
    "assignee": "user-uuid",
    "storyPoint": 3,
    "timeEstimation": 6,
    "labels": ["backend", "api"],
    "sprintId": "sprint-uuid",
    "parentId": "story-uuid"
  }
Response: 201
  {
    "id": "uuid",
    "title": "Implement user login API",
    "description": "Create REST API endpoint for user authentication",
    "type": "Task",
    "status": "To Do",
    "priority": "High",
    "assignee": {...},
    "reporter": {...},
    "storyPoint": 3,
    "timeEstimation": 6,
    "timeSpent": 0,
    "labels": ["backend", "api"],
    "sprint": {...},
    "parentStory": {...},
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{taskId}
Description: Lấy chi tiết task
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "title": "Setup CI/CD pipeline",
    "description": "Configure GitHub Actions for automated testing and deployment",
    "type": "Task",
    "status": "In Progress",
    "priority": "High",
    "assignee": {...},
    "reporter": {...},
    "storyPoint": 5,
    "timeEstimation": 8,
    "timeSpent": 3,
    "labels": ["devops", "automation"],
    "sprint": {...},
    "parentStory": {...},
    "subtasks": [
      {
        "id": "uuid",
        "title": "Configure test pipeline",
        "status": "Done",
        "assignee": "John Doe",
        "timeSpent": 2
      }
    ],
    "relationships": [
      {
        "type": "Blocked By",
        "targetTask": {
          "id": "uuid",
          "title": "Setup development environment"
        }
      }
    ],
    "comments": [
      {
        "id": "uuid",
        "author": "John Doe",
        "content": "Started working on this, need access to production environment",
        "mentions": ["@jane"],
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "attachments": [...],
    "worklog": [
      {
        "id": "uuid",
        "user": "John Doe",
        "timeSpent": 2,
        "description": "Initial setup and research",
        "date": "2024-01-01"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

PUT /{taskId}
Description: Cập nhật task
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "Updated task title",
    "description": "Updated description",
    "status": "In Review",
    "priority": "Medium",
    "assignee": "new-assignee-uuid",
    "storyPoint": 4,
    "timeEstimation": 10,
    "labels": ["backend", "api", "security"]
  }
Response: 200
  {
    "id": "uuid",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "In Review",
    "priority": "Medium",
    "assignee": {...},
    "storyPoint": 4,
    "timeEstimation": 10,
    "labels": ["backend", "api", "security"],
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /{taskId}
Description: Xóa task
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Task deleted successfully"
  }
```

#### Subtask Management

```yaml
POST /{taskId}/subtasks
Description: Tạo subtask
Headers: Authorization: Bearer {token}
Request Body:
  {
    "title": "Write unit tests",
    "description": "Create comprehensive unit tests for login functionality",
    "assignee": "user-uuid",
    "timeEstimation": 3
  }
Response: 201
  {
    "id": "uuid",
    "title": "Write unit tests",
    "description": "Create comprehensive unit tests for login functionality",
    "type": "SubTask",
    "status": "To Do",
    "assignee": {...},
    "parentId": "parent-task-uuid",
    "timeEstimation": 3,
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{taskId}/subtasks
Description: Lấy danh sách subtasks
Headers: Authorization: Bearer {token}
Response: 200
  {
    "subtasks": [
      {
        "id": "uuid",
        "title": "Write unit tests",
        "status": "To Do",
        "assignee": "John Doe",
        "timeEstimation": 3,
        "timeSpent": 0
      }
    ]
  }

PUT /subtasks/{subtaskId}
Description: Cập nhật subtask
Headers: Authorization: Bearer {token}
Request Body:
  {
    "status": "Done",
    "timeSpent": 3
  }
Response: 200
  {
    "id": "uuid",
    "status": "Done",
    "timeSpent": 3,
    "updatedAt": "2024-01-01T00:00:00Z"
  }
```

#### Task Relationships

```yaml
POST /{taskId}/relationships
Description: Tạo relationship giữa tasks
Headers: Authorization: Bearer {token}
Request Body:
  {
    "type": "Blocked By",
    "targetTaskId": "target-task-uuid"
  }
Response: 201
  {
    "id": "uuid",
    "type": "Blocked By",
    "targetTask": {
      "id": "target-task-uuid",
      "title": "Setup database"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{taskId}/relationships
Description: Lấy danh sách relationships
Headers: Authorization: Bearer {token}
Response: 200
  {
    "relationships": [
      {
        "id": "uuid",
        "type": "Blocked By",
        "targetTask": {
          "id": "uuid",
          "title": "Setup database",
          "status": "Done"
        }
      },
      {
        "id": "uuid",
        "type": "Related to",
        "targetTask": {
          "id": "uuid",
          "title": "Implement logout API",
          "status": "To Do"
        }
      }
    ]
  }

DELETE /{taskId}/relationships/{relationshipId}
Description: Xóa relationship
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Relationship removed successfully"
  }
```

#### Comments & Communication

```yaml
POST /{taskId}/comments
Description: Thêm comment
Headers: Authorization: Bearer {token}
Request Body:
  {
    "content": "I've completed the initial implementation. @john please review.",
    "mentions": ["john-user-uuid"]
  }
Response: 201
  {
    "id": "uuid",
    "author": {
      "id": "uuid",
      "fullName": "Jane Smith",
      "avatar": "url"
    },
    "content": "I've completed the initial implementation. @john please review.",
    "mentions": ["john-user-uuid"],
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{taskId}/comments
Description: Lấy danh sách comments
Headers: Authorization: Bearer {token}
Query Params:
  - limit?: number (default: 20)
  - offset?: number (default: 0)
Response: 200
  {
    "comments": [
      {
        "id": "uuid",
        "author": {...},
        "content": "I've completed the initial implementation. @john please review.",
        "mentions": [...],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1
  }

PUT /{taskId}/comments/{commentId}
Description: Cập nhật comment
Headers: Authorization: Bearer {token}
Request Body:
  {
    "content": "Updated comment content"
  }
Response: 200
  {
    "id": "uuid",
    "content": "Updated comment content",
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /{taskId}/comments/{commentId}
Description: Xóa comment
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Comment deleted successfully"
  }
```

#### Time Tracking

```yaml
POST /{taskId}/worklog
Description: Log thời gian làm việc
Headers: Authorization: Bearer {token}
Request Body:
  {
    "timeSpent": 2,
    "description": "Implemented authentication logic",
    "date": "2024-01-01"
  }
Response: 201
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "fullName": "John Doe"
    },
    "timeSpent": 2,
    "description": "Implemented authentication logic",
    "date": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{taskId}/worklog
Description: Lấy worklog history
Headers: Authorization: Bearer {token}
Response: 200
  {
    "worklog": [
      {
        "id": "uuid",
        "user": "John Doe",
        "timeSpent": 2,
        "description": "Implemented authentication logic",
        "date": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalTimeSpent": 5
  }

PUT /{taskId}/time-spent
Description: Cập nhật tổng thời gian đã spend
Headers: Authorization: Bearer {token}
Request Body:
  {
    "timeSpent": 8
  }
Response: 200
  {
    "id": "uuid",
    "timeSpent": 8,
    "updatedAt": "2024-01-01T00:00:00Z"
  }
```

## 6. Daily Scrum Service API

### Base URL: `/api/v1/projects/{projectId}/daily-scrum`

#### Daily Updates

```yaml
GET /
Description: Lấy daily scrum updates
Headers: Authorization: Bearer {token}
Query Params:
  - date?: string (YYYY-MM-DD, default: today)
  - sprint?: string
  - user?: string
  - limit?: number (default: 50)
Response: 200
  {
    "date": "2024-01-01",
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1"
    },
    "updates": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatar": "url",
          "role": "Developer"
        },
        "whatDidYesterday": "Completed user authentication API implementation",
        "whatWillDoToday": "Start working on password reset functionality",
        "blockers": "Need access to email service configuration",
        "submittedAt": "2024-01-01T09:15:00Z",
        "tasks": [
          {
            "id": "uuid",
            "title": "Implement login API",
            "status": "Done"
          },
          {
            "id": "uuid", 
            "title": "Password reset API",
            "status": "To Do"
          }
        ]
      }
    ],
    "stats": {
      "totalMembers": 5,
      "submittedUpdates": 4,
      "pendingUpdates": 1,
      "blockers": 2
    }
  }

POST /
Description: Tạo/cập nhật daily scrum cho hôm nay
Headers: Authorization: Bearer {token}
Request Body:
  {
    "sprintId": "sprint-uuid",
    "whatDidYesterday": "Completed user authentication API implementation and wrote unit tests",
    "whatWillDoToday": "Start working on password reset functionality and integrate with email service",
    "blockers": "Need access to production email service configuration from DevOps team"
  }
Response: 201
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "fullName": "John Doe"
    },
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1"
    },
    "date": "2024-01-01",
    "whatDidYesterday": "Completed user authentication API implementation and wrote unit tests",
    "whatWillDoToday": "Start working on password reset functionality and integrate with email service",
    "blockers": "Need access to production email service configuration from DevOps team",
    "submittedAt": "2024-01-01T09:15:00Z",
    "relatedTasks": [
      {
        "id": "uuid",
        "title": "Implement login API",
        "status": "Done"
      }
    ]
  }

GET /{updateId}
Description: Lấy chi tiết daily update
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "user": {...},
    "sprint": {...},
    "date": "2024-01-01",
    "whatDidYesterday": "...",
    "whatWillDoToday": "...",
    "blockers": "...",
    "submittedAt": "2024-01-01T09:15:00Z",
    "updatedAt": "2024-01-01T09:20:00Z",
    "relatedTasks": [...],
    "previousUpdate": {
      "id": "uuid",
      "date": "2023-12-31",
      "whatWillDoToday": "Work on authentication API"
    }
  }

PUT /{updateId}
Description: Cập nhật daily scrum (chỉ trong ngày)
Headers: Authorization: Bearer {token}
Request Body:
  {
    "whatDidYesterday": "Updated content",
    "whatWillDoToday": "Updated plan",
    "blockers": "Updated blockers"
  }
Response: 200
  {
    "id": "uuid",
    "whatDidYesterday": "Updated content",
    "whatWillDoToday": "Updated plan", 
    "blockers": "Updated blockers",
    "updatedAt": "2024-01-01T10:30:00Z"
  }

DELETE /{updateId}
Description: Xóa daily update (chỉ trong ngày)
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Daily scrum update deleted successfully"
  }
```

#### History & Analytics

```yaml
GET /history
Description: Lấy lịch sử daily scrum
Headers: Authorization: Bearer {token}
Query Params:
  - sprint?: string
  - user?: string
  - startDate?: string (YYYY-MM-DD)
  - endDate?: string (YYYY-MM-DD)
  - limit?: number (default: 30)
Response: 200
  {
    "history": [
      {
        "date": "2024-01-01",
        "sprint": "Sprint 1",
        "updates": [
          {
            "user": "John Doe",
            "whatDidYesterday": "...",
            "whatWillDoToday": "...",
            "blockers": "...",
            "submittedAt": "09:15"
          }
        ],
        "stats": {
          "submittedCount": 4,
          "totalMembers": 5,
          "blockerCount": 2
        }
      }
    ]
  }

GET /analytics
Description: Phân tích daily scrum data
Headers: Authorization: Bearer {token}
Query Params:
  - sprint?: string
  - period?: string (week|month|sprint)
Response: 200
  {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-07"
    },
    "participationRate": {
      "average": 85.7,
      "daily": [
        {
          "date": "2024-01-01",
          "rate": 80.0,
          "submitted": 4,
          "total": 5
        }
      ]
    },
    "blockerAnalysis": {
      "totalBlockers": 8,
      "resolvedBlockers": 5,
      "avgResolutionTime": 1.5,
      "commonBlockers": [
        {
          "category": "Infrastructure",
          "count": 3
        },
        {
          "category": "Dependencies",
          "count": 2
        }
      ]
    },
    "teamTrends": [
      {
        "user": "John Doe",
        "participationRate": 100,
        "avgBlockersPerWeek": 1.2,
        "consistency": "High"
      }
    ]
  }

GET /blockers
Description: Lấy danh sách blockers hiện tại
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (active|resolved)
  - assignee?: string
Response: 200
  {
    "blockers": [
      {
        "id": "uuid",
        "description": "Need access to production email service configuration",
        "reportedBy": "John Doe",
        "reportedDate": "2024-01-01",
        "status": "active",
        "assignedTo": "DevOps Team",
        "priority": "High",
        "relatedTasks": [
          {
            "id": "uuid",
            "title": "Password reset functionality"
          }
        ],
        "updates": [
          {
            "date": "2024-01-01",
            "note": "Contacted DevOps team"
          }
        ]
      }
    ]
  }

PUT /blockers/{blockerId}/resolve
Description: Đánh dấu blocker đã resolved
Headers: Authorization: Bearer {token}
Request Body:
  {
    "resolution": "Access granted by DevOps team",
    "resolvedBy": "admin-user-uuid"
  }
Response: 200
  {
    "id": "uuid",
    "status": "resolved",
    "resolution": "Access granted by DevOps team",
    "resolvedBy": "Admin User",
    "resolvedAt": "2024-01-01T14:30:00Z"
  }
```

#### Reminders & Notifications

```yaml
GET /reminders
Description: Lấy cài đặt reminder của user
Headers: Authorization: Bearer {token}
Response: 200
  {
    "reminders": [
      {
        "id": "uuid",
        "projectId": "project-uuid",
        "reminderTime": "09:00",
        "isEnabled": true,
        "timezone": "Asia/Ho_Chi_Minh"
      }
    ]
  }

POST /reminders
Description: Tạo reminder mới
Headers: Authorization: Bearer {token}
Request Body:
  {
    "reminderTime": "09:00",
    "timezone": "Asia/Ho_Chi_Minh"
  }
Response: 201
  {
    "id": "uuid",
    "projectId": "project-uuid",
    "reminderTime": "09:00",
    "isEnabled": true,
    "timezone": "Asia/Ho_Chi_Minh",
    "createdAt": "2024-01-01T00:00:00Z"
  }

PUT /reminders/{reminderId}
Description: Cập nhật reminder
Headers: Authorization: Bearer {token}
Request Body:
  {
    "reminderTime": "08:30",
    "isEnabled": false
  }
Response: 200
  {
    "id": "uuid",
    "reminderTime": "08:30",
    "isEnabled": false,
    "updatedAt": "2024-01-01T00:00:00Z"
  }

DELETE /reminders/{reminderId}
Description: Xóa reminder
Headers: Authorization: Bearer {token}
Response: 200
  {
    "message": "Reminder deleted successfully"
  }

GET /missing-updates
Description: Lấy danh sách members chưa update (cho SM)
Headers: Authorization: Bearer {token}
Query Params:
  - date?: string (default: today)
Response: 200
  {
    "date": "2024-01-01",
    "missingUpdates": [
      {
        "user": {
          "id": "uuid",
          "fullName": "Jane Smith",
          "email": "jane@example.com"
        },
        "lastUpdate": "2023-12-29",
        "consecutiveMissed": 2
      }
    ],
    "stats": {
      "totalMembers": 5,
      "submitted": 4,
      "missing": 1
    }
  }

POST /send-reminders
Description: Gửi reminder cho members chưa update (cho SM)
Headers: Authorization: Bearer {token}
Request Body:
  {
    "userIds": ["user1", "user2"],
    "message": "Please don't forget to submit your daily scrum update"
  }
Response: 200
  {
    "sent": ["user1", "user2"],
    "failed": [],
    "message": "Reminders sent successfully"
  }
```

## 7. Sprint Review & Retrospective Service API

### Base URL: `/api/v1/projects/{projectId}/sprints/{sprintId}`

#### Sprint Review

```yaml
GET /review
Description: Lấy dữ liệu sprint review
Headers: Authorization: Bearer {token}
Response: 200
  {
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1",
      "goal": "Implement basic user authentication",
      "plannedStartDate": "2024-01-01",
      "plannedEndDate": "2024-01-14",
      "actualStartDate": "2024-01-01",
      "actualEndDate": "2024-01-14",
      "status": "Completed"
    },
    "completion": {
      "totalStoryPoints": 20,
      "completedStoryPoints": 18,
      "completionRate": 90,
      "totalTasks": 15,
      "completedTasks": 14
    },
    "workItems": {
      "completed": [
        {
          "id": "uuid",
          "type": "UserStory",
          "title": "User login functionality",
          "storyPoint": 8,
          "assignee": "John Doe",
          "completedAt": "2024-01-12T00:00:00Z"
        }
      ],
      "incomplete": [
        {
          "id": "uuid",
          "type": "Task", 
          "title": "Password strength validation",
          "storyPoint": 2,
          "assignee": "Jane Smith",
          "reason": "Waiting for security team approval"
        }
      ]
    },
    "teamPerformance": [
      {
        "user": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatar": "url"
        },
        "assignedTasks": 5,
        "completedTasks": 5,
        "storyPointsCompleted": 12,
        "completionRate": 100
      }
    ],
    "velocity": {
      "current": 18,
      "average": 16,
      "trend": "increasing"
    },
    "burndown": {
      "planned": [20, 15, 10, 5, 0],
      "actual": [20, 16, 12, 6, 2]
    }
  }

POST /review
Description: Tạo sprint review
Headers: Authorization: Bearer {token}
Request Body:
  {
    "reviewDate": "2024-01-14",
    "notes": "Great sprint overall. Team delivered most planned features.",
    "stakeholderFeedback": [
      {
        "stakeholder": "Product Manager",
        "feedback": "Login flow looks great, users will love the SSO option"
      }
    ],
    "demoItems": [
      {
        "workItemId": "story-uuid",
        "demoUrl": "https://demo.example.com/login",
        "notes": "Demonstrated login with Google SSO"
      }
    ]
  }
Response: 201
  {
    "id": "uuid",
    "sprintId": "sprint-uuid",
    "reviewDate": "2024-01-14",
    "completedStoryPoints": 18,
    "completedTasks": 14,
    "totalTasks": 15,
    "completionRate": 93.3,
    "notes": "Great sprint overall. Team delivered most planned features.",
    "reviewedBy": "current-user-uuid",
    "stakeholderFeedback": [...],
    "demoItems": [...],
    "createdAt": "2024-01-14T00:00:00Z"
  }

PUT /review/{reviewId}
Description: Cập nhật sprint review
Headers: Authorization: Bearer {token}
Request Body:
  {
    "notes": "Updated review notes",
    "stakeholderFeedback": [...]
  }
Response: 200
  {
    "id": "uuid",
    "notes": "Updated review notes",
    "stakeholderFeedback": [...],
    "updatedAt": "2024-01-14T00:00:00Z"
  }

GET /review/export
Description: Xuất sprint review report
Headers: Authorization: Bearer {token}
Query Params:
  - format?: string (pdf|excel|json)
Response: 200
  {
    "downloadUrl": "https://storage.example.com/reports/sprint-1-review.pdf",
    "expiresAt": "2024-01-15T00:00:00Z"
  }
```

#### Sprint Retrospective

```yaml
GET /retrospective
Description: Lấy dữ liệu retrospective
Headers: Authorization: Bearer {token}
Response: 200
  {
    "retrospective": {
      "id": "uuid",
      "sprintId": "sprint-uuid",
      "status": "in_progress",
      "facilitator": "Scrum Master",
      "format": "StartStopContinue",
      "createdAt": "2024-01-14T00:00:00Z"
    },
    "feedback": {
      "start": [
        {
          "id": "uuid",
          "content": "Daily code reviews to catch issues early",
          "author": "John Doe",
          "isAnonymous": false,
          "votes": 3,
          "createdAt": "2024-01-14T00:00:00Z"
        }
      ],
      "stop": [
        {
          "id": "uuid",
          "content": "Long meetings without clear agenda",
          "author": "Anonymous",
          "isAnonymous": true,
          "votes": 5,
          "createdAt": "2024-01-14T00:00:00Z"
        }
      ],
      "continue": [
        {
          "id": "uuid",
          "content": "Pair programming sessions, very effective",
          "author": "Jane Smith", 
          "isAnonymous": false,
          "votes": 4,
          "createdAt": "2024-01-14T00:00:00Z"
        }
      ]
    },
    "actionItems": [
      {
        "id": "uuid",
        "description": "Implement daily code review process",
        "assignee": "John Doe",
        "deadline": "2024-01-21",
        "status": "Open",
        "createdFromFeedback": "feedback-uuid"
      }
    ],
    "stats": {
      "totalParticipants": 5,
      "submittedFeedback": 4,
      "anonymousCount": 2,
      "totalActionItems": 3
    }
  }

POST /retrospective
Description: Tạo retrospective session
Headers: Authorization: Bearer {token}
Request Body:
  {
    "format": "StartStopContinue",
    "facilitator": "current-user-uuid"
  }
Response: 201
  {
    "id": "uuid",
    "sprintId": "sprint-uuid",
    "status": "in_progress",
    "format": "StartStopContinue",
    "facilitator": "current-user-uuid",
    "createdAt": "2024-01-14T00:00:00Z"
  }

POST /retrospective/{retroId}/feedback
Description: Gửi feedback cho retrospective
Headers: Authorization: Bearer {token}
Request Body:
  {
    "category": "Start",
    "content": "Daily code reviews to catch issues early",
    "isAnonymous": false
  }
Response: 201
  {
    "id": "uuid",
    "retrospectiveId": "retro-uuid",
    "category": "Start",
    "content": "Daily code reviews to catch issues early",
    "author": "John Doe",
    "isAnonymous": false,
    "votes": 0,
    "createdAt": "2024-01-14T00:00:00Z"
  }

PUT /retrospective/{retroId}/feedback/{feedbackId}/vote
Description: Vote cho feedback
Headers: Authorization: Bearer {token}
Request Body:
  {
    "action": "upvote"
  }
Response: 200
  {
    "id": "uuid",
    "votes": 4,
    "userVoted": true
  }

POST /retrospective/{retroId}/action-items
Description: Tạo action items từ feedback
Headers: Authorization: Bearer {token}
Request Body:
  {
    "actionItems": [
      {
        "description": "Implement daily code review process", 
        "assignee": "john-uuid",
        "deadline": "2024-01-21",
        "feedbackId": "feedback-uuid"
      },
      {
        "description": "Create meeting agenda template",
        "assignee": "jane-uuid", 
        "deadline": "2024-01-18",
        "feedbackId": "feedback-uuid"
      }
    ]
  }
Response: 201
  {
    "actionItems": [
      {
        "id": "uuid",
        "description": "Implement daily code review process",
        "assignee": "John Doe",
        "deadline": "2024-01-21",
        "status": "Open",
        "createdAt": "2024-01-14T00:00:00Z"
      }
    ]
  }

PUT /retrospective/{retroId}/action-items/{actionId}
Description: Cập nhật action item
Headers: Authorization: Bearer {token}
Request Body:
  {
    "status": "In Progress",
    "notes": "Started working on code review guidelines"
  }
Response: 200
  {
    "id": "uuid",
    "status": "In Progress",
    "notes": "Started working on code review guidelines",
    "updatedAt": "2024-01-16T00:00:00Z"
  }

POST /retrospective/{retroId}/complete
Description: Hoàn thành retrospective session
Headers: Authorization: Bearer {token}
Request Body:
  {
    "summary": "Good participation from team. 3 action items created for next sprint."
  }
Response: 200
  {
    "id": "uuid",
    "status": "completed",
    "summary": "Good participation from team. 3 action items created for next sprint.",
    "completedAt": "2024-01-14T00:00:00Z"
  }
```

#### Action Items Tracking

```yaml
GET /action-items
Description: Lấy action items từ các retrospectives trước
Headers: Authorization: Bearer {token}
Query Params:
  - status?: string (Open|In Progress|Done)
  - assignee?: string
  - sprint?: string (from which retrospective)
Response: 200
  {
    "actionItems": [
      {
        "id": "uuid",
        "description": "Implement daily code review process",
        "assignee": "John Doe",
        "deadline": "2024-01-21",
        "status": "In Progress", 
        "progress": 60,
        "retrospective": {
          "id": "uuid",
          "sprintName": "Sprint 1"
        },
        "updates": [
          {
            "date": "2024-01-16",
            "note": "Created code review guidelines document",
            "updatedBy": "John Doe"
          }
        ],
        "createdAt": "2024-01-14T00:00:00Z"
      }
    ]
  }

POST /action-items/{actionId}/updates
Description: Cập nhật tiến độ action item
Headers: Authorization: Bearer {token}
Request Body:
  {
    "note": "Completed guidelines and started training team",
    "progress": 80
  }
Response: 201
  {
    "id": "uuid",
    "actionItemId": "action-uuid",
    "note": "Completed guidelines and started training team",
    "progress": 80,
    "updatedBy": "John Doe",
    "createdAt": "2024-01-18T00:00:00Z"
  }

GET /retrospective/history
Description: Lấy lịch sử retrospectives
Headers: Authorization: Bearer {token}
Query Params:
  - limit?: number (default: 10)
  - offset?: number (default: 0)
Response: 200
  {
    "retrospectives": [
      {
        "id": "uuid",
        "sprint": {
          "id": "uuid",
          "name": "Sprint 1"
        },
        "facilitator": "Scrum Master",
        "participantCount": 5,
        "feedbackCount": 12,
        "actionItemsCount": 3,
        "actionItemsCompleted": 1,
        "completedAt": "2024-01-14T00:00:00Z"
      }
    ],
    "total": 1
  }

GET /retrospective/analytics
Description: Phân tích retrospective trends
Headers: Authorization: Bearer {token}
Query Params:
  - period?: string (last_3_sprints|last_6_sprints|all)
Response: 200
  {
    "period": "last_3_sprints",
    "trends": {
      "participationRate": {
        "average": 87,
        "trend": "stable"
      },
      "actionItemCompletion": {
        "average": 75,
        "trend": "improving"
      },
      "commonThemes": [
        {
          "theme": "Communication",
          "frequency": 8,
          "sentiment": "mixed"
        },
        {
          "theme": "Process",
          "frequency": 6,
          "sentiment": "positive"
        }
      ]
    },
    "improvements": [
      {
        "area": "Code Quality",
        "progress": "significant",
        "evidence": "Bug count reduced by 40%"
      }
    ]
  }
```

Tôi đã hoàn thành 7/10 services. Còn lại 3 services nữa (Reporting, Notification, File Storage). Bạn có muốn tôi tiếp tục viết API specs cho các services còn lại không?
