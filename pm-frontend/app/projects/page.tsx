"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Filter, MoreVertical, Users, Calendar, Target, TrendingUp, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with microservices architecture",
    status: "active",
    progress: 75,
    team: [
      { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2024-03-15",
    priority: "high",
    tasksCompleted: 45,
    totalTasks: 60,
    sprints: 3,
    activeSprint: "Sprint 3",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    status: "active",
    progress: 60,
    team: [
      { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2024-04-20",
    priority: "medium",
    tasksCompleted: 32,
    totalTasks: 55,
    sprints: 2,
    activeSprint: "Sprint 2",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard for business intelligence",
    status: "planning",
    progress: 25,
    team: [
      { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2024-05-10",
    priority: "low",
    tasksCompleted: 12,
    totalTasks: 48,
    sprints: 1,
    activeSprint: "Sprint 1",
  },
]

const statusColors = {
  active: "bg-primary text-primary-foreground",
  planning: "bg-secondary text-secondary-foreground",
  completed: "bg-chart-2 text-white",
  on_hold: "bg-muted text-muted-foreground",
}

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-chart-4 text-white",
  low: "bg-chart-2 text-white",
}

export default function ProjectsPage() {
  return (
    <>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Manage and track all your development projects</p>
          </div>
          <Button className="elevation-2 rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10 rounded-full border-outline" />
          </div>
          <Button variant="outline" className="rounded-full border-outline bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">67% of total projects</p>
            </CardContent>
          </Card>
          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="elevation-2 border-outline-variant hover:elevation-3 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="elevation-3">
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline" className={priorityColors[project.priority as keyof typeof priorityColors]}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Tasks */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium">
                    {project.tasksCompleted}/{project.totalTasks}
                  </span>
                </div>

                {/* Sprint Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Sprint</span>
                  <span className="font-medium">{project.activeSprint}</span>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">{project.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
