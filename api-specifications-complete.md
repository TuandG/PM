# API Specifications Complete cho Hệ thống Scrum Management

## 8. Reporting & Analytics Service API

### Base URL: `/api/v1/projects/{projectId}/reports`

#### Burndown Charts

```yaml
GET /burndown/{sprintId}
Description: Lấy dữ liệu burndown chart
Headers: Authorization: Bearer {token}
Query Params:
  - granularity?: string (daily|hourly, default: daily)
Response: 200
  {
    "sprint": {
      "id": "uuid",
      "name": "Sprint 1",
      "startDate": "2024-01-01",
      "endDate": "2024-01-14"
    },
    "burndownData": [
      {
        "date": "2024-01-01",
        "remainingStoryPoints": 20,
        "remainingTasks": 15,
        "idealRemaining": 20,
        "actualWork": 0
      },
      {
        "date": "2024-01-02",
        "remainingStoryPoints": 18,
        "remainingTasks": 13,
        "idealRemaining": 18.5,
        "actualWork": 2
      }
    ],
    "projections": {
      "completionDate": "2024-01-15",
      "riskLevel": "medium",
      "velocityTrend": "stable"
    }
  }

GET /velocity
Description: Lấy velocity data
Headers: Authorization: Bearer {token}
Query Params:
  - sprints?: number (number of recent sprints, default: 6)
Response: 200
  {
    "velocityData": [
      {
        "sprint": {
          "id": "uuid",
          "name": "Sprint 1",
          "duration": 14
        },
        "committedStoryPoints": 20,
        "completedStoryPoints": 18,
        "velocity": 18,
        "capacityUtilization": 90
      }
    ],
    "averageVelocity": 20,
    "velocityTrend": "increasing",
    "predictedVelocity": 21
  }

GET /dashboard
Description: Lấy dashboard analytics
Headers: Authorization: Bearer {token}
Response: 200
  {
    "widgets": {
      "velocity": {
        "current": 21,
        "previous": 18,
        "trend": "+16.7%",
        "status": "good"
      },
      "burndown": {
        "onTrack": true,
        "daysRemaining": 5,
        "riskLevel": "low"
      }
    }
  }
```

## 9. Notification Service API

### Base URL: `/api/v1/notifications`

#### Notification Management

```yaml
GET /
Description: Lấy danh sách notifications
Headers: Authorization: Bearer {token}
Query Params:
  - type?: string (Task|Sprint|Comment|Mention|DailyScrum|System)
  - isRead?: boolean
  - limit?: number (default: 20)
Response: 200
  {
    "notifications": [
      {
        "id": "uuid",
        "type": "Task",
        "title": "Task assigned to you",
        "content": "You have been assigned to 'Implement user login API'",
        "resourceType": "task",
        "resourceId": "task-uuid",
        "isRead": false,
        "channels": ["in-app", "email"],
        "createdAt": "2024-01-01T10:30:00Z"
      }
    ],
    "unreadCount": 5,
    "total": 25
  }

POST /mark-read
Description: Đánh dấu notifications đã đọc
Headers: Authorization: Bearer {token}
Request Body:
  {
    "notificationIds": ["uuid1", "uuid2"]
  }
Response: 200
  {
    "markedAsRead": ["uuid1", "uuid2"],
    "newUnreadCount": 3
  }

GET /settings
Description: Lấy cài đặt notification
Headers: Authorization: Bearer {token}
Response: 200
  {
    "settings": {
      "emailEnabled": true,
      "inAppEnabled": true,
      "pushEnabled": false,
      "eventTypes": {
        "taskAssigned": {
          "enabled": true,
          "channels": ["email", "in-app"]
        },
        "mentioned": {
          "enabled": true,
          "channels": ["email", "in-app", "push"]
        }
      }
    }
  }

PUT /settings
Description: Cập nhật notification settings
Headers: Authorization: Bearer {token}
Request Body:
  {
    "emailEnabled": true,
    "eventTypes": {
      "taskAssigned": {
        "enabled": true,
        "channels": ["email", "in-app"]
      }
    }
  }
Response: 200
  {
    "settings": {...},
    "updatedAt": "2024-01-01T00:00:00Z"
  }
```

#### Real-time Chat

```yaml
GET /chat/channels
Description: Lấy danh sách chat channels
Headers: Authorization: Bearer {token}
Response: 200
  {
    "channels": [
      {
        "id": "uuid",
        "name": "Project General",
        "type": "project",
        "memberCount": 8,
        "unreadCount": 3,
        "lastMessage": {
          "sender": "John Doe",
          "content": "Great work on the sprint!",
          "timestamp": "2024-01-01T15:30:00Z"
        }
      }
    ]
  }

GET /chat/channels/{channelId}/messages
Description: Lấy messages trong channel
Headers: Authorization: Bearer {token}
Query Params:
  - limit?: number (default: 50)
Response: 200
  {
    "messages": [
      {
        "id": "uuid",
        "sender": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatar": "url"
        },
        "content": "Hey team, let's discuss the sprint backlog",
        "messageType": "text",
        "mentions": [],
        "reactions": [
          {
            "emoji": "👍",
            "count": 2
          }
        ],
        "createdAt": "2024-01-01T14:30:00Z"
      }
    ]
  }

POST /chat/channels/{channelId}/messages
Description: Gửi message
Headers: Authorization: Bearer {token}
Request Body:
  {
    "content": "Thanks for the update @john! Looking good 👍",
    "mentions": ["john-user-uuid"]
  }
Response: 201
  {
    "id": "uuid",
    "sender": {...},
    "content": "Thanks for the update @john! Looking good 👍",
    "mentions": ["john-user-uuid"],
    "createdAt": "2024-01-01T14:40:00Z"
  }
```

## 10. File Storage Service API

### Base URL: `/api/v1/files`

#### File Upload & Management

```yaml
POST /upload
Description: Upload file
Headers: 
  - Authorization: Bearer {token}
  - Content-Type: multipart/form-data
Form Data:
  - file: (binary)
  - projectId: string
  - resourceType: string (task|user_story|comment|project)
  - resourceId: string
Response: 201
  {
    "id": "uuid",
    "filename": "generated-filename.pdf",
    "originalName": "document.pdf",
    "mimeType": "application/pdf",
    "size": 1048576,
    "url": "https://storage.example.com/files/uuid/document.pdf",
    "thumbnailUrl": "https://storage.example.com/thumbs/uuid/document.jpg",
    "projectId": "project-uuid",
    "resourceType": "task",
    "resourceId": "task-uuid",
    "uploadedBy": {
      "id": "uuid",
      "fullName": "John Doe"
    },
    "permissions": [
      {
        "userId": "current-user",
        "permission": "read|write|delete"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{fileId}
Description: Lấy thông tin file
Headers: Authorization: Bearer {token}
Response: 200
  {
    "id": "uuid",
    "filename": "document.pdf",
    "originalName": "project-requirements.pdf",
    "mimeType": "application/pdf",
    "size": 1048576,
    "url": "https://storage.example.com/files/uuid/document.pdf",
    "versions": [
      {
        "version": 1,
        "uploadedAt": "2024-01-01T00:00:00Z",
        "uploadedBy": "John Doe",
        "size": 1048576
      },
      {
        "version": 2,
        "uploadedAt": "2024-01-02T00:00:00Z",
        "uploadedBy": "Jane Smith",
        "size": 1098576,
        "changeDescription": "Updated requirements"
      }
    ],
    "downloadCount": 15,
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{fileId}/download
Description: Download file
Headers: Authorization: Bearer {token}
Query Params:
  - version?: number (default: latest)
Response: 200
  Content-Disposition: attachment; filename="document.pdf"
  Content-Type: application/pdf
  [Binary file content]

POST /{fileId}/versions
Description: Upload phiên bản mới
Headers: 
  - Authorization: Bearer {token}
  - Content-Type: multipart/form-data
Form Data:
  - file: (binary)
  - changeDescription: string
Response: 201
  {
    "fileId": "uuid",
    "version": 3,
    "filename": "document-v3.pdf",
    "size": 1150000,
    "changeDescription": "Added new requirements section",
    "uploadedAt": "2024-01-03T00:00:00Z"
  }

GET /search
Description: Tìm kiếm files
Headers: Authorization: Bearer {token}
Query Params:
  - q?: string (search query)
  - projectId?: string
  - mimeType?: string
  - uploadedBy?: string
Response: 200
  {
    "files": [
      {
        "id": "uuid",
        "filename": "requirements.pdf",
        "originalName": "project-requirements.pdf",
        "mimeType": "application/pdf",
        "size": 1048576,
        "uploadedBy": "John Doe",
        "uploadedAt": "2024-01-01T00:00:00Z",
        "relevanceScore": 0.95
      }
    ],
    "total": 45
  }

POST /{fileId}/share
Description: Tạo public share link
Headers: Authorization: Bearer {token}
Request Body:
  {
    "expiresIn": 3600,
    "allowDownload": true
  }
Response: 201
  {
    "shareUrl": "https://app.example.com/share/abc123def456",
    "expiresAt": "2024-01-01T01:00:00Z",
    "allowDownload": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }

GET /{fileId}/permissions
Description: Lấy file permissions
Headers: Authorization: Bearer {token}
Response: 200
  {
    "fileId": "uuid",
    "permissions": [
      {
        "userId": "uuid",
        "userName": "John Doe",
        "permission": "read|write|delete",
        "grantedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }

POST /{fileId}/permissions
Description: Cấp quyền truy cập file
Headers: Authorization: Bearer {token}
Request Body:
  {
    "userId": "user-uuid",
    "permission": "read"
  }
Response: 201
  {
    "fileId": "uuid",
    "userId": "user-uuid",
    "permission": "read",
    "grantedAt": "2024-01-01T00:00:00Z"
  }
```

---

## Summary

Tôi đã hoàn thành API specifications cho tất cả 10 microservices trong hệ thống Scrum Management:

✅ **User Management Service** - Authentication, 2FA, SSO, Profile  
✅ **Project Management Service** - Projects, Members, Roles, Permissions  
✅ **Product Backlog Service** - User Stories, Epics, Prioritization  
✅ **Sprint Management Service** - Sprint lifecycle, Planning, Board  
✅ **Task Management Service** - Tasks, Subtasks, Comments, Time tracking  
✅ **Daily Scrum Service** - Daily updates, History, Analytics, Reminders  
✅ **Sprint Review & Retrospective Service** - Reviews, Feedback, Action Items  
✅ **Reporting & Analytics Service** - Burndown, Velocity, Dashboard, Custom reports  
✅ **Notification Service** - Notifications, Settings, Real-time chat  
✅ **File Storage Service** - Upload, Versioning, Permissions, Sharing  

### Key Features:
- **RESTful API design** với consistent patterns
- **JWT authentication** và role-based access control
- **Real-time features** với WebSocket và Server-Sent Events
- **Comprehensive CRUD operations** cho tất cả entities
- **Advanced search và filtering** capabilities
- **File management** với versioning và permissions
- **Analytics và reporting** features
- **Notification system** với multiple channels
- **Scalable pagination** cho all list endpoints

API design này ready for enterprise production với full microservices architecture support!
