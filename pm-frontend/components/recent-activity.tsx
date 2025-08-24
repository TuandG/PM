import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, CheckSquare, GitBranch } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "/sarah-chen.png",
    action: "completed task",
    target: "User Authentication Flow",
    time: "2 minutes ago",
    type: "task",
    icon: CheckSquare,
  },
  {
    id: 2,
    user: "Mike Johnson",
    avatar: "/mike-johnson-speaker.png",
    action: "commented on",
    target: "API Integration Story",
    time: "15 minutes ago",
    type: "comment",
    icon: MessageSquare,
  },
  {
    id: 3,
    user: "Lisa Wang",
    avatar: "/lisa-wang.png",
    action: "created branch",
    target: "feature/payment-gateway",
    time: "1 hour ago",
    type: "git",
    icon: GitBranch,
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "/david-kim.png",
    action: "moved task to",
    target: "In Review",
    time: "2 hours ago",
    type: "task",
    icon: CheckSquare,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
              <AvatarFallback>
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <activity.icon className="h-3 w-3 text-muted-foreground" />
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium text-primary">{activity.target}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
