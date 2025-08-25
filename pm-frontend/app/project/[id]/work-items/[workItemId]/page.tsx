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
  Bookmark,
  Bug,
  SquareCheck,
  X,
  Calendar,
  User,
  Target,
  Flag,
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
  in_progress: "bg-primary/10 text-primary border-primary/20",
  done: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  blocked: "bg-destructive/10 text-destructive border-destructive/20",
}

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  low: "bg-chart-2/10 text-chart-2 border-chart-2/20",
}

const typeIcons = {
  story: { icon: <Bookmark className="w-4 h-4" />, color: "bg-primary/10 text-primary" },
  bug: { icon: <Bug className="w-4 h-4" />, color: "bg-destructive/10 text-destructive" },
  task: { icon: <SquareCheck className="w-4 h-4" />, color: "bg-chart-2/10 text-chart-2" },
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
      <div className="p-4 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
          <NextLink href={`/project/${params.id}`} className="hover:text-on-surface transition-colors">
            Project {params.id}
          </NextLink>
          <span>/</span>
          <NextLink href={`/project/${params.id}/backlog`} className="hover:text-on-surface transition-colors">
            Backlog
          </NextLink>
          <span>/</span>
          <span className="text-on-surface font-medium">{storyData.id}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Column - Main Content (75%) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Story Header & Description - Combined */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <NextLink href={`/project/${params.id}/backlog`}>
                  <Button variant="ghost" size="sm" className="rounded-full hover:bg-muted/50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Backlog
                  </Button>
                </NextLink>
              </div>

              <div className="bg-surface rounded-3xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-muted/30 px-4 py-3">
              <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-full ${typeIcons[storyData.type as keyof typeof typeIcons].color}`}>
                        {typeIcons[storyData.type as keyof typeof typeIcons].icon}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-sm font-semibold rounded-full px-3 py-1 border-outline">
                    {storyData.id}
                  </Badge>
                          <Badge className={`${statusColors[storyData.status as keyof typeof statusColors]} font-medium px-3 py-1 rounded-full text-sm border`}>
                            {storyData.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          <Badge className={`${priorityColors[storyData.priority as keyof typeof priorityColors]} font-medium px-3 py-1 rounded-full text-sm border`}>
                            <Flag className="w-3 h-3 mr-1" />
                            {storyData.priority.toUpperCase()}
                  </Badge>
                        </div>
                      </div>
                </div>
                <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                      <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Clone
                  </Button>
                      <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Watch
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-outline">
                          <DropdownMenuItem className="rounded-lg text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                    </div>
                </div>
              </div>

                {/* Title Section */}
                <div className="px-4 py-4 border-b border-outline-variant/20">
              {isEditingTitle ? (
                    <div className="space-y-3">
                  <Input
                    defaultValue={storyData.title}
                        className="text-2xl font-bold bg-surface rounded-2xl border-input"
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                    autoFocus
                  />
                </div>
              ) : (
                <h1
                      className="text-2xl font-bold cursor-pointer hover:bg-muted/30 p-2 rounded-2xl -ml-2 transition-colors"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {storyData.title}
                </h1>
              )}
            </div>

            {/* Description Section */}
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-foreground">Description</h2>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(!isEditingDescription)} className="rounded-full hover:bg-muted/50 border-outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                  </div>
                {isEditingDescription ? (
                    <div className="space-y-4">
                      <Textarea 
                        defaultValue={storyData.description} 
                        rows={8} 
                        className="min-h-[200px] bg-surface rounded-2xl resize-none border-input" 
                      />
                      <div className="flex gap-3">
                        <Button size="sm" className="rounded-full">Save</Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(false)} className="rounded-full border-outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                    <div className="bg-muted/30 rounded-2xl p-4">
                      <div className="whitespace-pre-wrap text-foreground leading-relaxed">{storyData.description}</div>
                  </div>
                )}
                </div>
              </div>
            </div>

            {/* Sub-tasks Section */}
            <div className="bg-surface rounded-3xl overflow-hidden">
                              <div className="bg-muted/30 px-4 py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-on-surface">Sub-tasks</h2>
                  <div className="flex items-center gap-3">
                    <Progress value={subTaskProgress} className="w-32 h-2" />
                    <span className="text-sm text-on-surface-variant">
                      {completedSubTasks}/{storyData.subTasks.length} completed
                    </span>
                  </div>
                </div>
                <Dialog open={showSubTaskModal} onOpenChange={setShowSubTaskModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Sub-task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Create Sub-task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-on-surface mb-2 block">Title</Label>
                        <Input placeholder="Enter sub-task title..." className="rounded-2xl" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-on-surface mb-2 block">Assignee</Label>
                        <Select>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-outline">
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="jane">Jane Smith</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowSubTaskModal(false)} className="rounded-full">
                          Cancel
                        </Button>
                        <Button className="rounded-full">Create</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="px-4 py-4 space-y-2">
                {storyData.subTasks.map((subTask) => (
                  <div key={subTask.id} className="flex items-center gap-4 p-3 bg-muted/20 rounded-2xl hover:bg-muted/30 transition-colors">
                    <Checkbox checked={subTask.status === "done"} className="rounded-md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                          {subTask.id}
                        </Badge>
                        <span
                          className={`text-sm font-medium ${subTask.status === "done" ? "line-through text-on-surface-variant" : "text-on-surface"}`}
                        >
                          {subTask.title}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${statusColors[subTask.status as keyof typeof statusColors]} font-medium px-3 py-1 rounded-full text-xs`}>
                      {subTask.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    {subTask.assignee && (
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                          {subTask.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Issues - Moved to main content */}
            <div className="bg-surface rounded-3xl overflow-hidden">
                              <div className="bg-muted/30 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Linked Issues
                </h2>
                <Button variant="outline" size="sm" className="rounded-full hover:bg-surface-variant/50">
                  <Plus className="w-4 h-4 mr-2" />
                  Link Issue
                </Button>
              </div>
              <div className="px-4 py-4 space-y-2">
                {storyData.linkedIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center gap-4 p-3 bg-muted/20 rounded-2xl hover:bg-muted/30 transition-colors">
                    <Badge variant="outline" className="text-xs rounded-full px-3 py-1 font-medium">
                      {issue.relationship}
                    </Badge>
                    <NextLink href="#" className="text-primary hover:underline font-semibold transition-colors">
                      {issue.id}
                    </NextLink>
                    <span className="text-on-surface-variant flex-1">{issue.title}</span>
                    <div className={`p-1.5 rounded-full ${typeIcons[issue.type as keyof typeof typeIcons].color}`}>
                      {typeIcons[issue.type as keyof typeof typeIcons].icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments - Moved to main content */}
            <div className="bg-surface rounded-3xl overflow-hidden">
                              <div className="bg-muted/30 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
                  <Paperclip className="w-5 h-5" />
                  Attachments
                </h2>
                <Button variant="outline" size="sm" className="rounded-full hover:bg-surface-variant/50">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              <div className="px-4 py-4 space-y-2">
                {storyData.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-4 p-3 bg-muted/20 rounded-2xl hover:bg-muted/30 transition-colors">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Paperclip className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-on-surface">{attachment.name}</div>
                      <div className="text-xs text-on-surface-variant">{attachment.size}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-surface-variant/50">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-surface rounded-3xl overflow-hidden">
              <div className="bg-surface-variant/20 px-4 py-3">
                <h2 className="text-lg font-medium text-on-surface">Activity</h2>
              </div>
              <div className="px-4 py-4 space-y-4">
                {storyData.activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                        {activity.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-sm text-on-surface">{activity.user.name}</span>
                        {activity.type === "comment" ? (
                          <MessageCircle className="w-4 h-4 text-on-surface-variant" />
                        ) : (
                          <Clock className="w-4 h-4 text-on-surface-variant" />
                        )}
                        <span className="text-xs text-on-surface-variant">{activity.timestamp}</span>
                      </div>
                      <div
                        className={`text-sm ${
                          activity.type === "comment" 
                            ? "bg-muted/30 p-4 rounded-2xl text-foreground" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {activity.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Box */}
            <div className="bg-surface rounded-3xl overflow-hidden">
              <div className="bg-surface-variant/20 px-4 py-3">
                <h2 className="text-lg font-medium text-on-surface">Add Comment</h2>
              </div>
              <div className="px-4 py-4 space-y-4">
                <Textarea
                  placeholder="Add a comment... Use @ to mention team members"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="bg-muted/30 rounded-2xl resize-none border-input"
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="rounded-full hover:bg-muted/50 border-outline">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                  <Button disabled={!newComment.trim()} className="rounded-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details Panel (25%) */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-surface rounded-3xl overflow-hidden">
              <div className="bg-surface-variant/20 px-4 py-3">
                <h2 className="text-lg font-medium text-on-surface">Details</h2>
              </div>
              <div className="px-4 py-4 space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Status</Label>
                  <Select defaultValue={storyData.status}>
                    <SelectTrigger className="mt-1 rounded-2xl bg-surface border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-outline">
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Assignee</Label>
                  <Select defaultValue={storyData.assignee?.id}>
                    <SelectTrigger className="mt-1 rounded-2xl bg-surface border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-outline">
                      <SelectItem value="john">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          John Doe
                        </div>
                      </SelectItem>
                      <SelectItem value="jane">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Jane Smith
                        </div>
                      </SelectItem>
                      <SelectItem value="mike">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Mike Johnson
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Reporter</Label>
                  <div className="flex items-center gap-3 mt-1 p-3 bg-muted/30 rounded-2xl">
                    <Avatar className="w-7 h-7">
                      <AvatarImage
                        src={storyData.reporter.avatar || "/placeholder.svg"}
                        alt={storyData.reporter.name}
                      />
                      <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                        {storyData.reporter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-on-surface">{storyData.reporter.name}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Priority</Label>
                  <Select defaultValue={storyData.priority}>
                    <SelectTrigger className="mt-1 rounded-2xl bg-surface border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-outline">
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-red-600" />
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-yellow-600" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-green-600" />
                          Low
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Story Points</Label>
                  <Select defaultValue={storyData.storyPoints.toString()}>
                    <SelectTrigger className="mt-1 rounded-2xl bg-surface border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-outline">
                      <SelectItem value="1">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          1 Point
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          2 Points
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          3 Points
                        </div>
                      </SelectItem>
                      <SelectItem value="5">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          5 Points
                        </div>
                      </SelectItem>
                      <SelectItem value="8">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          8 Points
                        </div>
                      </SelectItem>
                      <SelectItem value="13">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          13 Points
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Sprint</Label>
                  <Select defaultValue={storyData.sprint}>
                    <SelectTrigger className="mt-1 rounded-2xl bg-surface border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-outline">
                      <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                      <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                      <SelectItem value="Sprint 3">Sprint 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Epic</Label>
                  <div className="mt-1 p-3 bg-muted/30 rounded-2xl text-sm">
                    <NextLink href="#" className="text-primary hover:underline font-medium transition-colors">
                      {storyData.epic}
                    </NextLink>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Labels</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {storyData.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="text-xs rounded-full px-3 py-1 bg-muted/50 text-muted-foreground">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Due Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                    <Input type="date" defaultValue={storyData.dueDate} className="mt-1 pl-10 rounded-2xl bg-surface border-input" />
                  </div>
                </div>
              </div>
            </div>

            {/* Time Tracking */}
            <div className="bg-surface rounded-3xl overflow-hidden">
              <div className="bg-surface-variant/20 px-4 py-3">
                <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Tracking
                </h2>
              </div>
              <div className="px-4 py-4 space-y-3">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-muted/30 rounded-2xl p-3">
                    <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Original Estimate</Label>
                    <div className="mt-1 font-medium text-on-surface">{storyData.timeTracking.originalEstimate}</div>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3">
                    <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Time Spent</Label>
                    <div className="mt-1 font-medium text-on-surface">{storyData.timeTracking.timeSpent}</div>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3">
                    <Label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Remaining</Label>
                    <div className="mt-1 font-medium text-on-surface">{storyData.timeTracking.remainingEstimate}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-full hover:bg-surface-variant/50">
                  <Clock className="w-4 h-4 mr-2" />
                  Log Work
                </Button>
                    </div>
                  </div>




          </div>
        </div>
      </div>
    </div>
  )
}
