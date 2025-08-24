"use client"

import { use, useState } from "react"
import { Plus, ChevronDown, ChevronRight, MoreVertical, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const epics = [
  {
    id: 1,
    title: "User Authentication System",
    description: "Complete user authentication and authorization system",
    status: "in_progress",
    progress: 65,
    stories: [
      {
        id: "US-001",
        title: "User Registration",
        description: "As a new user, I want to create an account so that I can access the platform",
        priority: "high",
        storyPoints: 5,
        status: "done",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        sprint: "Sprint 2",
      },
      {
        id: "US-002",
        title: "User Login",
        description: "As a registered user, I want to log in so that I can access my account",
        priority: "high",
        storyPoints: 3,
        status: "in_progress",
        assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
        sprint: "Sprint 3",
      },
      {
        id: "US-003",
        title: "Password Reset",
        description: "As a user, I want to reset my password so that I can regain access to my account",
        priority: "medium",
        storyPoints: 3,
        status: "todo",
        assignee: null,
        sprint: null,
      },
    ],
  },
  {
    id: 2,
    title: "Product Catalog",
    description: "Product browsing and search functionality",
    status: "planning",
    progress: 20,
    stories: [
      {
        id: "US-004",
        title: "Product Listing",
        description: "As a customer, I want to browse products so that I can find items to purchase",
        priority: "high",
        storyPoints: 8,
        status: "todo",
        assignee: null,
        sprint: null,
      },
      {
        id: "US-005",
        title: "Product Search",
        description: "As a customer, I want to search for products so that I can quickly find what I need",
        priority: "medium",
        storyPoints: 5,
        status: "todo",
        assignee: null,
        sprint: null,
      },
    ],
  },
]

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

export default function ProjectBacklogPage({ params }: { params: Promise<{ id: string }> }) {
  const [expandedEpics, setExpandedEpics] = useState<number[]>([1])
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const resolvedParams = use(params);

  const toggleEpic = (epicId: number) => {
    setExpandedEpics((prev) => (prev.includes(epicId) ? prev.filter((id) => id !== epicId) : [...prev, epicId]))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Backlog</h1>
          <p className="text-muted-foreground">Manage user stories, epics, and tasks for Project {resolvedParams.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Epic
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Story
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search backlog items..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Backlog Items</h2>
            <div className="text-sm text-muted-foreground">
              Total: {epics.reduce((sum, epic) => sum + epic.stories.length, 0)} stories
            </div>
          </div>

          <div className="space-y-4">
            {epics.map((epic) => (
              <Card key={epic.id} className="elevation-1 border-outline-variant">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" onClick={() => toggleEpic(epic.id)} className="h-6 w-6 p-0">
                        {expandedEpics.includes(epic.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <div>
                        <CardTitle className="text-base">{epic.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{epic.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[epic.status as keyof typeof statusColors]}>
                        {epic.status.replace("_", " ")}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{epic.progress}%</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Epic</DropdownMenuItem>
                          <DropdownMenuItem>Add Story</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <Progress value={epic.progress} className="h-2 mt-2" />
                </CardHeader>

                {expandedEpics.includes(epic.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {epic.stories.map((story) => (
                        <Dialog key={story.id}>
                          <DialogTrigger asChild>
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary/20">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">{story.id}</Badge>
                                    <Badge className={priorityColors[story.priority as keyof typeof priorityColors]}>
                                      {story.priority}
                                    </Badge>
                                    <Badge className={statusColors[story.status as keyof typeof statusColors]}>
                                      {story.status.replace("_", " ")}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium mb-1">{story.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{story.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Story Points: {story.storyPoints}</span>
                                    <span>Sprint: {story.sprint || "Not assigned"}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {story.assignee && (
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage
                                        src={story.assignee.avatar || "/placeholder.svg"}
                                        alt={story.assignee.name}
                                      />
                                      <AvatarFallback>
                                        {story.assignee.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </DialogTrigger>

                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Badge variant="outline">{story.id}</Badge>
                                {story.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-3 gap-6">
                              <div className="col-span-2 space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <Textarea defaultValue={story.description} className="mt-1" rows={3} />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Acceptance Criteria</label>
                                  <Textarea placeholder="Enter acceptance criteria..." className="mt-1" rows={4} />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select defaultValue={story.status}>
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
                                  <label className="text-sm font-medium">Priority</label>
                                  <Select defaultValue={story.priority}>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Story Points</label>
                                  <Select defaultValue={story.storyPoints.toString()}>
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
                                  <label className="text-sm font-medium">Assignee</label>
                                  <Select defaultValue={story.assignee?.name || ""}>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="john">John Doe</SelectItem>
                                      <SelectItem value="jane">Jane Smith</SelectItem>
                                      <SelectItem value="mike">Mike Johnson</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sprint Planning</h2>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Current Sprint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Sprint 3</span>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Story Points:</span>
                  <span>23/30</span>
                </div>
                <Progress value={77} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Days Remaining:</span>
                <span>8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Stories:</span>
                <span>5/7</span>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                View Sprint Board
              </Button>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Next Sprint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Drag stories here to plan Sprint 4</p>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground">Drop stories here</p>
                <p className="text-xs text-muted-foreground mt-1">0/30 story points</p>
              </div>
              <Button className="w-full">Start Sprint Planning</Button>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Backlog Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Stories:</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>Story Points:</span>
                <span>24</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Points/Story:</span>
                <span>4.8</span>
              </div>
              <div className="flex justify-between">
                <span>Ready for Sprint:</span>
                <span>3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
