"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, MoreVertical, Mail, MapPin, Target, TrendingUp, Clock, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "active",
    location: "New York, USA",
    joinDate: "2023-01-15",
    currentSprint: "Sprint 3",
    tasksCompleted: 24,
    tasksInProgress: 3,
    velocity: 42,
    efficiency: 92,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
    recentActivity: "Completed user authentication form",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Backend Developer",
    email: "jane.smith@company.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "active",
    location: "San Francisco, USA",
    joinDate: "2022-11-20",
    currentSprint: "Sprint 3",
    tasksCompleted: 28,
    tasksInProgress: 2,
    velocity: 48,
    efficiency: 95,
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
    recentActivity: "Implemented JWT authentication middleware",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Full Stack Developer",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "away",
    location: "Austin, USA",
    joinDate: "2023-03-10",
    currentSprint: "Sprint 3",
    tasksCompleted: 22,
    tasksInProgress: 4,
    velocity: 38,
    efficiency: 88,
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    recentActivity: "Fixed database connection issues",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    role: "UI/UX Designer",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "active",
    location: "Seattle, USA",
    joinDate: "2022-08-05",
    currentSprint: "Sprint 3",
    tasksCompleted: 26,
    tasksInProgress: 2,
    velocity: 35,
    efficiency: 93,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    recentActivity: "Created wireframes for sprint board",
  },
  {
    id: 5,
    name: "Tom Brown",
    role: "DevOps Engineer",
    email: "tom.brown@company.com",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "busy",
    location: "Denver, USA",
    joinDate: "2023-02-01",
    currentSprint: "Sprint 3",
    tasksCompleted: 20,
    tasksInProgress: 1,
    velocity: 32,
    efficiency: 85,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    recentActivity: "Configured deployment pipeline",
  },
  {
    id: 6,
    name: "Alex Chen",
    role: "QA Engineer",
    email: "alex.chen@company.com",
    phone: "+1 (555) 678-9012",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "active",
    location: "Los Angeles, USA",
    joinDate: "2022-12-12",
    currentSprint: "Sprint 3",
    tasksCompleted: 18,
    tasksInProgress: 3,
    velocity: 28,
    efficiency: 90,
    skills: ["Selenium", "Jest", "Cypress", "Manual Testing"],
    recentActivity: "Completed regression testing",
  },
]

const statusColors = {
  active: "bg-chart-2 text-white",
  away: "bg-chart-4 text-white",
  busy: "bg-destructive text-destructive-foreground",
  offline: "bg-muted text-muted-foreground",
}

const statusLabels = {
  active: "Active",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
}

export default function TeamPage() {
  const totalMembers = teamMembers.length
  const activeMembers = teamMembers.filter((member) => member.status === "active").length
  const avgVelocity = Math.round(teamMembers.reduce((sum, member) => sum + member.velocity, 0) / totalMembers)
  const avgEfficiency = Math.round(teamMembers.reduce((sum, member) => sum + member.efficiency, 0) / totalMembers)

  return (
    <>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and track performance</p>
          </div>
          <Button className="elevation-2 rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">{activeMembers} currently active</p>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Velocity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgVelocity}</div>
              <p className="text-xs text-muted-foreground">Story points per sprint</p>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEfficiency}%</div>
              <p className="text-xs text-muted-foreground">Average completion rate</p>
            </CardContent>
          </Card>

          <Card className="elevation-1 border-outline-variant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.tasksInProgress, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-10 rounded-full border-outline" />
          </div>
          <Button variant="outline" className="rounded-full border-outline bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Team Members */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="bg-surface border border-outline-variant">
            <TabsTrigger
              value="grid"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Grid View
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="elevation-2 border-outline-variant hover:elevation-3 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={statusColors[member.status as keyof typeof statusColors]}>
                          {statusLabels[member.status as keyof typeof statusLabels]}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="elevation-3">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Edit Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="font-medium">{member.efficiency}%</span>
                      </div>
                      <Progress value={member.efficiency} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Completed</span>
                          <div className="font-medium">{member.tasksCompleted}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">In Progress</span>
                          <div className="font-medium">{member.tasksInProgress}</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="pt-2 border-t border-outline-variant">
                      <span className="text-xs text-muted-foreground">Recent Activity</span>
                      <p className="text-sm mt-1">{member.recentActivity}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card className="elevation-1 border-outline-variant">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Detailed view of all team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-outline-variant hover:bg-surface-variant/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{member.name}</h4>
                            <Badge className={statusColors[member.status as keyof typeof statusColors]}>
                              {statusLabels[member.status as keyof typeof statusLabels]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{member.velocity}</div>
                          <div className="text-muted-foreground">Velocity</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{member.efficiency}%</div>
                          <div className="text-muted-foreground">Efficiency</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{member.tasksCompleted}</div>
                          <div className="text-muted-foreground">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{member.tasksInProgress}</div>
                          <div className="text-muted-foreground">In Progress</div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="elevation-3">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
