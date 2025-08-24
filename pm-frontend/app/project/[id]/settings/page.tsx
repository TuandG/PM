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
import { AlertTriangle, Save, Settings, Bell, Shield } from "lucide-react"

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
  }

  const handleSaveSettings = () => {
    // Handle save logic here
    console.log("Saving settings...")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Settings</h1>
          <p className="text-muted-foreground">Configure your project preferences and permissions</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Basic project details and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sprint Configuration</CardTitle>
              <CardDescription>Default settings for sprint management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story-points">Default Story Point Limit per Sprint</Label>
                <Select value={defaultStoryPoints} onValueChange={setDefaultStoryPoints}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">13 points</SelectItem>
                    <SelectItem value="21">21 points</SelectItem>
                    <SelectItem value="34">34 points</SelectItem>
                    <SelectItem value="55">55 points</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="daily-reminder">Daily Scrum Reminder Time</Label>
                <Input
                  id="daily-reminder"
                  type="time"
                  value={dailyReminderTime}
                  onChange={(e) => setDailyReminderTime(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure what each role can do in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roles.map((role) => (
                  <div key={role.value}>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{role.label}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3">
                          <Switch
                            id={`${role.value}-${permission.id}`}
                            checked={rolePermissions[role.value]?.includes(permission.id) || false}
                            onCheckedChange={(checked) => handlePermissionChange(role.value, permission.id, checked)}
                          />
                          <div className="space-y-1">
                            <Label htmlFor={`${role.value}-${permission.id}`} className="text-sm font-medium">
                              {permission.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {role.value !== roles[roles.length - 1].value && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                    </div>
                    <Switch
                      id="in-app-notifications"
                      checked={inAppNotifications}
                      onCheckedChange={setInAppNotifications}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="task-notifications">Task Updates</Label>
                      <p className="text-sm text-muted-foreground">Task assignments, status changes, and updates</p>
                    </div>
                    <Switch
                      id="task-notifications"
                      checked={taskNotifications}
                      onCheckedChange={setTaskNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comment-notifications">Comments</Label>
                      <p className="text-sm text-muted-foreground">New comments on tasks and discussions</p>
                    </div>
                    <Switch
                      id="comment-notifications"
                      checked={commentNotifications}
                      onCheckedChange={setCommentNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mention-notifications">Mentions</Label>
                      <p className="text-sm text-muted-foreground">
                        When someone mentions you in comments or discussions
                      </p>
                    </div>
                    <Switch
                      id="mention-notifications"
                      checked={mentionNotifications}
                      onCheckedChange={setMentionNotifications}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Danger Zone
              </CardTitle>
              <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                <div>
                  <h4 className="font-medium">Archive Project</h4>
                  <p className="text-sm text-muted-foreground">
                    Archive this project. It will be hidden from active projects but data will be preserved.
                  </p>
                </div>
                <Button variant="outline">Archive</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-destructive">Delete Project</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this project and all associated data. This cannot be undone.
                  </p>
                </div>
                <Button variant="destructive">Delete Project</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
