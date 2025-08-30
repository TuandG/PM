# Kiến trúc Microservices cho Hệ thống Scrum Management

## 1. Tổng quan

Dựa trên tài liệu đặc tả, hệ thống Scrum Management sẽ được thiết kế theo kiến trúc microservices với các service độc lập, phù hợp với từng domain nghiệp vụ.

### Danh sách các Microservices:
1. **User Management Service** - Quản lý người dùng và xác thực
2. **Project Management Service** - Quản lý dự án và thành viên
3. **Backlog & Task Management Service** - Quản lý backlog, user stories, và tasks
4. **Sprint Lifecycle Management Service** - Quản lý toàn bộ lifecycle của sprint
5. **Daily Scrum Service** - Quản lý daily scrum updates
7. **Notification Service** - Quản lý thông báo hệ thống

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
interface BaseModel {
  id: UUID
  createdAt: Date
  updatedAt: Date
  createdBy: UUID
  updatedBy: UUID
}
```

```typescript
interface User extends BaseModel {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  isVerified: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
}

interface SSOProvider {
  userId: UUID
  provider: 'google' | 'github' (EnumType.String)
  providerId: string
  email: string
}
```

### 2.2 Project Management Service
**Mục đích**: Quản lý dự án và thành viên

**Chức năng chính**:
- CRUD dự án
- Quản lý thành viên dự án
- Phân quyền vai trò trong dự án

**Model Data**:
```typescript
interface Project extends BaseModel {
  name: string
  description?: string
  startDate: Date
  endDate: Date
  status: 'Active' | 'Inactive' | 'Completed'
}

interface ProjectSetting extends BaseModel {
  projectId: UUID
  defaultSPLimit: number
  defaultReminderTime: timeIso
  ...
}

interface Invitation extends BaseModel {
  userId: UUID
  projectId: UUID
  expiredDate: Date
  status: 'Accepted', 'Rejected', 'Pending', 'Canceled'
}

interface ProjectMember extends BaseModel {
  projectId: UUID
  userId: UUID
  role: ProjectRole
  joinedAt: Date
}

interface ProjectRole extends BaseModel{
  role: string
  permissions: Permission[]
}

interface Permission extends BaseModel {
  resource: string
  actions: string
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
interface WorkItem extends BaseModel {
  projectId: UUID
  sprintId?: UUID
  title: string
  description?: string
  priority: 'High' | 'Medium' | 'Low' | number
  storyPoint?: number
  status: 'Backlog' | 'Planned' | 'To do' | 'In Progress' | 'In Review' | 'Done' | 'Canceled'
  assignee?: string
  reporter?: string
  timeEstimation?: number
  epicId?: UUID
  parentId?: string // For subtasks
  itemType: 'Story' | 'Task' | 'Bug' | 'SubTask'
}

interface Label extends BaseModel {
  projectId: UUID
  name: string
  description: string
}

interface WorkItemLabel extends BaseModel {
  workItemId: UUID
  labelId: UUID
}

interface Epic extends BaseModel {
  projectId: string
  title: string
  description: string
}

interface Attachment extends BaseModel {
  relatedId: UUID
  relatedType: 'WorkItem' | 'TaskComment'
  filename: string
  mineType: string 
  url: string
}

interface TaskRelationship extends BaseModel {
  type: 'Blocked' | 'Duplicated' | 'Related to' | 'Parent'
  targetTaskId: UUID
  workItemId: UUID
}

interface TaskComment extends BaseModel {
  taskId: string
  authorId: string
}

interface CommentToken extends BaseModel {
  taskCommentId: UUID
  mentionId?: UUID
  text: string
  index: number
  type: 'text' | 'mention'
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
interface Sprint extends BaseModel {
  projectId: string
  name: string
  goal: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate?: Date
  actualEndDate?: Date
  status: 'Planned' | 'In progress' | 'Completed' | 'Canceled'
  storyPointLimit?: number // = project.defaultSPLimit
  velocity?: number
}

interface SprintReview extends BaseModel{
  completedStoryPoints: number
  completedTasks: number
  totalTasks: number
  completionRate: number
  reviewDate: Date
  reviewedBy: string
  notes: string
}

interface SprintRetrospective extends BaseModel{
  sprintId: UUID
  createdAt: Date
  content: string
}

interface RetrospectiveFeedback extends BaseModel{
  retrospectiveId: UUID
  userId: UUID
  category: 'Start' | 'Stop' | 'Continue'
  content: string
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
interface DailyRecord extends BaseModel{
  projectId: UUID
  sprintId: UUID
  userId: UUID
  date: Date
  whatDidYesterday: string
  whatWillDoToday: string
  blockers: string
}

interface DailyReminder {
  projectId: UUID
  userId: string
  reminderTime: string // HH:mm format // project.defaultReminderTime
  isEnabled: boolean
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
interface Notification extends BaseModel{
  userId: UUID
  type: 'Task' | 'Comment' | 'Mention' | 'System'
  title: string
  content: string
  resourceType: string
  resourceId: string
  isRead?: boolean
  channels: ('email' | 'in-app' | 'push')[]
}

interface NotificationSettings extends BaseModel{
  projectId: UUID
  userId: UUID
  emailEnabled: boolean
  inAppEnabled: boolean
  eventTypes: string[]
}
```
