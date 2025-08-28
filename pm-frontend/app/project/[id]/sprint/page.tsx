"use client"

import { use, useRef, useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Calendar, 
  Clock, 
  Target, 
  Users, 
  Plus, 
  MoreVertical, 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  Play,
  Square,
  CheckCircle2,
  TrendingUp,
  Flag,
  User,
  Zap,
  BarChart3,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import NextLink from "next/link"

const sprints = [
  {
  id: 3,
  name: "Sprint 3",
    number: 3,
    goal: "Complete user authentication and basic product catalog functionality with comprehensive testing",
  startDate: "March 1, 2024",
  endDate: "March 15, 2024",
  status: "active",
  progress: 77,
    storyPoints: { completed: 23, committed: 30 },
    tasks: { done: 18, total: 24 },
    velocity: 3.2,
  daysLeft: 8,
    totalDays: 14,
  stories: [
    {
      id: "US-001",
      title: "User Registration",
      status: "done",
      storyPoints: 5,
        priority: "high",
      assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-002",
      title: "User Login",
      status: "in_progress",
      storyPoints: 3,
        priority: "high",
      assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-006",
      title: "Product Categories",
      status: "todo",
      storyPoints: 8,
        priority: "medium",
      assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-020",
      title: "Search Suggestions",
      status: "todo",
      storyPoints: 3,
      priority: "low",
      assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-021",
      title: "Product Reviews",
      status: "todo",
      storyPoints: 5,
      priority: "medium",
      assignee: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "US-022",
      title: "Checkout Address Validation",
      status: "todo",
      storyPoints: 3,
      priority: "high",
      assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    },
  ],
  },
  {
    id: 4,
    name: "Sprint 4",
    number: 4,
    goal: "Implement shopping cart and checkout process with payment integration",
    startDate: "March 16, 2024",
    endDate: "March 30, 2024",
    status: "planned",
    progress: 0,
    storyPoints: { committed: 0, capacity: 30 },
    tasks: { done: 0, total: 0 },
    velocity: 0,
    daysLeft: 22,
    totalDays: 14,
    stories: [],
  },
  {
    id: 5,
    name: "Sprint 5",
    number: 5,
    goal: "Implement shopping cart and checkout process with payment integration",
    startDate: "March 16, 2024",
    endDate: "March 30, 2024",
    status: "planned",
    progress: 0,
    storyPoints: { committed: 0, capacity: 30 },
    tasks: { done: 0, total: 0 },
    velocity: 0,
    daysLeft: 22,
    totalDays: 14,
    stories: [],
  },
  {
    id: 6,
    name: "Sprint 6",
    number: 6,
    goal: "Implement shopping cart and checkout process with payment integration",
    startDate: "March 16, 2024",
    endDate: "March 30, 2024",
    status: "planned",
    progress: 0,
    storyPoints: { committed: 0, capacity: 30 },
    tasks: { done: 0, total: 0 },
    velocity: 0,
    daysLeft: 22,
    totalDays: 14,
    stories: [],
  },
  {
    id: 2,
    name: "Sprint 2",
    number: 2,
    goal: "Setup project infrastructure and basic UI components",
    startDate: "February 15, 2024",
    endDate: "February 29, 2024",
    status: "completed",
    progress: 100,
    storyPoints: { completed: 28, committed: 30 },
    tasks: { done: 22, total: 22 },
    velocity: 2.0,
    completedDate: "February 29, 2024",
    stories: [
      { 
        id: "US-007", 
        title: "Project Setup", 
        status: "done", 
        storyPoints: 8, 
        priority: "high",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" }
      },
      { 
        id: "US-008", 
        title: "Basic Layout", 
        status: "done", 
        storyPoints: 5, 
        priority: "medium",
        assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" }
      },
      { 
        id: "US-009", 
        title: "Navigation Menu", 
        status: "done", 
        storyPoints: 3, 
        priority: "medium",
        assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" }
      },
    ],
  },
  {
    id: 1,
    name: "Sprint 1",
    number: 1,
    goal: "Initial project planning and design system setup",
    startDate: "February 1, 2024",
    endDate: "February 14, 2024",
    status: "completed",
    progress: 100,
    storyPoints: { completed: 25, committed: 25 },
    tasks: { done: 15, total: 15 },
    velocity: 1.8,
    completedDate: "February 14, 2024",
    stories: [
      { 
        id: "US-010", 
        title: "Requirements Analysis", 
        status: "done", 
        storyPoints: 8, 
        priority: "high",
        assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" }
      },
      { 
        id: "US-011", 
        title: "UI/UX Design", 
        status: "done", 
        storyPoints: 13, 
        priority: "high",
        assignee: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" }
      },
    ],
  },
]

const backlogItems = [
  { 
    id: "US-003", 
    title: "Password Reset Functionality", 
    storyPoints: 3, 
    priority: "medium",
    assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" }
  },
  { 
    id: "US-004", 
    title: "Product Listing with Pagination", 
    storyPoints: 8, 
    priority: "high",
    assignee: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" }
  },
  { 
    id: "US-005", 
    title: "Advanced Product Search", 
    storyPoints: 5, 
    priority: "medium",
    assignee: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" }
  },
  { 
    id: "US-012", 
    title: "User Profile Management", 
    storyPoints: 5, 
    priority: "low",
    assignee: null
  },
  { 
    id: "US-013", 
    title: "Order History", 
    storyPoints: 8, 
    priority: "medium",
    assignee: { name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" }
  },
]

const statusColors = {
  planned: "bg-muted text-muted-foreground border-muted",
  active: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-primary/10 text-primary border-primary/20",
  done: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  blocked: "bg-destructive/10 text-destructive border-destructive/20",
}

const priorityColors = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-chart-4/10 text-chart-4",
  low: "bg-chart-2/10 text-chart-2",
}

export default function ProjectSprintPage({ params }: { params: Promise<{ id: string }> }) {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [expandedSprints, setExpandedSprints] = useState<number[]>([])
  const [backlogSearchQuery, setBacklogSearchQuery] = useState('')
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [workItemWidth, setWorkItemWidth] = useState(400)
  const containerRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)
  const [sprintEdits, setSprintEdits] = useState<Record<number, Partial<any>>>({})
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<{ name: string; goal: string; startDate: string; durationWeeks: number; storyPointLimit: number }>({ name: '', goal: '', startDate: '', durationWeeks: 2, storyPointLimit: 30 })
  const [editingSprintId, setEditingSprintId] = useState<number | null>(null)
  const [newSprint, setNewSprint] = useState({
    name: '',
    goal: '',
    duration: 2,
    startDate: '',
    storyPointLimit: 30
  })
  const resolvedParams = use(params);
  const topSprintRef = useRef<HTMLDivElement | null>(null)
  const pageTopRef = useRef<HTMLDivElement | null>(null)
  const activeSprintDefault = sprints.find(sprint => sprint.status === 'active')
  const firstPlannedDefault = sprints.find(sprint => sprint.status === 'planned')
  const [topSprintId, setTopSprintId] = useState<number>((activeSprintDefault?.id) ?? (firstPlannedDefault?.id ?? sprints[0].id))
  const topSprint = sprints.find(s => s.id === topSprintId) || sprints[0]

  const selectTopSprint = (sprint: { id: number }) => {
    setTopSprintId(sprint.id)
    // After re-render, scroll to absolute top
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = (document.scrollingElement || document.documentElement) as HTMLElement
        const topEl = pageTopRef.current
        if (topEl) {
          topEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          root.scrollTo({ top: 0, behavior: 'smooth' })
        }
        // Ensure absolute top after smooth scroll completes
        setTimeout(() => {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          root.scrollTop = 0
          window.scrollTo({ top: 0 })
        }, 300)
      })
    })
  }

  const backToActiveSprint = () => {
    if (activeSprintDefault) {
      selectTopSprint({ id: activeSprintDefault.id })
    }
  }

  const toggleSprintStories = (sprintId: number) => {
    setExpandedSprints(prev => 
      prev.includes(sprintId) 
        ? prev.filter(id => id !== sprintId)
        : [...prev, sprintId]
    )
  }

  const filteredSprints = sprints.filter(sprint => {
    const matchesSearch = sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.goal.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sprint.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBacklogItems = backlogItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(backlogSearchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(backlogSearchQuery.toLowerCase())
    return matchesSearch
  })

  const activeSprint = sprints.find(sprint => sprint.status === 'active')
  const teamMetrics = {
    avgVelocity: 27,
    teamCapacity: 30,
    successRate: 96,
    completedSprints: sprints.filter(s => s.status === 'completed').length
  }

  const handleCreateSprint = () => {
    console.log('Creating sprint:', newSprint)
    setShowCreateModal(false)
    setNewSprint({ name: '', goal: '', duration: 2, startDate: '', storyPointLimit: 30 })
  }

  const getSprintStatusIcon = (status: string) => {
    switch (status) {
      case 'planned': return <Clock className="w-4 h-4" />
      case 'active': return <Play className="w-4 h-4" />
      case 'completed': return <CheckCircle2 className="w-4 h-4" />
      default: return <Square className="w-4 h-4" />
    }
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

  const getSprintActions = (sprint: any) => {
    switch (sprint.status) {
      case 'planned':
        return [
          { label: 'Sprint Planning', action: () => window.location.href = `/project/${resolvedParams.id}/sprint/${sprint.id}/planning` },
          { label: 'Start Sprint', action: () => {} }
        ]
      case 'active':
        return [
          { label: 'View Board', action: () => {} },
          { label: 'Complete Sprint', action: () => {} }
        ]
      case 'completed':
        return [
          { label: 'Sprint Reports', action: () => {} },
          { label: 'Retrospective', action: () => {} }
        ]
      default:
        return []
    }
  }

  const computeDurationWeeks = (start: string, end: string): number => {
    try {
      const s = new Date(start)
      const e = new Date(end)
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return 2
      const diffDays = Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)))
      return Math.max(1, Math.round(diffDays / 7))
    } catch {
      return 2
    }
  }

  const computeEndDateString = (start: string, durationWeeks: number): string => {
    try {
      const s = new Date(start)
      if (isNaN(s.getTime())) return ''
      const days = Math.max(1, durationWeeks * 7)
      const e = new Date(s)
      e.setDate(s.getDate() + days - 1)
      return e.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return ''
    }
  }

  const saveQuickEdit = () => {
    if (editingSprintId == null) return
    const startDate = editForm.startDate
    const endDate = computeEndDateString(editForm.startDate, editForm.durationWeeks)
    setSprintEdits(prev => ({
      ...prev,
      [editingSprintId]: {
        ...prev[editingSprintId],
        name: editForm.name,
        goal: editForm.goal,
        startDate,
        endDate,
        durationWeeks: editForm.durationWeeks,
        storyPointLimit: editForm.storyPointLimit,
      }
    }))
    setIsEditOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div ref={pageTopRef} className="p-2 sm:p-4 max-w-full xl:max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Plan and manage sprints for your project</h1>
           
          </div>
          <div className="flex items-center gap-3">
            {topSprint?.status !== 'active' && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-outline hover:bg-muted/50 hidden sm:inline-flex"
                onClick={backToActiveSprint}
                title="Back to active sprint"
              >
                Back to Active
              </Button>
            )}
            <div className="flex items-center gap-1 bg-muted/30 rounded-full p-1">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="rounded-full h-8"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-full h-8"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create new sprint
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-2xl">
                <DialogHeader className="pb-4">
                  <DialogTitle className="text-xl font-semibold">Create New Sprint</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Sprint Name</Label>
                    <Input
                      placeholder={`Sprint ${sprints.length + 1}`}
                      value={newSprint.name}
                      onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                      className="rounded-2xl border-input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Sprint Goal</Label>
                    <Textarea
                      placeholder="Describe the main objective of this sprint..."
                      value={newSprint.goal}
                      onChange={(e) => setNewSprint({ ...newSprint, goal: e.target.value })}
                      rows={3}
                      className="rounded-2xl border-input resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Duration (weeks)</Label>
                      <Select value={newSprint.duration.toString()} onValueChange={(value) => setNewSprint({ ...newSprint, duration: parseInt(value) })}>
                        <SelectTrigger className="rounded-2xl border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="1">1 week</SelectItem>
                          <SelectItem value="2">2 weeks</SelectItem>
                          <SelectItem value="3">3 weeks</SelectItem>
                          <SelectItem value="4">4 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Start Date</Label>
                      <Input
                        type="date"
                        value={newSprint.startDate}
                        onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                        className="rounded-2xl border-input"
                      />
                    </div>
                  </div>
        <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Story Point Limit</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={newSprint.storyPointLimit}
                      onChange={(e) => setNewSprint({ ...newSprint, storyPointLimit: parseInt(e.target.value) || 30 })}
                      className="rounded-2xl border-input"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowCreateModal(false)} className="rounded-full">
                      Cancel
                    </Button>
                    <NextLink href={`/project/${resolvedParams.id}/sprint/${filteredSprints.find(s => s.status === 'planned')?.id || 4}/planning`}>
                      <Button variant="outline" className="rounded-full border-outline">
                        Plan Sprint
                      </Button>
                    </NextLink>
                    <Button onClick={handleCreateSprint} className="rounded-full">
                      Start Sprint
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sprints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full border-outline"
          />
        </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 rounded-full border-outline">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div ref={containerRef} className="flex gap-4">
          <div className={`${selectedStory ? "flex-1" : "w-full"} space-y-4`} style={{
            width: selectedStory ? `calc(100% - ${workItemWidth}px - 1rem)` : '100%'
          }}>
            {viewMode === 'card' ? (
              <div className="space-y-8">
                {/* Top Sprint - selected */}
                {[topSprint].map((sprint) => (
                  <div
                    key={sprint.id}
                    ref={topSprintRef}
                    className="rounded-3xl overflow-hidden bg-primary/5 transition-all duration-200"
                  >
                    {/* Sprint Header */}
                    <div className="bg-muted/30 px-4 py-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <Play className="w-4 h-4" />
      </div>
                <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-foreground">{(sprintEdits[sprint.id]?.name as any) || sprint.name}</h3>
                              <Badge className={`${sprint.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted/50 text-muted-foreground border-muted/50'} border font-medium px-3 py-1 rounded-full text-sm`}>
                                {sprint.status === 'active' ? 'Active' : sprint.status === 'planned' ? 'Planned' : 'Completed'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{(sprintEdits[sprint.id]?.startDate as any) || sprint.startDate} - {(sprintEdits[sprint.id]?.endDate as any) || sprint.endDate}</span>
                              {sprint.status !== 'completed' && (
                                <span className="font-medium text-primary">{sprint.daysLeft} days left</span>
                              )}
                            </div>
                          </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:bg-muted/50 border-outline"
                    onClick={() => {
                      const current: any = { ...sprint, ...(sprintEdits[sprint.id] || {}) }
                      setEditingSprintId(sprint.id)
                      const durationWeeks = computeDurationWeeks(current.startDate || '', current.endDate || '')
                      setEditForm({
                        name: current.name || '',
                        goal: current.goal || '',
                        startDate: current.startDate || '',
                        durationWeeks: Number.isFinite(durationWeeks) ? durationWeeks : 2,
                        storyPointLimit: (current.storyPointLimit as number) || 30,
                      })
                      setIsEditOpen(true)
                    }}
                  >
                    Quick Edit
                  </Button>
                </div>
              </div>
                    </div>

                    {/* Sprint Content */}
                    <div className="px-4 py-4">
                      {/* Sprint Goal */}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Sprint Goal:</p>
                        <p className="text-foreground leading-relaxed">{(sprintEdits[sprint.id]?.goal as any) || sprint.goal}</p>
                      </div>

                      {/* Progress Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-muted/30 rounded-2xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Story Points</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">
                            {sprint.storyPoints.completed}/{sprint.storyPoints.committed}
                  </div>
                </div>

                        <div className="bg-muted/30 rounded-2xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-chart-2" />
                            <span className="text-sm font-medium text-foreground">Tasks</span>
                  </div>
                          <div className="text-xl font-bold text-foreground">
                            {sprint.tasks.done}/{sprint.tasks.total}
                </div>
                  </div>

                        <div className="bg-muted/30 rounded-2xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-chart-4" />
                            <span className="text-sm font-medium text-foreground">Velocity</span>
                </div>
                          <div className="text-xl font-bold text-foreground">
                            {sprint.velocity} pts/day
                  </div>
                </div>
              </div>

                      {/* Progress Bar */}
                      <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sprint Progress</span>
                          <span className="font-medium text-foreground">{sprint.progress}%</span>
                </div>
                        <Progress value={sprint.progress} className="h-2" />
              </div>

                      {/* Sprint Stories - Hidden by default */}
                      {sprint.stories.length > 0 && (
                        <div className="border-t border-outline-variant/20 pt-4">
              <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">
                              Current Stories ({sprint.stories.length})
                            </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                              onClick={() => toggleSprintStories(sprint.id)}
                              className="rounded-full h-6 w-6 p-0 hover:bg-muted/50"
                  >
                              {expandedSprints.includes(sprint.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                </Button>
              </div>
                          
                          {/* Only show when expanded */}
                          {expandedSprints.includes(sprint.id) && (
                            <div className={`mt-3 space-y-2 ${sprint.stories.length > 5 ? 'max-h-64 overflow-auto pr-1' : ''}`}>
                              {sprint.stories.map((story) => (
                                <div 
                                  key={story.id} 
                                  className={`flex items-center gap-3 p-3 bg-muted/20 rounded-2xl hover:bg-muted/30 transition-colors cursor-pointer ${selectedStory?.id === story.id ? "bg-primary/10 border-l-4 border-l-primary" : ""}`}
                                  onClick={() => handleStoryClick(story)}
                                >
                                  <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                                    {story.id}
                                  </Badge>
                                  <span className="flex-1 text-sm font-medium text-foreground">
                                    {story.title}
                                  </span>
                                  <Badge className={`${statusColors[story.status as keyof typeof statusColors]} font-medium px-2 py-0.5 rounded-full text-xs`}>
                                    {story.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                                  <span className="text-xs text-muted-foreground">{story.storyPoints}pts</span>
                                  {story.assignee && (
                        <Avatar className="w-6 h-6">
                                      <AvatarImage src={story.assignee.avatar} alt={story.assignee.name} />
                                      <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                        {story.assignee.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                                  )}
                    </div>
                  ))}
                </div>
                          )}
                        </div>
                      )}
                    </div>
                      </div>
                ))}

                {/* Planned Sprints Section - Simplified */}
                {filteredSprints.filter(s => s.status === 'planned').length > 0 && (
                  <div className="bg-muted/30 rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">Planned Sprints</h2>
                      <Badge className="bg-muted/50 text-muted-foreground border-muted/50 border font-medium px-3 py-1 rounded-full text-sm">
                        {filteredSprints.filter(s => s.status === 'planned').length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                      {filteredSprints.filter(s => s.status === 'planned').map((sprint) => (
                        <div
                          key={sprint.id}
                          className="bg-secondary/20 rounded-2xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
                          onClick={() => selectTopSprint(sprint)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{sprint.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                {sprint.startDate} - {sprint.endDate}
                              </div>
                            </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0 hover:bg-muted/50">
                                  <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl">
                                {getSprintActions(sprint).map((action, index) => (
                                  <DropdownMenuItem key={index} onClick={action.action} className="rounded-lg">
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{sprint.goal}</p>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{sprint.storyPoints.capacity} pts capacity</span>
                            <span className="text-primary font-medium">{sprint.daysLeft} days to start</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Sprints Section - Simplified */}
                {filteredSprints.filter(s => s.status === 'completed').length > 0 && (
                  <div className="bg-muted/30 rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">Completed Sprints</h2>
                      <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30 border font-medium px-3 py-1 rounded-full text-sm">
                        {filteredSprints.filter(s => s.status === 'completed').length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                      {filteredSprints.filter(s => s.status === 'completed').map((sprint) => (
                        <div
                          key={sprint.id}
                          className="bg-secondary/20 rounded-2xl p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                          onClick={() => selectTopSprint(sprint)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{sprint.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                {sprint.completedDate}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0 hover:bg-muted/50">
                                  <MoreVertical className="w-3 h-3" />
                      </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl">
                                {getSprintActions(sprint).map((action, index) => (
                                  <DropdownMenuItem key={index} onClick={action.action} className="rounded-lg">
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-chart-2 font-medium">{sprint.progress}% completed</span>
                            <span className="text-muted-foreground">{sprint.velocity} pts/d</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {sprint.storyPoints.completed}/{sprint.storyPoints.committed} pts
                            </span>
                            <span className="text-muted-foreground">
                              {sprint.tasks.done}/{sprint.tasks.total} tasks
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* List View */
              <div className="bg-surface rounded-3xl overflow-hidden">
                <div className="bg-muted/30 px-6 py-3 border-b border-outline-variant/20">
                  <div className="grid grid-cols-12 gap-4 items-center min-h-[32px]">
                    <div className="col-span-1 text-sm font-semibold text-foreground"></div>
                    <div className="col-span-3 text-sm font-semibold text-foreground">Sprint</div>
                    <div className="col-span-2 text-sm font-semibold text-foreground">Status</div>
                    <div className="col-span-2 text-sm font-semibold text-foreground">Progress</div>
                    <div className="col-span-2 text-sm font-semibold text-foreground">Story Points</div>
                    <div className="col-span-1 text-sm font-semibold text-foreground">Velocity</div>
                    <div className="col-span-1 text-sm font-semibold text-foreground">Actions</div>
                  </div>
          </div>

                <div className="divide-y divide-outline-variant/20">
                  {filteredSprints.map((sprint) => (
                    <div key={sprint.id}>
                      <div className={`px-6 py-4 hover:bg-muted/20 transition-colors ${
                        sprint.status === 'active' ? 'bg-primary/5' : ''
                      }`}>
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-1">
                            {sprint.stories.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSprintStories(sprint.id)}
                                className="rounded-full h-6 w-6 p-0 hover:bg-muted/50"
                              >
                        {expandedSprints.includes(sprint.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                            )}
                      </div>
                          
                          <div className="col-span-3">
                            <div className="flex flex-col justify-center">
                              <h3 className="font-semibold text-foreground">{(sprintEdits[sprint.id]?.name as any) || sprint.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">{sprint.goal}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{(sprintEdits[sprint.id]?.startDate as any) || sprint.startDate} - {(sprintEdits[sprint.id]?.endDate as any) || sprint.endDate}</span>
                                {sprint.status !== 'completed' && (
                                  <span className="font-medium text-primary">({sprint.daysLeft} days left)</span>
                                )}
                    </div>
                  </div>
                          </div>
                          
                          <div className="col-span-2">
                            <Badge className={`${statusColors[sprint.status as keyof typeof statusColors]} border font-medium px-3 py-1 rounded-full text-sm`}>
                              {sprint.status === 'planned' ? 'Not Started' : 
                               sprint.status === 'active' ? 'Active' : 'Completed'}
                            </Badge>
                          </div>
                          
                          <div className="col-span-2">
                            {sprint.status !== 'planned' ? (
                              <div className="flex flex-col justify-center">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-muted-foreground">{sprint.progress}%</span>
                                  <span className="text-xs text-muted-foreground">{sprint.tasks.done}/{sprint.tasks.total} tasks</span>
                                </div>
                                <Progress value={sprint.progress} className="h-1.5" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-sm text-muted-foreground">Not started</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="col-span-2">
                            <div className="flex items-center justify-start">
                              <div className="text-sm">
                                <span className="font-semibold text-foreground">
                                  {sprint.status === 'completed' ? sprint.storyPoints.completed : sprint.storyPoints.completed}
                                </span>
                                <span className="text-muted-foreground">
                                  /{sprint.status === 'planned' ? sprint.storyPoints.capacity : sprint.storyPoints.committed}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">pts</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-1">
                            <div className="flex items-center justify-start">
                              <div className="text-sm">
                                <span className="font-medium text-foreground">
                                  {sprint.velocity}
                                </span>
                                <span className="text-xs text-muted-foreground"> pts/d</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-1">
                            <div className="flex items-center justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 hover:bg-muted/50">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-2xl">
                                  {getSprintActions(sprint).map((action, index) => (
                                    <DropdownMenuItem key={index} onClick={action.action} className="rounded-lg">
                                      {action.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {expandedSprints.includes(sprint.id) && sprint.stories.length > 0 && (
                        <div className="px-6 pb-4 bg-muted/10">
                          <div className="ml-8 space-y-2">
                            {sprint.stories.map((story) => (
                              <div 
                                key={story.id} 
                                className={`flex items-center gap-3 p-3 bg-surface rounded-2xl hover:bg-muted/30 transition-colors cursor-pointer ${selectedStory?.id === story.id ? "bg-primary/10 border-l-4 border-l-primary" : ""}`}
                                onClick={() => handleStoryClick(story)}
                              >
                                <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                                  {story.id}
                                </Badge>
                                <span className="flex-1 text-sm font-medium text-foreground min-w-0">
                                  {story.title}
                                </span>
                                <Badge className={`${statusColors[story.status as keyof typeof statusColors]} font-medium px-2 py-0.5 rounded-full text-xs flex-shrink-0`}>
                                  {story.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex-shrink-0">{story.storyPoints}pts</span>
                                {story.assignee && (
                                  <Avatar className="w-6 h-6 flex-shrink-0">
                                    <AvatarImage src={story.assignee.avatar} alt={story.assignee.name} />
                                    <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                      {story.assignee.name.split(' ').map((n: string) => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                        </div>
                      ))}
                          </div>
                        </div>
                      )}
                    </div>
            ))}
          </div>
              </div>
            )}
        </div>

          {/* Global Quick Edit Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="rounded-3xl max-w-lg">
              <DialogHeader className="pb-3">
                <DialogTitle className="text-base font-semibold">Quick Edit Sprint</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Sprint Name</Label>
                  <Input
                    placeholder={`Sprint ${editingSprintId ?? ''}`}
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="rounded-2xl border-input"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Sprint Goal</Label>
                  <Textarea
                    placeholder="Describe the main objective of this sprint..."
                    value={editForm.goal}
                    onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                    rows={3}
                    className="rounded-2xl border-input resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Duration (weeks)</Label>
                    <Select value={String(editForm.durationWeeks)} onValueChange={(value) => setEditForm({ ...editForm, durationWeeks: parseInt(value) })}>
                      <SelectTrigger className="rounded-2xl border-input" disabled={(() => { const s = sprints.find(x => x.id === editingSprintId); return s ? s.status === 'active' : false })()}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="1">1 week</SelectItem>
                        <SelectItem value="2">2 weeks</SelectItem>
                        <SelectItem value="3">3 weeks</SelectItem>
                        <SelectItem value="4">4 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Start Date</Label>
                    <Input
                      type="date"
                      value={editForm.startDate}
                      onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                      className="rounded-2xl border-input"
                      disabled={(() => { const s = sprints.find(x => x.id === editingSprintId); return s ? s.status === 'active' : false })()}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Story Point Limit</Label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={editForm.storyPointLimit}
                    onChange={(e) => setEditForm({ ...editForm, storyPointLimit: parseInt(e.target.value) || 30 })}
                    className="rounded-2xl border-input"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-full">Cancel</Button>
                  <Button onClick={saveQuickEdit} className="rounded-full">Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Sidebar */}
          <div className="space-y-4 w-80 flex-shrink-0">
            {/* Quick Actions */}
            <div className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30">
              <div className="bg-muted/30 px-4 py-3">
                <h3 className="text-lg font-medium text-foreground">Quick Actions</h3>
              </div>
              <div className="px-4 py-4 space-y-3">
                <NextLink href={`/project/${resolvedParams.id}/sprint/${filteredSprints.find(s => s.status === 'planned')?.id || 4}/planning`} className="block">
                  <Button className="w-full rounded-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Sprint Planning
                  </Button>
                </NextLink>
                <Button variant="outline" className="w-full rounded-full border-outline hover:bg-muted/50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                Sprint Retrospective
              </Button>
                          </div>
          </div>

          {/* Work Item Details - Hiển thị khi có selectedStory */}
          {selectedStory && (
            <div className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30">
              {/* Header Section */}
              <div className="bg-surface-variant/20 px-4 py-3 border-b border-outline-variant/20 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${selectedStory.type === 'story' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                        selectedStory.type === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                      {selectedStory.type === 'story' ? '📖' : 
                       selectedStory.type === 'bug' ? '🐛' : 
                       '✅'}
                    </div>
                    <NextLink
                      href={`/project/${resolvedParams.id}/work-items/${selectedStory.id}`}
                      className="text-primary hover:underline font-semibold text-sm"
                    >
                      {selectedStory.id}
                    </NextLink>
                    <div className="flex items-center gap-2">
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedStory(null)} 
                    className="rounded-full hover:bg-surface-variant/50 h-8 w-8 p-0"
                  >
                    ✕
                  </Button>
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
                      {selectedStory.description || "No description provided"}
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
                      <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground font-medium px-3 py-1 rounded-full text-xs">
                        {topSprint.name}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-on-surface">Labels</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs rounded-full px-2 py-0.5 bg-surface-variant/50 text-on-surface-variant border border-outline-variant/50">
                        {selectedStory.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs rounded-full px-2 py-0.5 bg-surface-variant/50 text-on-surface-variant border border-outline-variant/50">
                        {selectedStory.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-outline-variant/20">
                  <NextLink href={`/project/${resolvedParams.id}/work-items/${selectedStory.id}`} className="flex-1">
                    <Button size="sm" className="w-full rounded-full elevation-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                      View Details
                    </Button>
                  </NextLink>
                  <Button variant="outline" size="sm" className="rounded-full border-outline-variant bg-surface hover:bg-surface-variant/50 text-xs">
                    Clone
                  </Button>
                </div>
              </div>
            </div>
          )}

                            {/* Sprint Metrics */}
              <div className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30">
                <div className="bg-muted/30 px-4 py-3">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Sprint Metrics
                  </h3>
                </div>
              <div className="px-4 py-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg Velocity:</span>
                  <span className="font-medium text-foreground">{teamMetrics.avgVelocity} pts/sprint</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Team Capacity:</span>
                  <span className="font-medium text-foreground">{teamMetrics.teamCapacity} pts/sprint</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className="font-medium text-chart-2">{teamMetrics.successRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed Sprints:</span>
                  <span className="font-medium text-foreground">{teamMetrics.completedSprints}</span>
                </div>
              </div>
            </div>
              </div>
        </div>
      </div>
    </div>
  )
}