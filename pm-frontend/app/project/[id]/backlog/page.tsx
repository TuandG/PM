"use client"

import React, { useState, useRef, useCallback, use } from "react"
import { Plus, Search, Filter, Grid, List, X, MoreVertical, Edit, Copy, Trash2, BookMarked, Bookmark, Bug, Check, SquareCheck, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const stories = [
  {
    id: "PROJ-001",
    type: "story",
    title: "User Registration",
    description: "As a new user, I want to create an account so that I can access the platform",
    priority: "high",
    storyPoints: 5,
    status: "done",
    assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", id: "john" },
    sprint: "Sprint 2",
    labels: ["authentication", "frontend"],
    createdDate: "2024-01-15",
    acceptanceCriteria: [
      { id: 1, text: "User can enter email and password", completed: true },
      { id: 2, text: "System validates email format", completed: true },
      { id: 3, text: "User receives confirmation email", completed: false },
    ],
  },
  {
    id: "PROJ-002",
    type: "story",
    title: "User Login",
    description: "As a registered user, I want to log in so that I can access my account",
    priority: "high",
    storyPoints: 3,
    status: "in_progress",
    assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", id: "jane" },
    sprint: "Sprint 3",
    labels: ["authentication", "backend"],
    createdDate: "2024-01-16",
    acceptanceCriteria: [
      { id: 1, text: "User can login with email/password", completed: true },
      { id: 2, text: "Invalid credentials show error", completed: false },
    ],
  },
  {
    id: "PROJ-003",
    type: "bug",
    title: "Password Reset",
    description: "As a user, I want to reset my password so that I can regain access to my account",
    priority: "medium",
    storyPoints: 3,
    status: "todo",
    assignee: null,
    sprint: null,
    labels: ["authentication"],
    createdDate: "2024-01-17",
    acceptanceCriteria: [],
  },
  {
    id: "PROJ-004",
    type: "story",
    title: "Product Listing",
    description: "As a customer, I want to browse products so that I can find items to purchase",
    priority: "high",
    storyPoints: 8,
    status: "todo",
    assignee: null,
    sprint: null,
    labels: ["catalog", "frontend"],
    createdDate: "2024-01-18",
    acceptanceCriteria: [],
  },
  {
    id: "PROJ-005",
    type: "task",
    title: "Product Search",
    description: "As a customer, I want to search for products so that I can quickly find what I need",
    priority: "medium",
    storyPoints: 5,
    status: "todo",
    assignee: null,
    sprint: null,
    labels: ["catalog", "search"],
    createdDate: "2024-01-19",
    acceptanceCriteria: [],
  },
]

const statusColors = {
  todo: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  done: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  blocked: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
  low: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
}

const typeIcons = {
  story: <Bookmark size={16} />,
  bug: <Bug size={16} />,
  task: <SquareCheck size={16} />,
}

export default function ProjectBacklogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [selectedStory, setSelectedStory] = useState<any>(null)

  const [selectedStories, setSelectedStories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    priority: "all",
    status: "all",
    assignee: "all",
    storyPoints: "all",
    sprint: "all",
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [workItemWidth, setWorkItemWidth] = useState(400) // Default width in pixels
  const containerRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)
  const [quickCreateTitle, setQuickCreateTitle] = useState("")
  const [quickCreateType, setQuickCreateType] = useState<"story" | "bug" | "task">("story")
  const [showQuickCreate, setShowQuickCreate] = useState(false)

  const toggleStorySelection = (storyId: string) => {
    setSelectedStories((prev) => (prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]))
  }

  const toggleSelectAll = () => {
    setSelectedStories((prev) => (prev.length === stories.length ? [] : stories.map((story) => story.id)))
  }

  const handleStoryClick = (story: any) => {
    setSelectedStory(story)
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isResizing.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const newWidth = containerRect.right - e.clientX

    // Min width: 300px, Max width: 60% of container
    const minWidth = 300
    const maxWidth = containerRect.width * 0.6

    setWorkItemWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)))
  }, [])

  const handleMouseUp = useCallback(() => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  const handleQuickCreate = () => {
    if (!quickCreateTitle.trim()) return

    // Generate a new ID (in real app, this would be handled by backend)
    const newId = `PROJ-${Date.now()}`

    const newWorkItem = {
      id: newId,
      title: quickCreateTitle.trim(),
      description: "",
      type: quickCreateType,
      status: "to_do",
      priority: "medium",
      storyPoints: 0,
      assignee: null,
      sprint: null,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      labels: [],
      comments: [],
      attachments: [],
      subtasks: [],
      acceptanceCriteria: []
    }

    // In real app, you would call an API here
    // For now, we'll just add it to the stories array (this is just for demo)
    stories.unshift(newWorkItem)

    // Clear the form and hide it
    setQuickCreateTitle("")
    setQuickCreateType("story")
    setShowQuickCreate(false)

    // Auto-select the new item
    setSelectedStory(newWorkItem)

    // Force a small delay to ensure layout recalculation
    setTimeout(() => {
      // Trigger a re-render if needed
      const container = containerRef.current
      if (container) {
        container.style.height = container.style.height
      }
    }, 0)
  }

  const handleQuickCreateKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickCreate()
    }
  }

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = filters.priority === "all" || story.priority === filters.priority
    const matchesStatus = filters.status === "all" || story.status === filters.status
    const matchesAssignee = filters.assignee === "all" || story.assignee?.id === filters.assignee
    const matchesPoints = filters.storyPoints === "all" || story.storyPoints.toString() === filters.storyPoints
    const matchesSprint = filters.sprint === "all" || story.sprint === filters.sprint

    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee && matchesPoints && matchesSprint
  })

  return (
    <div className="flex-1 space-y-6 p-2 sm:p-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Backlog</h1>
          <p className="text-muted-foreground">Manage and track work items for your project</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button className="elevation-2 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                New Work Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl elevation-3 rounded-3xl border-outline-variant/50">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-semibold text-on-surface">Create New Work Item</DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                {/* Title - Ưu tiên cao nhất */}
                <div>
                  <Label className="text-sm font-medium text-on-surface mb-2 block">Title *</Label>
                  <Input
                    placeholder="Enter work item title..."
                    className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-10"
                  />
                </div>

                {/* Description - Thứ hai */}
                <div>
                  <Label className="text-sm font-medium text-on-surface mb-2 block">Description</Label>
                  <Textarea
                    placeholder="Enter detailed description (optional)"
                    rows={3}
                    className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary resize-none"
                  />
                </div>

                {/* Type & Priority Row - Compact layout */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-on-surface mb-2 block">Type</Label>
                    <Select defaultValue="story">
                      <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                        <SelectItem value="story">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                              <Bookmark size={12} />
                            </div>
                            Story
                          </div>
                        </SelectItem>
                        <SelectItem value="bug">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                              <Bug size={12} />
                            </div>
                            Bug
                          </div>
                        </SelectItem>
                        <SelectItem value="task">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                              <SquareCheck size={12} />
                            </div>
                            Task
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-on-surface mb-2 block">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="lowest">Lowest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-on-surface mb-2 block">Story Points</Label>
                    <Select defaultValue="0">
                      <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Points & Assignee Row - Tối ưu space */}
                <div className="grid grid-cols-2 gap-4">

                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-on-surface mb-2 block">Assignee</Label>
                    <Select>
                      <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-9">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sprint - Cuối cùng */}
                  <div>
                    <Label className="text-sm font-medium text-on-surface mb-2 block">Sprint</Label>
                    <Select>
                      <SelectTrigger className="rounded-2xl border-outline-variant/50 bg-surface focus:border-primary h-9">
                        <SelectValue placeholder="Select sprint (optional)" />
                      </SelectTrigger>
                      <SelectContent className="elevation-3 rounded-2xl border-outline-variant/50">
                        <SelectItem value="backlog">Backlog</SelectItem>
                        <SelectItem value="sprint1">Sprint 1</SelectItem>
                        <SelectItem value="sprint2">Sprint 2</SelectItem>
                        <SelectItem value="sprint3">Sprint 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/30">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full elevation-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Create Work Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search backlog items..."
            className="pl-12 rounded-full border-outline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full border-outline bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter & Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 elevation-3 rounded-2xl">
            <div className="p-2">
              <Label className="text-xs font-medium">Priority</Label>
              <Select
                value={filters.priority}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-2">
              <Label className="text-xs font-medium">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-2">
              <Label className="text-xs font-medium">Assignee</Label>
              <Select
                value={filters.assignee}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, assignee: value }))}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue placeholder="All assignees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All assignees</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>


      </div>

      {selectedStories.length > 0 && (
        <div className="bg-primary-container border border-primary/20 rounded-2xl p-4 flex items-center justify-between elevation-1">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-on-primary-container">
              {selectedStories.length} items selected
            </span>
            <Button variant="outline" size="sm" className="rounded-full border-outline bg-transparent">
              Assign to Sprint
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-outline bg-transparent">
              Change Priority
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-outline bg-transparent">
              Bulk Edit
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-outline text-destructive bg-transparent">
              Delete
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedStories([])} className="rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div ref={containerRef} className="flex gap-4">
        <div className={`${selectedStory ? "flex-1" : "w-full"} space-y-4`} style={{
          width: selectedStory ? `calc(100% - ${workItemWidth}px - 1rem)` : '100%'
        }}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Backlog Items</h2>
            <div className="text-sm text-muted-foreground">Total: {filteredStories.length} items</div>
          </div>

          <div className="bg-surface rounded-3xl overflow-hidden">
            {/* Table Wrapper - Full Width */}
            <div className="w-full">
              <div className="w-full">
                {/* Header */}
                <div className="bg-surface-variant/30 px-6 py-1.5 border-b border-outline-variant/20 sticky top-0 z-10">
                  <div className="flex items-center min-h-[32px]">
                    <div className="w-12 flex-shrink-0 flex items-center justify-start">
                      <Checkbox
                        checked={selectedStories.length === filteredStories.length}
                        onCheckedChange={toggleSelectAll}
                        className="rounded-md"
                      />
                    </div>
                    <div className="w-16 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Type</div>
                    <div className="w-24 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Key</div>
                    <div className="flex-1 text-sm font-semibold text-on-surface-variant">Summary</div>
                    <div className="w-28 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Status</div>
                    <div className="w-28 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Priority</div>
                    <div className="w-20 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Points</div>
                    <div className="w-36 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Assignee</div>
                    <div className="w-24 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Sprint</div>
                    <div className="w-24 flex-shrink-0 text-sm font-semibold text-on-surface-variant">Created</div>
                    <div className="w-12 flex-shrink-0"></div>
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-outline-variant/10">
                  {filteredStories.map((story, index) => (
                    <div
                      key={story.id}
                      className={`flex items-center min-h-[48px] px-6 py-1.5 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${selectedStory?.id === story.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
                        } ${index % 2 === 0 ? "bg-surface" : "bg-surface-variant/10"}`}
                      onClick={() => handleStoryClick(story)}
                    >
                      {/* Checkbox */}
                      <div className="w-12 flex-shrink-0 flex items-center justify-start" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedStories.includes(story.id)}
                          onCheckedChange={() => toggleStorySelection(story.id)}
                          className="rounded-md"
                        />
                      </div>

                      {/* Type */}
                      <div className="w-16 flex-shrink-0 flex items-center justify-start">
                        <div className={`p-2 rounded-full ${story.type === 'story' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          story.type === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                          {typeIcons[story.type as keyof typeof typeIcons]}
                        </div>
                      </div>

                      {/* Key */}
                      <div className="w-24 flex-shrink-0">
                        <Link
                          href={`/project/${params.id}/work-items/${story.id}`}
                          className="text-primary hover:underline font-semibold text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {story.id}
                        </Link>
                      </div>

                      {/* Summary */}
                      <div className="flex-1 pr-4">
                        <div className="font-medium text-on-surface truncate">{story.title}</div>
                      </div>

                      {/* Status */}
                      <div className="w-28 flex-shrink-0">
                        <Badge
                          variant="outline"
                          className={`${statusColors[story.status as keyof typeof statusColors]} font-medium px-2 py-1 rounded-full text-xs whitespace-nowrap`}
                        >
                          {story.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>

                      {/* Priority */}
                      <div className="w-28 flex-shrink-0">
                        <Badge
                          variant="outline"
                          className={`${priorityColors[story.priority as keyof typeof priorityColors]} font-medium px-2 py-1 rounded-full text-xs whitespace-nowrap`}
                        >
                          {story.priority.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Points */}
                      <div className="w-20 flex-shrink-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/10 text-primary font-bold rounded-full text-sm flex items-center justify-center">
                          {story.storyPoints}
                        </div>
                      </div>

                      {/* Assignee */}
                      <div className="w-36 flex-shrink-0">
                        {story.assignee ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7 ring-2 ring-outline-variant/30 flex-shrink-0">
                              <AvatarImage
                                src={story.assignee.avatar || "/placeholder.svg"}
                                alt={story.assignee.name}
                              />
                              <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                {story.assignee.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-on-surface truncate">{story.assignee.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-surface-variant border-2 border-dashed border-outline-variant flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-on-surface-variant">?</span>
                            </div>
                            <span className="text-sm text-on-surface-variant italic truncate">Unassigned</span>
                          </div>
                        )}
                      </div>

                      {/* Sprint */}
                      <div className="w-24 flex-shrink-0">
                        {story.sprint ? (
                          <Badge variant="secondary" className="bg-secondary/30 text-secondary-foreground font-medium px-2 py-1 rounded-full text-xs whitespace-nowrap">
                            {story.sprint}
                          </Badge>
                        ) : (
                          <span className="text-sm text-on-surface-variant italic">-</span>
                        )}
                      </div>

                      {/* Created */}
                      <div className="w-24 flex-shrink-0 text-sm text-on-surface-variant font-mono">{story.createdDate}</div>

                      {/* Actions */}
                      <div className="w-12 flex-shrink-0 flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-surface-variant/50">
                              <MoreVertical className="h-4 w-4 text-on-surface-variant" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="elevation-3 rounded-2xl border-outline-variant/50">
                            <DropdownMenuItem className="rounded-lg">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">
                              <Copy className="w-4 h-4 mr-2" />
                              Clone
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive rounded-lg">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                  {/* Smart Appended Create Row */}
                  <div className={`flex items-center min-h-[48px] px-6 py-1.5 bg-surface-variant/10 border-t border-outline-variant/20 ${showQuickCreate ? 'sticky bottom-0' : ''
                    }`}>
                    {!showQuickCreate ? (
                      // Simple Create Button - Centered
                      <div className="w-full flex items-center justify-center">
                        <Button
                          onClick={() => setShowQuickCreate(true)}
                          variant="ghost"
                          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-2xl px-4 py-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm font-medium">Create</span>
                        </Button>
                      </div>
                    ) : (
                      // Full Create Form - Aligned with columns
                      <>
                        {/* Empty checkbox space */}
                        <div className="w-12 flex-shrink-0 flex items-center justify-start">
                          <Button
                            onClick={() => setShowQuickCreate(false)}
                            variant="ghost"
                            size="sm"
                            className="h-5 w-3 p-0 rounded-full hover:bg-surface-variant/50"
                          >
                            <X className="h-3 w-3 text-on-surface-variant" />
                          </Button>
                        </div>

                        {/* Type Selector */}
                        <div className="w-16 flex-shrink-0 flex items-center justify-start">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1 rounded-full hover:bg-surface-variant/50">
                                <div className={`p-1.5 rounded-full ${quickCreateType === 'story' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                                  quickCreateType === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                    'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                  }`}>
                                  {typeIcons[quickCreateType]}
                                </div>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="elevation-3 rounded-2xl border-outline-variant/50">
                              <DropdownMenuItem onClick={() => setQuickCreateType("story")} className="rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <Bookmark size={12} />
                                  </div>
                                  Story
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setQuickCreateType("bug")} className="rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    <Bug size={12} />
                                  </div>
                                  Bug
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setQuickCreateType("task")} className="rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                    <SquareCheck size={12} />
                                  </div>
                                  Task
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Empty Key space */}
                        <div className="w-24 flex-shrink-0 text-sm text-on-surface-variant italic">Auto</div>

                        {/* Title Input */}
                        <div className="flex-1 pr-4">
                          <Input
                            placeholder="Enter work item title..."
                            value={quickCreateTitle}
                            onChange={(e) => setQuickCreateTitle(e.target.value)}
                            onKeyPress={handleQuickCreateKeyPress}
                            className="bg-surface border-outline-variant/50 rounded-2xl text-sm focus:border-primary"
                            autoFocus
                          />
                        </div>

                        {/* Default values placeholders */}
                        <div className="w-28 flex-shrink-0 text-sm text-on-surface-variant italic">To Do</div>
                        <div className="w-28 flex-shrink-0 text-sm text-on-surface-variant italic">Medium</div>
                        <div className="w-20 flex-shrink-0 text-sm text-on-surface-variant italic text-center">0</div>
                        <div className="w-36 flex-shrink-0 text-sm text-on-surface-variant italic">Unassigned</div>
                        <div className="w-24 flex-shrink-0 text-sm text-on-surface-variant italic">-</div>
                        <div className="w-24 flex-shrink-0 text-sm text-on-surface-variant italic">Today</div>

                        {/* Action Buttons */}
                        <div className="w-12 flex-shrink-0 flex items-center justify-end gap-1">

                          <Button
                            onClick={handleQuickCreate}
                            disabled={!quickCreateTitle.trim()}
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-3 w-3 text-primary-foreground" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {selectedStory && (
          <>
            {/* Resizer */}
            <div
              className="w-1 bg-outline-variant/30 hover:bg-primary/50 cursor-col-resize transition-colors flex items-center justify-center group"
              onMouseDown={handleMouseDown}
            >
              <div className="w-1 h-8 bg-outline-variant/50 group-hover:bg-primary/70 rounded-full transition-colors"></div>
            </div>

            <div className="space-y-4" style={{ width: workItemWidth }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-on-surface">Work Item Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedStory(null)} className="rounded-full hover:bg-surface-variant/50">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30">
                {/* Header Section */}
                <div className="bg-surface-variant/20 px-4 py-3 border-b border-outline-variant/20 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded-full ${selectedStory.type === 'story' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                      selectedStory.type === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                        'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                      {typeIcons[selectedStory.type as keyof typeof typeIcons]}
                    </div>
                    <Link
                      href={`/project/${params.id}/work-items/${selectedStory.id}`}
                      className="text-primary hover:underline font-semibold text-sm"
                    >
                      {selectedStory.id}
                    </Link>
                    <div className="flex items-center gap-2 ml-auto">
                      <Badge
                        variant="outline"
                        className={`${priorityColors[selectedStory.priority as keyof typeof priorityColors]} font-medium px-2 py-0.5 rounded-full text-xs`}
                      >
                        {selectedStory.priority.toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${statusColors[selectedStory.status as keyof typeof statusColors]} font-medium px-2 py-0.5 rounded-full text-xs`}
                      >
                        {selectedStory.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-on-surface leading-tight">{selectedStory.title}</h3>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-4">
                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-on-surface">Description</Label>
                    <div className="bg-surface-variant/30 rounded-2xl p-3 border border-outline-variant/50">
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {selectedStory.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Story Points */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-on-surface">Story Points</Label>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 text-primary font-bold rounded-full text-sm flex items-center justify-center">
                          {selectedStory.storyPoints}
                        </div>
                        <span className="text-xs text-on-surface-variant">Points</span>
                      </div>
                    </div>

                    {/* Assignee */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-on-surface">Assignee</Label>
                      {selectedStory.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 ring-2 ring-outline-variant/50">
                            <AvatarImage src={selectedStory.assignee.avatar || "/placeholder.svg"} alt={selectedStory.assignee.name} />
                            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                              {selectedStory.assignee.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-on-surface">{selectedStory.assignee.name}</div>
                            <div className="text-xs text-on-surface-variant">Assigned</div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-dashed border-outline-variant flex items-center justify-center">
                            <span className="text-xs text-on-surface-variant">?</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-on-surface-variant">Unassigned</div>
                            <div className="text-xs text-on-surface-variant">No assignee</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sprint & Labels */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-on-surface">Sprint</Label>
                      <div className="mt-1">
                        {selectedStory.sprint ? (
                          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground font-medium px-3 py-1 rounded-full text-xs">
                            {selectedStory.sprint}
                          </Badge>
                        ) : (
                          <span className="text-xs text-on-surface-variant italic bg-surface-variant/30 px-3 py-1 rounded-full">Not assigned</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-on-surface">Labels</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStory.labels.map((label: string) => (
                          <Badge key={label} variant="secondary" className="text-xs rounded-full px-2 py-0.5 bg-surface-variant/50 text-on-surface-variant border border-outline-variant/50">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-outline-variant/20">
                    <Link href={`/project/${params.id}/work-items/${selectedStory.id}`} className="flex-1">
                      <Button size="sm" className="w-full rounded-full elevation-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        <Edit className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50 text-xs">
                      <Copy className="w-3 h-3 mr-2" />
                      Clone
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
