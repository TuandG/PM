"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { use } from "react"

const columns = [
  { id: "todo", title: "To Do", count: 5 },
  { id: "inprogress", title: "In Progress", count: 3 },
  { id: "review", title: "In Review", count: 2 },
  { id: "done", title: "Done", count: 8 },
]

const tasks = {
  todo: [
    { id: "1", title: "User Authentication", points: 5, assignee: "JD", priority: "high" },
    { id: "2", title: "Database Schema", points: 8, assignee: "SM", priority: "medium" },
    { id: "3", title: "API Endpoints", points: 3, assignee: "AB", priority: "low" },
  ],
  inprogress: [
    { id: "4", title: "Frontend Components", points: 5, assignee: "JD", priority: "high" },
    { id: "5", title: "Testing Setup", points: 2, assignee: "SM", priority: "medium" },
  ],
  review: [{ id: "6", title: "Code Review", points: 1, assignee: "AB", priority: "high" }],
  done: [
    { id: "7", title: "Project Setup", points: 2, assignee: "JD", priority: "medium" },
    { id: "8", title: "Requirements Analysis", points: 3, assignee: "SM", priority: "low" },
  ],
}

export default function ProjectBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Sprint Board</h1>
        <p className="text-muted-foreground">Track progress of current sprint tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{column.title}</h2>
                <Badge variant="secondary">{column.count}</Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {tasks[column.id as keyof typeof tasks]?.map((task) => (
                <Card key={task.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.points} pts</span>
                      </div>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
