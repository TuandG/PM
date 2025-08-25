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
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  GitBranch,
  MessageSquare,
  BarChart3,
  PieChart,
  Bug,
  BookOpen,
  CheckSquare,
} from "lucide-react"

export default function ProjectSummary({ params }: { params: { id: string } }) {
  // Mock data for enhanced display
  const recentActivities = [
    { user: "Alice Johnson", action: "completed", item: "User Authentication Story", time: "2 hours ago" },
    { user: "Bob Smith", action: "updated", item: "Sprint 3 Planning", time: "4 hours ago" },
    { user: "Carol Davis", action: "commented on", item: "Payment Integration Task", time: "6 hours ago" },
    { user: "David Wilson", action: "created", item: "Bug Report #127", time: "1 day ago" },
  ]

  // Work type distribution data
  const workTypeData = [
    { type: "User Stories", count: 24, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300", icon: BookOpen },
    { type: "Tasks", count: 18, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300", icon: CheckSquare },
    { type: "Bugs", count: 7, color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300", icon: Bug },
  ]

  const totalWorkItems = workTypeData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="p-2 sm:p-6 max-w-full xl:max-w-7xl mx-auto space-y-6">
      {/* Header Section - Material 3 Style */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">E-commerce Platform</h1>
          <p className="text-on-surface-variant mt-2 text-base leading-relaxed max-w-2xl">
            Next-generation e-commerce solution with advanced analytics and AI-powered recommendations
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full px-3 py-1">
              <CheckCircle className="w-3 h-3 mr-1.5" />
              Active
            </Badge>
            <div className="flex items-center text-sm text-on-surface-variant">
              <Calendar className="w-4 h-4 mr-1.5" />
              Started Oct 15, 2024
            </div>
            <div className="flex items-center text-sm text-on-surface-variant">
              <Clock className="w-4 h-4 mr-1.5" />
              Due Dec 31, 2024
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button variant="outline" className="rounded-full bg-transparent hover:bg-surface-variant/50">
            <GitBranch className="w-4 h-4 mr-2" />
            View Repository
          </Button>
          <Button className="rounded-full elevation-2 bg-primary hover:bg-primary/90">
            <MessageSquare className="w-4 h-4 mr-2" />
            Team Chat
          </Button>
        </div>
      </div>

      {/* Stats Cards - Material 3 Style */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-surface-variant/30 rounded-3xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-on-surface">Overall Progress</CardTitle>
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-on-surface">68%</div>
            <Progress value={68} className="h-2" />
            <p className="text-xs text-on-surface-variant">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-variant/30 rounded-3xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-on-surface">Sprint Progress</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-on-surface">7/10</div>
            <Progress value={70} className="h-2" />
            <p className="text-xs text-on-surface-variant">5 days remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-variant/30 rounded-3xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-on-surface">Team Velocity</CardTitle>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-on-surface">42</div>
            <p className="text-xs text-on-surface-variant">Story points per sprint</p>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-xs text-green-600 dark:text-green-400">+8% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface-variant/30 rounded-3xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-on-surface">Issues</CardTitle>
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold text-on-surface">3</div>
            <p className="text-xs text-on-surface-variant">2 bugs, 1 blocker</p>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full px-2 py-0.5 text-xs">
              Needs Attention
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Equal Width Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Sprint Card - Material 3 Style */}
        <Card className="bg-surface-variant/20 rounded-3xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-on-surface">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Current Sprint - Sprint 3
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-on-surface">Sprint Goal</span>
              <Badge className="bg-surface-variant/50 text-on-surface-variant rounded-full px-3 py-1">
                Nov 15 - Nov 29
              </Badge>
            </div>

            <div className="flex-1 mb-3">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Complete user authentication system and implement payment gateway integration
              </p>
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface">Completed Tasks</span>
                <span className="font-medium text-on-surface">7 of 10</span>
              </div>
              <Progress value={70} className="h-2" />

              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-2 rounded-2xl bg-green-100 dark:bg-green-900/20">
                  <div className="font-semibold text-green-700 dark:text-green-300 text-lg">7</div>
                  <div className="text-green-600 dark:text-green-400 text-xs">Done</div>
                </div>
                <div className="p-2 rounded-2xl bg-blue-100 dark:bg-blue-900/20">
                  <div className="font-semibold text-blue-700 dark:text-blue-300 text-lg">2</div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs">In Progress</div>
                </div>
                <div className="p-2 rounded-2xl bg-surface-variant/50">
                  <div className="font-semibold text-on-surface-variant text-lg">1</div>
                  <div className="text-on-surface-variant text-xs">To Do</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card - Material 3 Style - Equal Size */}
        <Card className="bg-surface-variant/20 rounded-3xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-on-surface">
              <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-2xl hover:bg-surface-variant/30 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface">
                      <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards Row - Burndown Chart & Work Types */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Burndown Chart Card - Material 3 Style */}
        <Card className="bg-surface-variant/20 rounded-3xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-on-surface">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              Sprint Burndown Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface">Sprint Progress</span>
                <span className="text-on-surface-variant">Day 10 of 14</span>
              </div>
              <div className="h-48 bg-surface-variant/30 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 text-on-surface-variant mx-auto mb-2" />
                  <div className="text-sm text-on-surface-variant">Sprint burndown visualization</div>
                  <div className="text-xs text-on-surface-variant mt-1">Interactive chart would display here</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="font-semibold text-on-surface">32</div>
                  <div className="text-on-surface-variant">Ideal</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-600 dark:text-blue-400">28</div>
                  <div className="text-on-surface-variant">Actual</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600 dark:text-green-400">4</div>
                  <div className="text-on-surface-variant">Ahead</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Types Distribution Card - Material 3 Style */}
        <Card className="bg-surface-variant/20 rounded-3xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-on-surface">
              <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              Work Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-on-surface">{totalWorkItems}</div>
                <div className="text-sm text-on-surface-variant">Total Work Items</div>
              </div>

              <div className="space-y-2">
                {workTypeData.map((item, index) => {
                  const percentage = ((item.count / totalWorkItems) * 100).toFixed(1)
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${item.color.split(' ')[0]} ${item.color.split(' ')[1].replace('text-', 'text-').replace('dark:', 'dark:text-')}`}>
                            <item.icon className="w-3 h-3" />
                          </div>
                          <span className="text-sm font-medium text-on-surface">{item.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-on-surface">{item.count}</span>
                          <span className="text-xs text-on-surface-variant">({percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={(item.count / totalWorkItems) * 100} className="h-2" />
                    </div>
                  )
                })}
              </div>

              <div className="pt-2">
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <div className="font-semibold text-blue-600 dark:text-blue-400">49%</div>
                    <div className="text-on-surface-variant">Stories</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600 dark:text-green-400">37%</div>
                    <div className="text-on-surface-variant">Tasks</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-600 dark:text-red-400">14%</div>
                    <div className="text-on-surface-variant">Bugs</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
