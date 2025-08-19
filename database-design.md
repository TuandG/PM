# Database Design cho Hệ thống Scrum Management

## 1. Tổng quan Database Architecture

Hệ thống sử dụng **Database per Service** pattern, mỗi microservice có database riêng để đảm bảo độc lập và khả năng mở rộng.

### Database Distribution:
- **User Management DB**: PostgreSQL
- **Project Management DB**: PostgreSQL  
- **Product Backlog DB**: PostgreSQL
- **Task Management DB**: PostgreSQL
- **Sprint Management DB**: PostgreSQL
- **Daily Scrum DB**: PostgreSQL
- **Review & Retrospective DB**: PostgreSQL
- **Reporting & Analytics DB**: PostgreSQL + Time-series DB
- **Notification DB**: PostgreSQL + Redis
- **File Storage DB**: PostgreSQL + Object Storage

## 2. Chi tiết Database Schema theo Service

### 2.1 User Management Database

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar TEXT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(32),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- SSO Providers table
CREATE TABLE sso_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'github'
    provider_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);
```

### 2.2 Project Management Database

```sql
-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Inactive', 'In planning', 'Completed'
    created_by UUID NOT NULL, -- Reference to User service
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_created_by (created_by),
    INDEX idx_status (status)
);

-- Project Members table
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Reference to User service
    role VARCHAR(50) NOT NULL, -- 'PO', 'SM', 'Developer', 'Viewer'
    joined_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(project_id, user_id),
    INDEX idx_project_id (project_id),
    INDEX idx_user_id (user_id)
);

-- Permissions table
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    actions JSONB NOT NULL, -- ['create', 'read', 'update', 'delete']
    
    UNIQUE(role, resource)
);

// Cần thêm bảng role và role_permission
```

### 2.3 Product Backlog Database

```sql
-- User Stories table
CREATE TABLE user_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL, -- Reference to Project service
    title VARCHAR(500) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'Medium', -- 'High', 'Medium', 'Low' or numeric
    story_point INTEGER,
    status VARCHAR(50) DEFAULT 'Backlog', -- 'Backlog', 'Planned', 'To do', 'In Progress', 'In Review', 'Done', 'Canceled'
    assignee UUID, -- Reference to User service
    reporter UUID NOT NULL, -- Reference to User service
    time_estimation INTEGER, -- in hours
    sprint_id UUID, -- Reference to Sprint service
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_status (status),
    INDEX idx_sprint_id (sprint_id),
    INDEX idx_assignee (assignee)
);

-- Epics table
CREATE TABLE epics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    stories JSONB, -- Array of story IDs
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Attachments table
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    uploaded_by UUID NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    resource_type VARCHAR(50) NOT NULL, -- 'user_story', 'task', 'epic'
    resource_id UUID NOT NULL,
    
    INDEX idx_resource (resource_type, resource_id)
);
```

### 2.4 Task Management Database

```sql
-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    sprint_id UUID,
    parent_id UUID REFERENCES tasks(id), -- For subtasks
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'Task', 'Bug', 'SubTask'
    status VARCHAR(50) DEFAULT 'To Do', -- 'To Do', 'In Progress', 'In Review', 'Done', 'Blocked'
    priority VARCHAR(50) DEFAULT 'Medium',
    assignee UUID,
    reporter UUID NOT NULL,
    story_point INTEGER,
    time_estimation INTEGER,
    time_spent INTEGER DEFAULT 0,
    labels JSONB, -- Array of labels
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_sprint_id (sprint_id),
    INDEX idx_assignee (assignee),
    INDEX idx_status (status),
    INDEX idx_parent_id (parent_id)
);

-- Task Relationships table
CREATE TABLE task_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    target_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'Blocked', 'Blocked By', 'Duplicated', etc.
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(task_id, target_task_id, type)
);

-- Task Comments table
CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    content TEXT NOT NULL,
    mentions JSONB, -- Array of mentioned user IDs
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_task_id (task_id),
    INDEX idx_author_id (author_id)
);
```

### 2.5 Sprint Management Database

```sql
-- Sprints table
CREATE TABLE sprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    goal TEXT,
    planned_start_date DATE NOT NULL,
    planned_end_date DATE NOT NULL,
    actual_start_date DATE,
    actual_end_date DATE,
    status VARCHAR(50) DEFAULT 'Upcoming', -- 'Upcoming', 'Missed', 'In progress', 'Completed', 'Canceled'
    story_point_limit INTEGER,
    velocity INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_status (status)
);

-- Sprint Backlog table
CREATE TABLE sprint_backlogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_id UUID REFERENCES sprints(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sprint Work Items table
CREATE TABLE sprint_work_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_backlog_id UUID REFERENCES sprint_backlogs(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'UserStory', 'Task', 'Bug'
    work_item_id UUID NOT NULL, -- Reference to respective service
    added_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_sprint_backlog_id (sprint_backlog_id),
    INDEX idx_work_item (type, work_item_id)
);
```

### 2.6 Daily Scrum Database

```sql
-- Daily Scrum table
CREATE TABLE daily_scrums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    sprint_id UUID NOT NULL,
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    what_did_yesterday TEXT,
    what_will_do_today TEXT,
    blockers TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(project_id, sprint_id, user_id, date),
    INDEX idx_project_sprint (project_id, sprint_id),
    INDEX idx_date (date)
);

-- Daily Scrum Reminders table
CREATE TABLE daily_scrum_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,
    reminder_time TIME NOT NULL, -- HH:MM format
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(project_id, user_id)
);
```

### 2.7 Sprint Review & Retrospective Database

```sql
-- Sprint Reviews table
CREATE TABLE sprint_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_id UUID NOT NULL,
    completed_story_points INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    total_tasks INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    review_date DATE NOT NULL,
    reviewed_by UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_sprint_id (sprint_id)
);

-- Sprint Retrospectives table
CREATE TABLE sprint_retrospectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_sprint_id (sprint_id)
);

-- Retrospective Feedback table
CREATE TABLE retrospective_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retrospective_id UUID REFERENCES sprint_retrospectives(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Start', 'Stop', 'Continue'
    content TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_retrospective_id (retrospective_id),
    INDEX idx_category (category)
);

-- Action Items table
CREATE TABLE action_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retrospective_id UUID REFERENCES sprint_retrospectives(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    assignee UUID NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Open', -- 'Open', 'In Progress', 'Done'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_retrospective_id (retrospective_id),
    INDEX idx_assignee (assignee),
    INDEX idx_status (status)
);
```

### 2.8 Reporting & Analytics Database

```sql
-- Burndown Data table
CREATE TABLE burndown_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_id UUID NOT NULL,
    date DATE NOT NULL,
    remaining_story_points INTEGER DEFAULT 0,
    remaining_tasks INTEGER DEFAULT 0,
    ideal_remaining INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(sprint_id, date),
    INDEX idx_sprint_date (sprint_id, date)
);

-- Velocity Data table
CREATE TABLE velocity_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    sprint_id UUID NOT NULL,
    committed_story_points INTEGER DEFAULT 0,
    completed_story_points INTEGER DEFAULT 0,
    sprint_duration INTEGER NOT NULL, -- in days
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_sprint_id (sprint_id)
);

-- Team Performance table
CREATE TABLE team_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    sprint_id UUID NOT NULL,
    user_id UUID NOT NULL,
    assigned_tasks INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    story_points_completed INTEGER DEFAULT 0,
    period DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(project_id, sprint_id, user_id, period),
    INDEX idx_project_sprint (project_id, sprint_id),
    INDEX idx_user_period (user_id, period)
);

-- Reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'Sprint', 'Velocity', 'Team Performance', 'Burndown'
    parameters JSONB,
    generated_by UUID NOT NULL,
    generated_at TIMESTAMP DEFAULT NOW(),
    file_url TEXT,
    
    INDEX idx_project_type (project_id, type),
    INDEX idx_generated_by (generated_by)
);
```

### 2.9 Notification Database

```sql
-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'Task', 'Sprint', 'Comment', 'Mention', 'DailyScrum', 'System'
    title VARCHAR(500) NOT NULL,
    content TEXT,
    resource_type VARCHAR(50),
    resource_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    channels JSONB, -- ['email', 'in-app', 'push']
    created_at TIMESTAMP DEFAULT NOW(),
    read_at TIMESTAMP,
    
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Notification Settings table
CREATE TABLE notification_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    email_enabled BOOLEAN DEFAULT TRUE,
    in_app_enabled BOOLEAN DEFAULT TRUE,
    push_enabled BOOLEAN DEFAULT FALSE,
    event_types JSONB, -- Array of event types to receive
    quiet_hours JSONB, -- {start: "22:00", end: "08:00"}
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat Messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    channel_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'file', 'image'
    mentions JSONB, -- Array of mentioned user IDs
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_channel_id (channel_id),
    INDEX idx_project_id (project_id),
    INDEX idx_created_at (created_at)
);

-- Chat Channels table
CREATE TABLE chat_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'project', 'task', 'direct'
    members JSONB, -- Array of member user IDs
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_type (type)
);
```

### 2.10 File Storage Database

```sql
-- Files table
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    path TEXT NOT NULL,
    project_id UUID NOT NULL,
    uploaded_by UUID NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_project_id (project_id),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_uploaded_by (uploaded_by)
);

-- File Permissions table
CREATE TABLE file_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    permission VARCHAR(50) NOT NULL, -- 'read', 'write', 'delete'
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(file_id, user_id, permission),
    INDEX idx_file_id (file_id),
    INDEX idx_user_id (user_id)
);

-- File Versions table
CREATE TABLE file_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    path TEXT NOT NULL,
    uploaded_by UUID NOT NULL,
    change_description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(file_id, version),
    INDEX idx_file_id (file_id)
);
```

## 3. Cross-Service Data Consistency

### 3.1 Event-Driven Architecture
```sql
-- Event Store table (shared across services)
CREATE TABLE event_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    aggregate_id UUID NOT NULL,
    aggregate_type VARCHAR(50) NOT NULL,
    event_data JSONB NOT NULL,
    metadata JSONB,
    version INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_aggregate (aggregate_type, aggregate_id),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at)
);
```

### 3.2 Outbox Pattern
```sql
-- Outbox table (per service)
CREATE TABLE outbox_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    
    INDEX idx_processed_at (processed_at),
    INDEX idx_created_at (created_at)
);
```

## 4. Performance Optimizations

### 4.1 Indexing Strategy
```sql
-- Composite indexes for common queries
CREATE INDEX idx_user_stories_project_status ON user_stories(project_id, status);
CREATE INDEX idx_tasks_sprint_assignee ON tasks(sprint_id, assignee) WHERE status != 'Done';
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_daily_scrum_sprint_date ON daily_scrums(sprint_id, date DESC);
```

### 4.2 Partitioning
```sql
-- Partition notifications by date
CREATE TABLE notifications_y2024m01 PARTITION OF notifications
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Partition burndown_data by sprint
CREATE TABLE burndown_data_sprint_xxx PARTITION OF burndown_data
FOR VALUES IN ('sprint-xxx-uuid');
```

### 4.3 Views for Common Queries
```sql
-- Active sprint view
CREATE VIEW active_sprints AS
SELECT s.*, p.name as project_name
FROM sprints s
JOIN projects p ON s.project_id = p.id
WHERE s.status = 'In progress';

-- User workload view
CREATE VIEW user_workload AS
SELECT 
    t.assignee,
    t.project_id,
    COUNT(*) as total_tasks,
    SUM(CASE WHEN t.status = 'Done' THEN 1 ELSE 0 END) as completed_tasks,
    SUM(t.story_point) as total_story_points
FROM tasks t
WHERE t.assignee IS NOT NULL
GROUP BY t.assignee, t.project_id;
```

## 5. Data Migration Strategy

### 5.1 Database Migrations
```sql
-- Migration versioning
CREATE TABLE schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT NOW()
);
```

### 5.2 Cross-Service Migration
- Use event sourcing để replay events
- Implement backward compatibility
- Blue-green deployment cho zero-downtime migration

## 6. Backup và Recovery

### 6.1 Backup Strategy
- **Daily full backups** cho tất cả databases
- **Hourly incremental backups** cho critical services
- **Point-in-time recovery** capability
- **Cross-region replication** cho disaster recovery

### 6.2 Data Retention Policy
```sql
-- Archive old data
DELETE FROM notifications WHERE created_at < NOW() - INTERVAL '6 months';
DELETE FROM chat_messages WHERE created_at < NOW() - INTERVAL '1 year';
DELETE FROM daily_scrums WHERE date < NOW() - INTERVAL '2 years';
```

Thiết kế database này đảm bảo:
- **Scalability**: Mỗi service có database riêng
- **Performance**: Indexes và partitioning phù hợp
- **Consistency**: Event-driven architecture với outbox pattern
- **Security**: Proper foreign key constraints và permissions
- **Maintainability**: Clear schema với comprehensive documentation
