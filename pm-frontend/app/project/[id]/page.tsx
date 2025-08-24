import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  GitBranch,
  MessageSquare,
} from "lucide-react"

export default function ProjectSummary({ params }: { params: { id: string } }) {
  // Mock data for enhanced display
  const teamMembers = [
    { name: "Alice Johnson", role: "Product Owner", avatar: "/diverse-user-avatars.png", status: "online" },
    { name: "Bob Smith", role: "Scrum Master", avatar: "/diverse-user-avatars.png", status: "online" },
    { name: "Carol Davis", role: "Developer", avatar: "/diverse-user-avatars.png", status: "away" },
    { name: "David Wilson", role: "Developer", avatar: "/diverse-user-avatars.png", status: "offline" },
  ]

  const recentActivities = [
    { user: "Alice Johnson", action: "completed", item: "User Authentication Story", time: "2 hours ago" },
    { user: "Bob Smith", action: "updated", item: "Sprint 3 Planning", time: "4 hours ago" },
    { user: "Carol Davis", action: "commented on", item: "Payment Integration Task", time: "6 hours ago" },
    { user: "David Wilson", action: "created", item: "Bug Report #127", time: "1 day ago" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">E-commerce Platform</h1>
          <p className="text-muted-foreground mt-1">
            Next-generation e-commerce solution with advanced analytics and AI-powered recommendations
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              Started Oct 15, 2024
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              Due Dec 31, 2024
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            View Repository
          </Button>
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Team Chat
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/10</div>
            <Progress value={70} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">5 days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Story points per sprint</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+8% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 bugs, 1 blocker</p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Needs Attention
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Current Sprint - Sprint 3
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sprint Goal</span>
                <Badge variant="outline">Nov 15 - Nov 29</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete user authentication system and implement payment gateway integration
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Completed Tasks</span>
                  <span className="font-medium">7 of 10</span>
                </div>
                <Progress value={70} className="h-2" />

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-green-600">7</div>
                    <div className="text-muted-foreground">Done</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600">2</div>
                    <div className="text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600">1</div>
                    <div className="text-muted-foreground">To Do</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Burndown Chart</h4>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-sm text-muted-foreground">📈 Sprint burndown visualization would go here</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Code Quality</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Test Coverage</span>
                  <span className="font-medium text-blue-600">Good</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className="font-medium text-yellow-600">Fair</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Upcoming Milestones</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beta Release</span>
                    <span className="font-medium">Dec 15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Production Deploy</span>
                    <span className="font-medium">Dec 31</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
