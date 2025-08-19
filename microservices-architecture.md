# Kiến trúc Microservices cho Hệ thống Scrum Management

## 1. Tổng quan

Dựa trên tài liệu đặc tả, hệ thống Scrum Management sẽ được thiết kế theo kiến trúc microservices với các service độc lập, phù hợp với từng domain nghiệp vụ.

### Danh sách các Microservices:
1. **User Management Service** - Quản lý người dùng và xác thực
2. **Project Management Service** - Quản lý dự án và thành viên
3. **Backlog & Task Management Service** - Quản lý backlog, user stories, và tasks
4. **Sprint Lifecycle Management Service** - Quản lý toàn bộ lifecycle của sprint
5. **Daily Scrum Service** - Quản lý daily scrum updates
6. **Reporting & Analytics Service** - Báo cáo và phân tích dữ liệu
7. **Notification Service** - Quản lý thông báo hệ thống
8. **Communication Service** - Quản lý chat và giao tiếp
9. **File Storage Service** - Quản lý file và tài liệu

## 2. Phân tích và chia tách thành Microservices

### 2.1 User Management Service
**Mục đích**: Quản lý người dùng, xác thực và phân quyền

**Chức năng chính**:
- Đăng ký, đăng nhập, quản lý tài khoản
- Xác thực 2FA
- Đăng nhập SSO (Google, GitHub)
- Quản lý hồ sơ người dùng

**Model Data**:
```typescript
interface User {
  id: string
  email: string
  passwordHash: string
  fullName: string
  phone?: string
  avatar?: string
  isEmailVerified: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  ssoProviders: SSOProvider[]
  createdAt: Date
  updatedAt: Date
}

interface SSOProvider {
  provider: 'google' | 'github'
  providerId: string
  email: string
}

// interface Session {
//   id: string
//   userId: string
//   token: string
//   refreshToken: string
//   expiresAt: Date
//   createdAt: Date
// }
```

### 2.2 Project Management Service
**Mục đích**: Quản lý dự án và thành viên

**Chức năng chính**:
- CRUD dự án
- Quản lý thành viên dự án
- Phân quyền vai trò trong dự án

**Model Data**:
```typescript
interface Project {
  id: string
  name: string
  description?: string
  startDate: Date
//   endDate: Date 
  status: 'Active' | 'Inactive' | 'In planning' | 'Completed'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface ProjectMember {
  id: string
  projectId: string
  userId: string
  role: 'PO' | 'SM' | 'Developer' | 'Viewer'
  joinedAt: Date
}

interface ProjectRole {
  role: string
  permissions: Permission[]
}

interface Permission {
  resource: string
  actions: string[]
}
```

### 2.3 Backlog & Task Management Service
**Mục đích**: Quản lý Product Backlog, User Stories, Tasks và SubTasks

**Chức năng chính**:
- CRUD User Stories, Tasks, SubTasks
- Quản lý độ ưu tiên
- Gán Stories/Tasks vào Sprint
- Cập nhật trạng thái công việc
- Phân công công việc
- Quản lý Epic và Task relationships

**Model Data**:
```typescript
interface UserStory {
  id: string
  projectId: string
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low' | number
  storyPoint?: number
  status: 'Backlog' | 'Planned' | 'To do' | 'In Progress' | 'In Review' | 'Done' | 'Canceled'
  assignee?: string
  reporter: string
  timeEstimation?: number
  attachments: Attachment[]
  sprintId?: string
  createdAt: Date
  updatedAt: Date
}

interface Epic {
  id: string
  projectId: string
  title: string
  description: string
  stories: string[]
  status: string
}

interface Attachment {
  id: string
  filename: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}

interface Task {
  id: string
  projectId: string
  sprintId?: string
  parentId?: string // For subtasks
  title: string
  description: string
  type: 'Task' | 'Bug' | 'SubTask'
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked'
  priority: 'High' | 'Medium' | 'Low'
  assignee?: string
  reporter: string
  storyPoint?: number
  timeEstimation?: number
  timeSpent?: number
  labels: string[]
  attachments: Attachment[]
  relationships: TaskRelationship[]
  createdAt: Date
  updatedAt: Date
}

interface TaskRelationship {
  type: 'Blocked' | 'Blocked By' | 'Duplicated' | 'Duplicated By' | 'Related to' | 'Child' | 'Parent'
  targetTaskId: string
}

interface TaskComment {
  id: string
  taskId: string
  authorId: string
  content: string
  mentions: string[]
  createdAt: Date
  updatedAt: Date
}
```

### 2.4 Sprint Lifecycle Management Service
**Mục đích**: Quản lý toàn bộ lifecycle của Sprint từ planning đến review và retrospective

**Chức năng chính**:
- CRUD Sprint
- Sprint Planning
- Quản lý Sprint Board
- Theo dõi tiến độ Sprint
- Sprint Review và tổng kết
- Sprint Retrospective và feedback
- Tạo Action Items từ retrospective

**Model Data**:
```typescript
interface Sprint {
  id: string
  projectId: string
  name: string
  goal: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate?: Date
  actualEndDate?: Date
  status: 'Upcoming' | 'Missed' | 'In progress' | 'Completed' | 'Canceled'
  storyPointLimit?: number
  velocity?: number
  createdAt: Date
  updatedAt: Date
}

interface SprintBacklog {
  id: string
  sprintId: string
  workItems: SprintWorkItem[]
}

interface SprintWorkItem {
  id: string
  type: 'UserStory' | 'Task' | 'Bug'
  workItemId: string
  addedAt: Date
}

interface SprintReview {
  id: string
  sprintId: string
  completedStoryPoints: number
  completedTasks: number
  totalTasks: number
  completionRate: number
  reviewDate: Date
  reviewedBy: string
  notes: string
}

interface SprintRetrospective {
  id: string
  sprintId: string
  createdAt: Date
}

interface RetrospectiveFeedback {
  id: string
  retrospectiveId: string
  userId: string
  category: 'Start' | 'Stop' | 'Continue'
  content: string
  isAnonymous: boolean
  createdAt: Date
}

interface ActionItem {
  id: string
  retrospectiveId: string
  description: string
  assignee: string
  deadline: Date
  status: 'Open' | 'In Progress' | 'Done'
  createdAt: Date
}
```

### 2.5 Daily Scrum Service
**Mục đích**: Quản lý Daily Scrum updates

**Chức năng chính**:
- Cập nhật Daily Scrum
- Lưu trữ lịch sử
- Thông báo nhắc nhở

**Model Data**:
```typescript
interface DailyScrum {
  id: string
  projectId: string
  sprintId: string
  userId: string
  date: Date
  whatDidYesterday: string
  whatWillDoToday: string
  blockers: string
  createdAt: Date
  updatedAt: Date
}

interface DailyScrumReminder {
  id: string
  projectId: string
  userId: string
  reminderTime: string // HH:mm format
  isEnabled: boolean
}
```

### 2.6 Reporting & Analytics Service
**Mục đích**: Tạo báo cáo và phân tích dữ liệu

**Chức năng chính**:
- Burndown Chart
- Velocity Chart
- Team Performance Reports
- Export functionality

**Model Data**:
```typescript
interface BurndownData {
  id: string
  sprintId: string
  date: Date
  remainingStoryPoints: number
  remainingTasks: number
  idealRemaining: number
}

interface VelocityData {
  id: string
  projectId: string
  sprintId: string
  committedStoryPoints: number
  completedStoryPoints: number
  sprintDuration: number
}

interface TeamPerformance {
  id: string
  projectId: string
  sprintId: string
  userId: string
  assignedTasks: number
  completedTasks: number
  storyPointsCompleted: number
  period: Date
}

interface Report {
  id: string
  projectId: string
  type: 'Sprint' | 'Velocity' | 'Team Performance' | 'Burndown'
  parameters: any
  generatedBy: string
  generatedAt: Date
  fileUrl?: string
}
```

### 2.7 Notification Service
**Mục đích**: Quản lý thông báo hệ thống

**Chức năng chính**:
- Gửi thông báo (email, in-app, push)
- Quản lý cài đặt thông báo
- Lịch sử thông báo
- Template thông báo

**Model Data**:
```typescript
interface Notification {
  id: string
  userId: string
  type: 'Task' | 'Sprint' | 'Comment' | 'Mention' | 'DailyScrum' | 'System'
  title: string
  content: string
  resourceType: string
  resourceId: string
  isRead: boolean
  channels: ('email' | 'in-app' | 'push')[]
  createdAt: Date
  readAt?: Date
}

interface NotificationSettings {
  id: string
  userId: string
  emailEnabled: boolean
  inAppEnabled: boolean
  pushEnabled: boolean
  eventTypes: string[]
  quietHours?: {
    start: string
    end: string
  }
}

interface NotificationTemplate {
  id: string
  type: string
  subject: string
  emailTemplate: string
  inAppTemplate: string
  pushTemplate: string
  isActive: boolean
}
```

### 2.8 Communication Service
**Mục đích**: Quản lý giao tiếp và chat realtime

**Chức năng chính**:
- Chat realtime
- Quản lý kênh chat
- File sharing trong chat
- Message history
- Mentions và reactions

**Model Data**:
```typescript
interface ChatMessage {
  id: string
  projectId: string
  channelId: string
  senderId: string
  content: string
  messageType: 'text' | 'file' | 'image'
  attachments: Attachment[]
  mentions: string[]
  reactions: MessageReaction[]
  replyToId?: string
  isEdited: boolean
  createdAt: Date
  updatedAt: Date
}

interface ChatChannel {
  id: string
  projectId: string
  name: string
  description?: string
  type: 'project' | 'task' | 'direct'
  members: string[]
  createdBy: string
  createdAt: Date
  lastMessageAt?: Date
}

interface MessageReaction {
  emoji: string
  users: string[]
  count: number
}

interface ChatMember {
  userId: string
  channelId: string
  role: 'admin' | 'member'
  joinedAt: Date
  lastSeenAt?: Date
}
```

### 2.9 File Storage Service
**Mục đích**: Quản lý file và tài liệu

**Chức năng chính**:
- Upload/Download files
- Quản lý quyền truy cập
- Version control

**Model Data**:
```typescript
interface File {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  path: string
  projectId: string
  uploadedBy: string
  resourceType: string
  resourceId: string
  permissions: FilePermission[]
  createdAt: Date
}

interface FilePermission {
  userId: string
  permission: 'read' | 'write' | 'delete'
}

interface FileVersion {
  id: string
  fileId: string
  version: number
  path: string
  uploadedBy: string
  changeDescription: string
  createdAt: Date
}
```

## 3. Kiến trúc hệ thống

### 3.1 API Gateway
- Route requests đến các microservices
- Authentication & Authorization
- Rate limiting
- Request/Response logging

### 3.2 Service Discovery
- Consul hoặc Eureka
- Health checks
- Load balancing

### 3.3 Message Queue
- RabbitMQ hoặc Apache Kafka
- Event-driven communication
- Async processing

### 3.4 Database
- Mỗi service có database riêng
- PostgreSQL cho relational data
- Redis cho caching và session
- MongoDB cho document storage (tùy chọn)

### 3.5 Monitoring & Logging
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Prometheus & Grafana
- Jaeger cho distributed tracing

## 4. Các bước xây dựng dự án

### Phase 1: Foundation (4-6 weeks)
1. **Setup Infrastructure**
   - Setup Docker & Docker Compose
   - Configure API Gateway (Kong/Zuul/Ocelot)
   - Setup service discovery
   - Database setup

2. **Core Services Development**
   - User Management Service
   - Project Management Service
   - Basic authentication & authorization

3. **Frontend Foundation**
   - Setup React/Vue.js application
   - Implement authentication UI
   - Basic project management UI

### Phase 2: Core Features (6-8 weeks)
4. **Backlog & Task Management**
   - Backlog & Task Management Service
   - User Stories và Tasks CRUD
   - Priority management
   - Epic management
   - Task relationships

5. **Sprint Lifecycle Management**
   - Sprint Lifecycle Management Service
   - Sprint CRUD operations
   - Sprint Planning functionality
   - Sprint Board UI
   - Drag & drop functionality

### Phase 3: Collaboration Features (4-6 weeks)
6. **Daily Scrum**
   - Daily Scrum Service
   - Daily updates UI
   - Reminder system

7. **Basic Notifications**
   - Notification Service
   - Basic notification functionality
   - Email notifications
   - In-app notifications

### Phase 4: Analytics & Reporting (4-5 weeks)
8. **Reporting & Analytics**
   - Reporting & Analytics Service
   - Burndown charts
   - Velocity tracking
   - Export functionality
   - Sprint Review integration
   - Retrospective reporting

### Phase 5: Communication & Advanced Features (6-8 weeks)
9. **Communication System**
   - Communication Service
   - Real-time chat
   - Chat channels
   - Message reactions và mentions

10. **File Management**
    - File Storage Service
    - Document management
    - Version control
    - File sharing integration

11. **Advanced Notifications**
    - Enhanced notification templates
    - Advanced notification settings
    - Push notifications

### Phase 6: Performance & Security (3-4 weeks)
12. **Performance & Security**
    - Performance optimization
    - Security hardening
    - Load testing

### Phase 7: Optional Features (4-6 weeks)
13. **Custom Workflows**
    - Workflow designer
    - Custom task states
    - Automation rules

14. **AI Integration**
    - Story point estimation
    - Assignee suggestions
    - Automated reporting

## 5. Technology Stack

### Backend
- **Language**: Node.js (TypeScript) hoặc Java (Spring Boot) hoặc .NET Core
- **Database**: PostgreSQL, Redis
- **Message Queue**: RabbitMQ hoặc Apache Kafka
- **API Gateway**: Kong hoặc Ocelot
- **Service Discovery**: Consul hoặc Eureka

### Frontend
- **Framework**: React với TypeScript hoặc Vue.js
- **State Management**: Redux/Zustand hoặc Vuex/Pinia
- **UI Library**: Ant Design hoặc Material-UI
- **Charts**: Chart.js hoặc D3.js

### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes hoặc Docker Swarm
- **CI/CD**: Jenkins hoặc GitLab CI hoặc GitHub Actions
- **Monitoring**: Prometheus, Grafana, ELK Stack

### Testing
- **Unit Testing**: Jest, JUnit
- **Integration Testing**: Supertest, TestContainers
- **E2E Testing**: Cypress, Selenium

## 6. Deployment Architecture

```
┌─────────────────┐
│   Load Balancer │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   API Gateway   │
└─────────┬───────┘
          │
┌─────────▼───────┐
│ Service Mesh    │
│ (Istio/Linkerd) │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
┌───▼──┐    ┌──▼───┐
│ K8s  │    │ K8s  │
│Node 1│    │Node 2│
└──────┘    └──────┘
```

## 7. Database Design Strategy

### 7.1 Database per Service
Mỗi microservice sẽ có database riêng để đảm bảo độc lập:

- **User Management Service**: user_db
- **Project Management Service**: project_db  
- **Backlog & Task Management Service**: backlog_task_db
- **Sprint Lifecycle Management Service**: sprint_db
- **Daily Scrum Service**: daily_scrum_db
- **Reporting & Analytics Service**: reporting_db
- **Notification Service**: notification_db
- **Communication Service**: communication_db
- **File Storage Service**: file_storage_db

### 7.2 Data Consistency
- **Eventual Consistency**: Sử dụng event-driven architecture
- **Saga Pattern**: Cho distributed transactions
- **CQRS**: Tách read/write operations cho reporting

## 8. Security Considerations

### 8.1 Authentication & Authorization
- JWT tokens với refresh mechanism
- OAuth 2.0 cho SSO
- Role-based access control (RBAC)
- API key management

### 8.2 Data Protection
- Encryption at rest và in transit
- PII data masking
- Audit logs
- Input validation và sanitization

### 8.3 Infrastructure Security
- Network segmentation
- Secrets management (Vault)
- Container security scanning
- Regular security updates

## 9. Performance Considerations

### 9.1 Caching Strategy
- Redis cho session storage
- Application-level caching
- Database query optimization
- CDN cho static assets

### 9.2 Scalability
- Horizontal scaling cho stateless services
- Database sharding nếu cần
- Asynchronous processing
- Connection pooling

## 10. Monitoring & Observability

### 10.1 Metrics
- Service-level metrics (latency, throughput, errors)
- Business metrics (user activity, feature usage)
- Infrastructure metrics (CPU, memory, disk)

### 10.2 Logging
- Structured logging
- Correlation IDs
- Log aggregation
- Error tracking

### 10.3 Tracing
- Distributed tracing
- Request flow visualization
- Performance bottleneck identification

---

Kiến trúc này đảm bảo tính mở rộng, bảo trì và phát triển tương lai của hệ thống Scrum Management. Mỗi service có thể được phát triển, deploy và scale độc lập, phù hợp với quy mô doanh nghiệp.
