import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { use } from "react"

const teamMembers = [
  { id: "1", name: "John Doe", initials: "JD", status: "completed" },
  { id: "2", name: "Sarah Miller", initials: "SM", status: "pending" },
  { id: "3", name: "Alex Brown", initials: "AB", status: "completed" },
  { id: "4", name: "Emma Wilson", initials: "EW", status: "pending" },
]

export default function ProjectDailyScrumPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Daily Scrum</h1>
        <p className="text-muted-foreground">Track daily progress and blockers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Standup Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today's Standup</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                March 8, 2024
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">What did you accomplish yesterday?</label>
                <Textarea placeholder="Describe what you completed yesterday..." className="min-h-[80px]" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">What will you work on today?</label>
                <Textarea placeholder="Describe your plan for today..." className="min-h-[80px]" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Any blockers or impediments?</label>
                <Textarea placeholder="Describe any blockers or issues..." className="min-h-[60px]" />
              </div>

              <Button className="w-full">Submit Daily Update</Button>
            </div>
          </Card>

          {/* Recent Updates */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((update) => (
                <div key={update} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed user authentication module and started working on dashboard components.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Team Overview */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Status</h3>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{member.name}</span>
                  </div>
                  <Badge variant={member.status === "completed" ? "default" : "secondary"}>
                    {member.status === "completed" ? "Updated" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Blockers</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-red-800">API Integration Issue</p>
                  <p className="text-xs text-red-600">Waiting for third-party API documentation</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-yellow-800">Design Review</p>
                  <p className="text-xs text-yellow-600">Pending stakeholder approval</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sprint Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Completed Stories</span>
                <span>8/12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Story Points</span>
                <span>23/30</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Days Remaining</span>
                <span>8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
