"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Save, Settings, Bell, Shield, Archive, Trash2, Clock, Target, Mail, Smartphone, CheckCircle } from "lucide-react"

const roles = [
  { value: "product-owner", label: "Product Owner" },
  { value: "scrum-master", label: "Scrum Master" },
  { value: "developer", label: "Developer" },
  { value: "viewer", label: "Viewer/Stakeholder" },
]

const permissions = [
  { id: "create-tasks", label: "Create Tasks", description: "Create new tasks and user stories" },
  { id: "edit-tasks", label: "Edit Tasks", description: "Modify existing tasks and their details" },
  { id: "delete-tasks", label: "Delete Tasks", description: "Remove tasks from the project" },
  { id: "manage-sprints", label: "Manage Sprints", description: "Create, edit, and close sprints" },
  { id: "manage-members", label: "Manage Members", description: "Invite, remove, and change member roles" },
  { id: "view-reports", label: "View Reports", description: "Access project reports and analytics" },
  { id: "project-settings", label: "Project Settings", description: "Modify project configuration" },
]

const defaultRolePermissions = {
  "product-owner": [
    "create-tasks",
    "edit-tasks",
    "delete-tasks",
    "manage-sprints",
    "manage-members",
    "view-reports",
    "project-settings",
  ],
  "scrum-master": ["create-tasks", "edit-tasks", "manage-sprints", "view-reports"],
  developer: ["create-tasks", "edit-tasks", "view-reports"],
  viewer: ["view-reports"],
}

export default function SettingsPage() {
  const [projectName, setProjectName] = useState("E-commerce Platform")
  const [projectDescription, setProjectDescription] = useState(
    "A comprehensive e-commerce solution with modern features",
  )
  const [defaultStoryPoints, setDefaultStoryPoints] = useState("21")
  const [dailyReminderTime, setDailyReminderTime] = useState("09:00")
  const [rolePermissions, setRolePermissions] = useState(defaultRolePermissions)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [selectedRole, setSelectedRole] = useState("product-owner")

  // User notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [taskNotifications, setTaskNotifications] = useState(true)
  const [commentNotifications, setCommentNotifications] = useState(true)
  const [mentionNotifications, setMentionNotifications] = useState(true)

  const handlePermissionChange = (role: string, permission: string, checked: boolean) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: checked ? [...prev[role], permission] : prev[role].filter((p) => p !== permission),
    }))
    setHasUnsavedChanges(true)
  }

  const handleSaveSettings = () => {
    // Handle save logic here
    console.log("Saving settings...")
    setHasUnsavedChanges(false)
  }

  return (
    <div className="flex-1 space-y-6 p-2 sm:p-6 w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Settings</h1>
            <p className="text-muted-foreground">Configure your project preferences, team permissions, and notification settings</p>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                Unsaved changes
              </div>
            )}
            <Button
              onClick={handleSaveSettings}
              className="rounded-full"
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
        <Tabs defaultValue="general" className="space-y-6">
            {/* Material 3 Tab Navigation */}
            <div className="bg-surface-variant/10 p-1 rounded-3xl w-fit">
              <TabsList className="grid grid-cols-4 bg-transparent gap-1">
                <TabsTrigger 
                  value="general" 
                  className="flex items-center gap-2 rounded-2xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant hover:bg-surface-variant/50"
                >
                  <Settings className="w-4 h-4" />
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="permissions" 
                  className="flex items-center gap-2 rounded-2xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant hover:bg-surface-variant/50"
                >
                  <Shield className="w-4 h-4" />
                  Permissions
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center gap-2 rounded-2xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant hover:bg-surface-variant/50"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="flex items-center gap-2 rounded-2xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant hover:bg-surface-variant/50"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>

            {/* General Tab Content */}
            <TabsContent value="general" className="space-y-6 mt-8">
              {/* Project Information Card - Material 3 */}
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-surface-variant/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">Project Information</h3>
                      <p className="text-sm text-on-surface-variant">Basic project details and configuration</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="project-name" className="text-sm font-medium text-on-surface">
                      Project Name
                    </Label>
                    <Input 
                      id="project-name" 
                      value={projectName} 
                      onChange={(e) => {
                        setProjectName(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-10"
                      placeholder="Enter project name..."
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="project-description" className="text-sm font-medium text-on-surface">
                      Project Description
                    </Label>
                    <Textarea
                      id="project-description"
                      value={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      rows={4}
                      className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary resize-none"
                      placeholder="Describe your project goals and objectives..."
                    />
                  </div>
                </div>
              </div>

              {/* Sprint Configuration Card - Material 3 */}
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-surface-variant/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                      <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">Sprint Configuration</h3>
                      <p className="text-sm text-on-surface-variant">Default settings for sprint management</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="story-points" className="text-sm font-medium text-on-surface">
                        Default Story Point Limit per Sprint
                      </Label>
                      <Select value={defaultStoryPoints} onValueChange={(value) => {
                        setDefaultStoryPoints(value)
                        setHasUnsavedChanges(true)
                      }}>
                        <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                          <SelectItem value="13">13 points</SelectItem>
                          <SelectItem value="21">21 points</SelectItem>
                          <SelectItem value="34">34 points</SelectItem>
                          <SelectItem value="55">55 points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="daily-reminder" className="text-sm font-medium text-on-surface">
                        Daily Scrum Reminder Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <Input
                          id="daily-reminder"
                          type="time"
                          value={dailyReminderTime}
                          onChange={(e) => {
                            setDailyReminderTime(e.target.value)
                            setHasUnsavedChanges(true)
                          }}
                          className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-10 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Permissions Tab Content */}
            <TabsContent value="permissions" className="space-y-6 mt-8">
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-surface-variant/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">Role Permissions</h3>
                      <p className="text-sm text-on-surface-variant">Select a role to configure its permissions</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex min-h-[500px]">
                  {/* Left Panel - Roles List */}
                  <div className="w-64 bg-surface-variant/5 border-r border-outline-variant/30">
                    <div className="p-6">
                      <h4 className="text-base font-medium text-on-surface mb-4">Project Roles</h4>
                      <div className="space-y-1">
                        {roles.map((role) => (
                          <button
                            key={role.value}
                            onClick={() => setSelectedRole(role.value)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                              selectedRole === role.value
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-surface-variant/20 text-on-surface'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-base font-medium">{role.label}</span>
                              <Badge 
                                className={`text-sm px-2 py-0.5 rounded-full ${
                                  selectedRole === role.value
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : 'bg-primary/10 text-primary border-primary/20'
                                }`}
                              >
                                {rolePermissions[role.value]?.length || 0}
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Permissions for Selected Role */}
                  <div className="flex-1">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full font-medium">
                          {roles.find(r => r.value === selectedRole)?.label}
                        </Badge>
                        <span className="text-base text-on-surface-variant">
                          {rolePermissions[selectedRole]?.length || 0} of {permissions.length} permissions enabled
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {permissions.map((permission) => (
                          <div 
                            key={permission.id} 
                            className="bg-surface-variant/10 rounded-2xl p-4 hover:bg-surface-variant/20 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Label 
                                    htmlFor={`${selectedRole}-${permission.id}`} 
                                    className="text-sm font-medium text-on-surface cursor-pointer"
                                  >
                                    {permission.label}
                                  </Label>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                  {permission.description}
                                </p>
                              </div>
                              <Switch
                                id={`${selectedRole}-${permission.id}`}
                                checked={rolePermissions[selectedRole]?.includes(permission.id) || false}
                                onCheckedChange={(checked) => handlePermissionChange(selectedRole, permission.id, checked)}
                                className="flex-shrink-0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 pt-4 border-t border-outline-variant/30">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Enable all permissions for selected role
                              const allPermissionIds = permissions.map(p => p.id)
                              setRolePermissions(prev => ({
                                ...prev,
                                [selectedRole]: allPermissionIds
                              }))
                              setHasUnsavedChanges(true)
                            }}
                            className="rounded-full"
                          >
                            Enable All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Disable all permissions for selected role
                              setRolePermissions(prev => ({
                                ...prev,
                                [selectedRole]: []
                              }))
                              setHasUnsavedChanges(true)
                            }}
                            className="rounded-full"
                          >
                            Disable All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Reset to default permissions for selected role
                              setRolePermissions(prev => ({
                                ...prev,
                                [selectedRole]: defaultRolePermissions[selectedRole] || []
                              }))
                              setHasUnsavedChanges(true)
                            }}
                            className="rounded-full"
                          >
                            Reset to Default
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab Content */}
            <TabsContent value="notifications" className="space-y-6 mt-8">
              {/* Delivery Methods Card */}
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-surface-variant/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                      <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">Delivery Methods</h3>
                      <p className="text-sm text-on-surface-variant">Choose how you want to receive notifications</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="bg-surface-variant/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                          <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Label htmlFor="email-notifications" className="text-sm font-medium text-on-surface cursor-pointer">
                            Email Notifications
                          </Label>
                          <p className="text-xs text-on-surface-variant">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={(checked) => {
                          setEmailNotifications(checked)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-surface-variant/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                          <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <Label htmlFor="in-app-notifications" className="text-sm font-medium text-on-surface cursor-pointer">
                            In-App Notifications
                          </Label>
                          <p className="text-xs text-on-surface-variant">Show notifications within the application</p>
                        </div>
                      </div>
                      <Switch
                        id="in-app-notifications"
                        checked={inAppNotifications}
                        onCheckedChange={(checked) => {
                          setInAppNotifications(checked)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Types Card */}
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-surface-variant/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/20">
                      <Bell className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">Notification Types</h3>
                      <p className="text-sm text-on-surface-variant">Select what you want to be notified about</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="bg-surface-variant/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <Label htmlFor="task-notifications" className="text-sm font-medium text-on-surface cursor-pointer">
                            Task Updates
                          </Label>
                          <p className="text-xs text-on-surface-variant">Task assignments, status changes, and updates</p>
                        </div>
                      </div>
                      <Switch
                        id="task-notifications"
                        checked={taskNotifications}
                        onCheckedChange={(checked) => {
                          setTaskNotifications(checked)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-surface-variant/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                          <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <Label htmlFor="comment-notifications" className="text-sm font-medium text-on-surface cursor-pointer">
                            Comments & Replies
                          </Label>
                          <p className="text-xs text-on-surface-variant">New comments on tasks and discussions</p>
                        </div>
                      </div>
                      <Switch
                        id="comment-notifications"
                        checked={commentNotifications}
                        onCheckedChange={(checked) => {
                          setCommentNotifications(checked)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-surface-variant/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                          <Settings className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <Label htmlFor="mention-notifications" className="text-sm font-medium text-on-surface cursor-pointer">
                            Mentions & Direct Messages
                          </Label>
                          <p className="text-xs text-on-surface-variant">When someone mentions you in comments or discussions</p>
                        </div>
                      </div>
                      <Switch
                        id="mention-notifications"
                        checked={mentionNotifications}
                        onCheckedChange={(checked) => {
                          setMentionNotifications(checked)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Advanced Tab Content */}
            <TabsContent value="advanced" className="space-y-6 mt-8">
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-red-50 dark:bg-red-950/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Danger Zone</h3>
                      <p className="text-sm text-red-700 dark:text-red-300">These actions are irreversible. Please proceed with caution.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Archive Project */}
                  <div className="bg-surface-variant/10 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20 mt-1">
                          <Archive className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-on-surface mb-2">Archive Project</h4>
                          <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
                            Archive this project to hide it from active projects while preserving all data. 
                            Archived projects can be restored later.
                          </p>
                          <div className="mt-3 text-xs text-on-surface-variant bg-surface-variant/20 px-3 py-2 rounded-full w-fit">
                            ✓ Data preserved • ✓ Can be restored
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="rounded-full text-on-surface hover:bg-surface-variant/50 flex-shrink-0"
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        Archive Project
                      </Button>
                    </div>
                  </div>

                  {/* Delete Project */}
                  <div className="bg-red-50/50 dark:bg-red-950/10 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 mt-1">
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Delete Project Forever</h4>
                          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed max-w-md">
                            Permanently delete this project and all associated data including work items, 
                            comments, attachments, and history. This action cannot be undone.
                          </p>
                          <div className="mt-3 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-3 py-2 rounded-full w-fit">
                            ⚠️ Irreversible • All data will be lost
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="rounded-full flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}
