import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, MessageSquare, Paperclip } from "lucide-react"

const tasks = [
  {
    id: "TASK-1",
    title: "Implement user authentication",
    status: "In Progress",
    priority: "High",
    assignee: "You",
    storyPoints: 8,
    hasComments: true,
    hasAttachments: false,
  },
  {
    id: "TASK-2",
    title: "Design payment flow wireframes",
    status: "To Do",
    priority: "Medium",
    assignee: "You",
    storyPoints: 5,
    hasComments: false,
    hasAttachments: true,
  },
  {
    id: "TASK-3",
    title: "Fix responsive layout issues",
    status: "In Review",
    priority: "Low",
    assignee: "You",
    storyPoints: 3,
    hasComments: true,
    hasAttachments: false,
  },
  {
    id: "TASK-4",
    title: "Update API documentation",
    status: "To Do",
    priority: "Medium",
    assignee: "You",
    storyPoints: 2,
    hasComments: false,
    hasAttachments: false,
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-destructive text-destructive-foreground"
    case "Medium":
      return "bg-chart-4 text-white"
    case "Low":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "bg-muted text-muted-foreground"
    case "In Progress":
      return "bg-primary text-primary-foreground"
    case "In Review":
      return "bg-accent text-accent-foreground"
    case "Done":
      return "bg-chart-1 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function MyTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          My Tasks
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <Checkbox />
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground font-mono">{task.id}</span>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
              <p className="text-sm font-medium">{task.title}</p>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{task.storyPoints} SP</span>
                <div className="flex items-center space-x-1">
                  {task.hasComments && <MessageSquare className="h-3 w-3" />}
                  {task.hasAttachments && <Paperclip className="h-3 w-3" />}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
