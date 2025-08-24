"use client"

import { use, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Target, Users, ChevronDown, ChevronRight, Plus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const currentSprint = {
  id: 3,
  name: "Sprint 3",
  goal: "Complete user authentication and basic product catalog",
  startDate: "March 1, 2024",
  endDate: "March 15, 2024",
  status: "active",
  progress: 77,
  storyPoints: { completed: 23, total: 30 },
  hoursLogged: 156,
  daysLeft: 8,
  stories: [
    {
      id: "US-001",
      title: "User Registration",
      status: "done",
      storyPoints: 5,
      assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-002",
      title: "User Login",
      status: "in_progress",
      storyPoints: 3,
      assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-006",
      title: "Product Categories",
      status: "todo",
      storyPoints: 8,
      assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    },
  ],
}

const plannedSprints = [
  {
    id: 4,
    name: "Sprint 4",
    goal: "Implement shopping cart and checkout process",
    startDate: "March 16, 2024",
    endDate: "March 30, 2024",
    status: "planned",
    storyPoints: { planned: 0, capacity: 30 },
    stories: [],
  },
]

const completedSprints = [
  {
    id: 2,
    name: "Sprint 2",
    goal: "Setup project infrastructure and basic UI",
    completedDate: "February 29, 2024",
    storyPoints: { completed: 28, total: 30 },
    velocity: 93,
    stories: [
      { id: "US-007", title: "Project Setup", status: "done", storyPoints: 8 },
      { id: "US-008", title: "Basic Layout", status: "done", storyPoints: 5 },
      { id: "US-009", title: "Navigation Menu", status: "done", storyPoints: 3 },
    ],
  },
  {
    id: 1,
    name: "Sprint 1",
    goal: "Initial project planning and design",
    completedDate: "February 15, 2024",
    storyPoints: { completed: 25, total: 25 },
    velocity: 100,
    stories: [
      { id: "US-010", title: "Requirements Analysis", status: "done", storyPoints: 8 },
      { id: "US-011", title: "UI/UX Design", status: "done", storyPoints: 13 },
    ],
  },
]

const statusColors = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-primary text-primary-foreground",
  done: "bg-chart-2 text-white",
  blocked: "bg-destructive text-destructive-foreground",
}

export default function ProjectSprintPage({ params }: { params: Promise<{ id: string }> }) {
  const [expandedSprints, setExpandedSprints] = useState<number[]>([])
  const resolvedParams = use(params);

  const toggleSprint = (sprintId: number) => {
    setExpandedSprints((prev) => (prev.includes(sprintId) ? prev.filter((id) => id !== sprintId) : [...prev, sprintId]))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sprint Management</h1>
          <p className="text-muted-foreground">Plan and manage sprints for Project {resolvedParams.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Sprint Planning</Button>
          <Button>Create Sprint</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="elevation-2 border-outline-variant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{currentSprint.name}</CardTitle>
                  <p className="text-muted-foreground">
                    {currentSprint.startDate} - {currentSprint.endDate}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Goal: {currentSprint.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Sprint</DropdownMenuItem>
                      <DropdownMenuItem>Complete Sprint</DropdownMenuItem>
                      <DropdownMenuItem>Sprint Retrospective</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Days Left</p>
                  <p className="text-2xl font-bold">{currentSprint.daysLeft}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-2 mx-auto">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">Story Points</p>
                  <p className="text-2xl font-bold">
                    {currentSprint.storyPoints.completed}/{currentSprint.storyPoints.total}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">Hours Logged</p>
                  <p className="text-2xl font-bold">{currentSprint.hoursLogged}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-2 mx-auto">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">Stories</p>
                  <p className="text-2xl font-bold">{currentSprint.stories.length}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Sprint Progress</span>
                  <span>{currentSprint.progress}%</span>
                </div>
                <Progress value={currentSprint.progress} className="h-3" />
              </div>

              <div className="flex gap-2">
                <Button>View Sprint Board</Button>
                <Button variant="outline">Daily Scrum</Button>
                <Button variant="outline">Burndown Chart</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSprint(currentSprint.id)}
                    className="h-6 w-6 p-0"
                  >
                    {expandedSprints.includes(currentSprint.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <CardTitle className="text-lg">Current Sprint Backlog</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Story
                </Button>
              </div>
            </CardHeader>

            {expandedSprints.includes(currentSprint.id) && (
              <CardContent>
                <div className="space-y-3">
                  {currentSprint.stories.map((story) => (
                    <div
                      key={story.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-surface-variant/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{story.id}</Badge>
                        <span className="font-medium">{story.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[story.status as keyof typeof statusColors]}>
                          {story.status.replace("_", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{story.storyPoints} pts</span>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={story.assignee.avatar || "/placeholder.svg"} alt={story.assignee.name} />
                          <AvatarFallback className="text-xs">
                            {story.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Planned Sprints</h3>
            {plannedSprints.map((sprint) => (
              <Card key={sprint.id} className="elevation-1 border-outline-variant">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleSprint(sprint.id)} className="h-6 w-6 p-0">
                        {expandedSprints.includes(sprint.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <div>
                        <CardTitle className="text-base">{sprint.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {sprint.startDate} - {sprint.endDate}
                        </p>
                        <p className="text-xs text-muted-foreground">Goal: {sprint.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planning</Badge>
                      <span className="text-sm text-muted-foreground">
                        {sprint.storyPoints.planned}/{sprint.storyPoints.capacity} pts
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Sprint</DropdownMenuItem>
                          <DropdownMenuItem>Start Sprint</DropdownMenuItem>
                          <DropdownMenuItem>Add Stories</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {expandedSprints.includes(sprint.id) && (
                  <CardContent>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground">Drag stories from backlog to plan this sprint</p>
                      <Button variant="outline" className="mt-2 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add from Backlog
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sprint History</h3>
            {completedSprints.map((sprint) => (
              <Card key={sprint.id} className="elevation-1 border-outline-variant">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleSprint(sprint.id)} className="h-6 w-6 p-0">
                        {expandedSprints.includes(sprint.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <div>
                        <CardTitle className="text-base">{sprint.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Completed: {sprint.completedDate}</p>
                        <p className="text-xs text-muted-foreground">Goal: {sprint.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Completed</Badge>
                      <span className="text-sm text-muted-foreground">
                        {sprint.storyPoints.completed}/{sprint.storyPoints.total} pts
                      </span>
                      <span className="text-sm font-medium text-chart-2">{sprint.velocity}% velocity</span>
                    </div>
                  </div>
                </CardHeader>

                {expandedSprints.includes(sprint.id) && (
                  <CardContent>
                    <div className="space-y-2">
                      {sprint.stories.map((story) => (
                        <div key={story.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{story.id}</Badge>
                            <span className="text-sm">{story.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[story.status as keyof typeof statusColors]}>
                              {story.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{story.storyPoints} pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Start Sprint Planning</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Create New Sprint
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Sprint Retrospective
              </Button>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Backlog Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Ready for next sprint</p>
              <div className="space-y-2">
                {[
                  { id: "US-003", title: "Password Reset", points: 3 },
                  { id: "US-004", title: "Product Listing", points: 8 },
                  { id: "US-005", title: "Product Search", points: 5 },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.id}
                      </Badge>
                      <span className="truncate">{item.title}</span>
                    </div>
                    <span className="text-muted-foreground">{item.points}pts</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Full Backlog
              </Button>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle className="text-base">Sprint Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Avg Velocity:</span>
                <span>27 pts/sprint</span>
              </div>
              <div className="flex justify-between">
                <span>Team Capacity:</span>
                <span>30 pts/sprint</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span>96%</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Sprints:</span>
                <span>2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
