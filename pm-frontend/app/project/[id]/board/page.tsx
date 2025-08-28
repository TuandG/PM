"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "review", title: "In Review" },
  { id: "done", title: "Done" },
]

const initialTasks = {
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

export default function ProjectBoardPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const [board, setBoard] = useState(initialTasks)
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null)
  const [dragSourceColumnId, setDragSourceColumnId] = useState<keyof typeof board | null>(null)
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<{
    id: string
    title: string
    points: number
    assignee: string
    priority: string
    columnId?: string
  } | null>(null)
  const DETAILS_WIDTH = 320

  const getPriorityBadgeVariant = useCallback((priority: string) => {
    if (priority === "high") return "destructive" as const
    if (priority === "medium") return "default" as const
    return "secondary" as const
  }, [])

  const handleDragStart = useCallback((taskId: string, sourceColumnId: keyof typeof board) => {
    setDraggingTaskId(taskId)
    setDragSourceColumnId(sourceColumnId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggingTaskId(null)
    setDragSourceColumnId(null)
    setHoveredColumnId(null)
  }, [])

  const handleDragOverColumn = useCallback((e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault()
    setHoveredColumnId(columnId)
  }, [])

  const handleDropOnColumn = useCallback((e: React.DragEvent<HTMLDivElement>, targetColumnId: keyof typeof board) => {
    e.preventDefault()
    if (!draggingTaskId || !dragSourceColumnId) return

    if (dragSourceColumnId === targetColumnId) {
      handleDragEnd()
      return
    }

    setBoard((prev) => {
      const sourceTasks = [...prev[dragSourceColumnId]]
      const targetTasks = [...prev[targetColumnId]]
      const idx = sourceTasks.findIndex((t) => t.id === draggingTaskId)
      if (idx === -1) return prev
      const [moved] = sourceTasks.splice(idx, 1)
      const updated: typeof prev = {
        ...prev,
        [dragSourceColumnId]: sourceTasks,
        [targetColumnId]: [...targetTasks, moved],
      }
      return updated
    })

    handleDragEnd()
  }, [dragSourceColumnId, draggingTaskId, handleDragEnd])

  const columnCounts = useMemo(() => ({
    todo: board.todo.length,
    inprogress: board.inprogress.length,
    review: board.review.length,
    done: board.done.length,
  }), [board])

  const getStatusFromColumn = (columnId: string) => {
    switch (columnId) {
      case 'todo': return 'todo'
      case 'inprogress': return 'in_progress'
      case 'review': return 'in_review'
      case 'done': return 'done'
      default: return 'todo'
    }
  }
  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Sprint Board</h1>
        <p className="text-muted-foreground">Track progress of current sprint tasks</p>
      </div>

      <div className="flex gap-6">
        <div
          className={`${selectedTask ? "flex-1" : "w-full"}`}
          style={{ width: selectedTask ? `calc(100% - ${DETAILS_WIDTH}px - 1.5rem)` : '100%' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`space-y-4 ${hoveredColumnId === column.id ? "ring-2 ring-primary/40 rounded-md outline-none" : ""}`}
                onDragOver={(e) => handleDragOverColumn(e, column.id)}
                onDrop={(e) => handleDropOnColumn(e, column.id as keyof typeof board)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{column.title}</h2>
                    <Badge variant="secondary">{columnCounts[column.id as keyof typeof columnCounts]}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <ul className="space-y-3">
                  {board[column.id as keyof typeof board]?.map((task) => (
                    <li key={task.id}>
                      <Card
                        className={`p-3 hover:shadow-md transition-shadow cursor-pointer ${draggingTaskId === task.id ? "opacity-50" : ""}`}
                        draggable
                        onDragStart={() => handleDragStart(task.id, column.id as keyof typeof board)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedTask({ ...task, columnId: column.id })}
                      >
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
                                variant={getPriorityBadgeVariant(task.priority)}
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
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {selectedTask && (
            <>
            <div className="w-px bg-outline-variant/50 self-stretch my-1" aria-hidden="true" />
            <Card className="p-0 bg-surface rounded-3xl elevation-2 border border-outline-variant/30 flex-shrink-0 overflow-hidden"
              style={{ width: DETAILS_WIDTH }}
            >
              {/* Header */}
              <div className="bg-surface-variant/20 px-4 py-3 border-b border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                      {`US-${selectedTask.id.padStart(3, '0')}`}
                    </Badge>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20 rounded-full text-xs">
                      {selectedTask.priority.toUpperCase()}
                    </Badge>
                    <Badge className={`rounded-full text-xs ${getStatusFromColumn(selectedTask.columnId || 'todo') === 'done' ? 'bg-chart-2/10 text-chart-2 border-chart-2/20' : 'bg-muted/40 text-muted-foreground border-muted/40'} border`}>
                      {getStatusFromColumn(selectedTask.columnId || 'todo').replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)} className="rounded-full h-7 w-7 p-0">
                    ✕
                  </Button>
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">{selectedTask.title}</h3>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Description */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Description</p>
                  <div className="rounded-2xl border border-outline-variant bg-surface-variant/30 px-3 py-3 text-sm text-muted-foreground">
                    No description provided
                  </div>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Story Points</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">{selectedTask.points}</div>
                      <span className="text-xs text-muted-foreground">Points</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Assignee</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 ring-2 ring-outline-variant/50">
                        <AvatarFallback className="text-xs">{selectedTask.assignee}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-foreground">{selectedTask.assignee}</div>
                        <div className="text-xs text-muted-foreground">Assigned</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sprint & Labels */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Sprint</p>
                    <div className="inline-flex rounded-full px-3 py-1 bg-muted/40 text-muted-foreground text-xs">Current Sprint</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Labels</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-surface-variant/50 text-on-surface-variant border border-outline-variant/50 text-xs">
                        {selectedTask.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6">View Details</Button>
                  <Button variant="outline" className="rounded-full border-outline bg-transparent">Clone</Button>
                </div>
              </div>
            </Card>
            </>
        )}
      </div>
    </div>
  )
}
