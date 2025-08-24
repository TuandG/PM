"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  Eye,
  Plus,
  MessageCircle,
  Clock,
  Paperclip,
  LinkIcon,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import NextLink from "next/link"

// Mock data for the story
const storyData = {
  id: "PROJ-001",
  type: "story",
  title: "User Registration",
  description: `As a new user, I want to create an account so that I can access the platform.

## Background
Users need to be able to register for accounts to access personalized features and save their preferences.

## Requirements
- Email validation
- Password strength requirements
- Email confirmation process`,
  status: "in_progress",
  priority: "high",
  storyPoints: 5,
  assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", id: "john" },
  reporter: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", id: "jane" },
  sprint: "Sprint 2",
  epic: "User Authentication System",
  labels: ["authentication", "frontend", "backend"],
  dueDate: "2024-02-15",
  createdDate: "2024-01-15",
  updatedDate: "2024-01-20",
  timeTracking: {
    originalEstimate: "2d",
    timeSpent: "1d 4h",
    remainingEstimate: "4h",
  },
  acceptanceCriteria: [
    { id: 1, text: "User can enter email and password", completed: true },
    { id: 2, text: "System validates email format", completed: true },
    { id: 3, text: "User receives confirmation email", completed: false },
    { id: 4, text: "User can activate account via email link", completed: false },
  ],
  subTasks: [
    { id: "PROJ-001-1", title: "Create registration form UI", status: "done", assignee: "John Doe" },
    { id: "PROJ-001-2", title: "Implement email validation", status: "in_progress", assignee: "John Doe" },
    { id: "PROJ-001-3", title: "Setup email confirmation service", status: "todo", assignee: null },
  ],
  attachments: [
    { id: 1, name: "registration-mockup.png", size: "2.3 MB", type: "image", url: "/placeholder.svg" },
    { id: 2, name: "requirements.pdf", size: "1.1 MB", type: "document", url: "#" },
  ],
  linkedIssues: [
    { id: "PROJ-002", title: "User Login", relationship: "blocks", type: "story" },
    { id: "PROJ-015", title: "Email service integration", relationship: "related", type: "task" },
  ],
  activities: [
    {
      id: 1,
      type: "comment",
      user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Started working on the registration form. The mockup looks good!",
      timestamp: "2024-01-20 14:30",
      edited: false,
    },
    {
      id: 2,
      type: "status_change",
      user: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
      content: "changed status from To Do to In Progress",
      timestamp: "2024-01-20 09:15",
      edited: false,
    },
    {
      id: 3,
      type: "assignment",
      user: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
      content: "assigned this to John Doe",
      timestamp: "2024-01-19 16:45",
      edited: false,
    },
  ],
}

const statusColors = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-primary text-primary-foreground",
  done: "bg-chart-2 text-white",
  blocked: "bg-destructive text-destructive-foreground",
}

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-chart-4 text-white",
  low: "bg-chart-2 text-white",
}

const typeIcons = {
  story: "📖",
  bug: "🐛",
  task: "✅",
}

export default function StoryDetailPage({ params }: { params: { id: string; storyId: string } }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showSubTaskModal, setShowSubTaskModal] = useState(false)

  const completedSubTasks = storyData.subTasks.filter((task) => task.status === "done").length
  const subTaskProgress = (completedSubTasks / storyData.subTasks.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <NextLink href={`/project/${params.id}`} className="hover:text-foreground">
            Project {params.id}
          </NextLink>
          <span>/</span>
          <NextLink href={`/project/${params.id}/backlog`} className="hover:text-foreground">
            Backlog
          </NextLink>
          <span>/</span>
          <span className="text-foreground font-medium">{storyData.id}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column - Main Content (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <NextLink href={`/project/${params.id}/backlog`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Backlog
                  </Button>
                </NextLink>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{typeIcons[storyData.type as keyof typeof typeIcons]}</span>
                  <Badge variant="outline" className="text-sm">
                    {storyData.id}
                  </Badge>
                  <Badge className={statusColors[storyData.status as keyof typeof statusColors]}>
                    {storyData.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Clone
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Watch
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Title */}
              {isEditingTitle ? (
                <div className="space-y-2">
                  <Input
                    defaultValue={storyData.title}
                    className="text-xl font-semibold"
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                    autoFocus
                  />
                </div>
              ) : (
                <h1
                  className="text-2xl font-bold cursor-pointer hover:bg-muted/50 p-2 rounded -ml-2"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {storyData.title}
                </h1>
              )}
            </div>

            {/* Description Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Description</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(!isEditingDescription)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingDescription ? (
                  <div className="space-y-3">
                    <Textarea defaultValue={storyData.description} rows={8} className="min-h-[200px]" />
                    <div className="flex gap-2">
                      <Button size="sm">Save</Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{storyData.description}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sub-tasks Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Sub-tasks</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={subTaskProgress} className="w-32 h-2" />
                    <span className="text-sm text-muted-foreground">
                      {completedSubTasks}/{storyData.subTasks.length}
                    </span>
                  </div>
                </div>
                <Dialog open={showSubTaskModal} onOpenChange={setShowSubTaskModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Sub-task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Sub-task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input placeholder="Enter sub-task title..." />
                      </div>
                      <div>
                        <Label>Assignee</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="jane">Jane Smith</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowSubTaskModal(false)}>
                          Cancel
                        </Button>
                        <Button>Create</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-3">
                {storyData.subTasks.map((subTask) => (
                  <div key={subTask.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox checked={subTask.status === "done"} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {subTask.id}
                        </Badge>
                        <span
                          className={`text-sm ${subTask.status === "done" ? "line-through text-muted-foreground" : ""}`}
                        >
                          {subTask.title}
                        </span>
                      </div>
                    </div>
                    <Badge className={statusColors[subTask.status as keyof typeof statusColors]}>
                      {subTask.status.replace("_", " ")}
                    </Badge>
                    {subTask.assignee && (
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {subTask.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {storyData.activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.user.name}</span>
                        {activity.type === "comment" ? (
                          <MessageCircle className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <Clock className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <div
                        className={`text-sm ${activity.type === "comment" ? "bg-muted p-3 rounded-lg" : "text-muted-foreground"}`}
                      >
                        {activity.content}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comment Box */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Add a comment... Use @ to mention team members"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                  <Button disabled={!newComment.trim()}>Comment</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details Panel (30%) */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">STATUS</Label>
                  <Select defaultValue={storyData.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">ASSIGNEE</Label>
                  <Select defaultValue={storyData.assignee?.id}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">REPORTER</Label>
                  <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={storyData.reporter.avatar || "/placeholder.svg"}
                        alt={storyData.reporter.name}
                      />
                      <AvatarFallback className="text-xs">
                        {storyData.reporter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{storyData.reporter.name}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">PRIORITY</Label>
                  <Select defaultValue={storyData.priority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">🔴 High</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="low">🟢 Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">STORY POINTS</Label>
                  <Select defaultValue={storyData.storyPoints.toString()}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="13">13</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">SPRINT</Label>
                  <Select defaultValue={storyData.sprint}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                      <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                      <SelectItem value="Sprint 3">Sprint 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">EPIC</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm">
                    <NextLink href="#" className="text-primary hover:underline">
                      {storyData.epic}
                    </NextLink>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">LABELS</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {storyData.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">DUE DATE</Label>
                  <Input type="date" defaultValue={storyData.dueDate} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* Time Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">ORIGINAL ESTIMATE</Label>
                    <div className="mt-1">{storyData.timeTracking.originalEstimate}</div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">TIME SPENT</Label>
                    <div className="mt-1">{storyData.timeTracking.timeSpent}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">REMAINING ESTIMATE</Label>
                  <div className="mt-1">{storyData.timeTracking.remainingEstimate}</div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Clock className="w-4 h-4 mr-2" />
                  Log Work
                </Button>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Attachments</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {storyData.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded">
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{attachment.name}</div>
                      <div className="text-xs text-muted-foreground">{attachment.size}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Linked Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Linked Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {storyData.linkedIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">
                      {issue.relationship}
                    </Badge>
                    <NextLink href="#" className="text-primary hover:underline">
                      {issue.id}
                    </NextLink>
                    <span className="text-muted-foreground">{issue.title}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Link Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
