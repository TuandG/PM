"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  BarChart3,
  PieChartIcon,
  Activity,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

// Sample data for charts
const velocityData = [
  { sprint: "Sprint 1", planned: 45, completed: 42, team: "Team Alpha" },
  { sprint: "Sprint 2", planned: 50, completed: 48, team: "Team Alpha" },
  { sprint: "Sprint 3", planned: 55, completed: 52, team: "Team Alpha" },
  { sprint: "Sprint 4", planned: 48, completed: 45, team: "Team Alpha" },
  { sprint: "Sprint 5", planned: 52, completed: 49, team: "Team Alpha" },
  { sprint: "Sprint 6", planned: 58, completed: 55, team: "Team Alpha" },
]

const burndownData = [
  { day: "Day 1", ideal: 100, actual: 100 },
  { day: "Day 2", ideal: 90, actual: 95 },
  { day: "Day 3", ideal: 80, actual: 88 },
  { day: "Day 4", ideal: 70, actual: 82 },
  { day: "Day 5", ideal: 60, actual: 75 },
  { day: "Day 6", ideal: 50, actual: 68 },
  { day: "Day 7", ideal: 40, actual: 58 },
  { day: "Day 8", ideal: 30, actual: 45 },
  { day: "Day 9", ideal: 20, actual: 32 },
  { day: "Day 10", ideal: 10, actual: 18 },
  { day: "Day 11", ideal: 0, actual: 8 },
  { day: "Day 12", ideal: 0, actual: 0 },
]

const teamPerformanceData = [
  { name: "John Doe", completed: 24, planned: 26, efficiency: 92 },
  { name: "Jane Smith", completed: 28, planned: 30, efficiency: 93 },
  { name: "Mike Johnson", completed: 22, planned: 25, efficiency: 88 },
  { name: "Sarah Wilson", completed: 26, planned: 28, efficiency: 93 },
  { name: "Tom Brown", completed: 20, planned: 24, efficiency: 83 },
]

const sprintHealthData = [
  { name: "Completed", value: 65, color: "#22c55e" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "Blocked", value: 10, color: "#ef4444" },
]

const cumulativeFlowData = [
  { date: "Week 1", todo: 45, inProgress: 12, inReview: 8, done: 15 },
  { date: "Week 2", todo: 42, inProgress: 15, inReview: 10, done: 28 },
  { date: "Week 3", todo: 38, inProgress: 18, inReview: 12, done: 42 },
  { date: "Week 4", todo: 35, inProgress: 20, inReview: 8, done: 58 },
  { date: "Week 5", todo: 30, inProgress: 16, inReview: 6, done: 72 },
  { date: "Week 6", todo: 25, inProgress: 12, inReview: 4, done: 85 },
]

export default function ReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("last-6-sprints")
  const [selectedTeam, setSelectedTeam] = useState("all-teams")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track team performance and project insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-full border-outline bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="elevation-2 rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-48 rounded-full border-outline">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-sprint">Last Sprint</SelectItem>
            <SelectItem value="last-3-sprints">Last 3 Sprints</SelectItem>
            <SelectItem value="last-6-sprints">Last 6 Sprints</SelectItem>
            <SelectItem value="current-quarter">Current Quarter</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-40 rounded-full border-outline">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-teams">All Teams</SelectItem>
            <SelectItem value="team-alpha">Team Alpha</SelectItem>
            <SelectItem value="team-beta">Team Beta</SelectItem>
            <SelectItem value="team-gamma">Team Gamma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="elevation-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Velocity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49.2</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-chart-2" />
              <span className="text-chart-2">+5.2%</span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sprint Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-chart-2" />
              <span className="text-chart-2">+2.1%</span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-1.3%</span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-outline-variant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cycle Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2d</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingDown className="h-3 w-3 text-chart-2" />
              <span className="text-chart-2">-0.8d</span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-surface border border-outline-variant">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="velocity"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Velocity
          </TabsTrigger>
          <TabsTrigger
            value="burndown"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Burndown
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Team Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Sprint Health */}
            <Card className="elevation-2 border-outline-variant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5" />
                  <span>Current Sprint Health</span>
                </CardTitle>
                <CardDescription>Distribution of story status in current sprint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sprintHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sprintHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {sprintHealthData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cumulative Flow */}
            <Card className="elevation-2 border-outline-variant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Cumulative Flow</span>
                </CardTitle>
                <CardDescription>Work distribution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cumulativeFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
                      <XAxis dataKey="date" stroke="var(--color-on-surface-variant)" />
                      <YAxis stroke="var(--color-on-surface-variant)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid var(--color-outline-variant)",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="done"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="inReview"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="inProgress"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="todo"
                        stackId="1"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="elevation-1 border-outline-variant">
            <CardHeader>
              <CardTitle>Recent Sprint Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                <CheckCircle className="h-5 w-5 text-chart-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Sprint Goal Achieved</p>
                  <p className="text-xs text-muted-foreground">
                    Team completed 95% of planned story points in the last sprint
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
                <AlertTriangle className="h-5 w-5 text-chart-4 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Velocity Variance</p>
                  <p className="text-xs text-muted-foreground">
                    Team velocity has been inconsistent over the last 3 sprints
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Improved Cycle Time</p>
                  <p className="text-xs text-muted-foreground">Average story cycle time decreased by 15% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Velocity Tab */}
        <TabsContent value="velocity" className="space-y-6">
          <Card className="elevation-2 border-outline-variant">
            <CardHeader>
              <CardTitle>Team Velocity Trend</CardTitle>
              <CardDescription>Planned vs completed story points over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
                    <XAxis dataKey="sprint" stroke="var(--color-on-surface-variant)" />
                    <YAxis stroke="var(--color-on-surface-variant)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-outline-variant)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="planned" fill="var(--color-outline)" name="Planned" />
                    <Bar dataKey="completed" fill="var(--color-primary)" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Burndown Tab */}
        <TabsContent value="burndown" className="space-y-6">
          <Card className="elevation-2 border-outline-variant">
            <CardHeader>
              <CardTitle>Sprint Burndown Chart</CardTitle>
              <CardDescription>Current sprint progress vs ideal burndown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
                    <XAxis dataKey="day" stroke="var(--color-on-surface-variant)" />
                    <YAxis stroke="var(--color-on-surface-variant)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-outline-variant)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ideal"
                      stroke="var(--color-outline)"
                      strokeDasharray="5 5"
                      name="Ideal"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      name="Actual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Performance Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="elevation-2 border-outline-variant">
            <CardHeader>
              <CardTitle>Individual Performance</CardTitle>
              <CardDescription>Team member productivity and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformanceData.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-outline-variant"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {member.efficiency}% efficiency
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Completed: {member.completed}</span>
                        <span>Planned: {member.planned}</span>
                      </div>
                      <Progress value={member.efficiency} className="mt-2 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
