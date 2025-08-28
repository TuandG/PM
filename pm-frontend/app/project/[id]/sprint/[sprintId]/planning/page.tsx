"use client"

import { use, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Plus, 
  X, 
  GripVertical,
  Target,
  Users,
  AlertTriangle,
  CheckCircle2,
  Play,
  Save,
  MoreVertical,
  ArrowLeft,
  Zap,
  ChevronRight
} from "lucide-react"
import NextLink from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

// Types
type Assignee = { name: string; avatar: string }
type Story = {
  id: string
  title: string
  storyPoints: number
  priority: "high" | "medium" | "low"
  assignee: Assignee | null
  labels?: string[]
  description?: string
  acceptanceCriteria?: string[]
}

// Thêm type để theo dõi nguồn gốc của story
type StoryWithSource = Story & {
  source: 'backlog' | 'sprint'
  sourceSprintId?: number // ID của sprint nếu story đến từ sprint
}

// Mock data
const sprint = {
  id: 4,
  name: "Sprint 4",
  goal: "Implement shopping cart and checkout process with payment integration",
  startDate: "March 16, 2024",
  endDate: "March 30, 2024",
  capacity: 30,
  committed: 18,
  teamVelocity: 27,
  status: "planned"
}

const backlogStories: Story[] = [
  {
    id: "US-003",
    title: "Password Reset Functionality",
    storyPoints: 3,
    priority: "medium",
    assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["authentication", "security"],
    description: "Users should be able to reset their password via email",
    acceptanceCriteria: ["Email validation", "Secure token generation", "Password strength validation"]
  },
  {
    id: "US-004", 
    title: "Product Listing with Pagination",
    storyPoints: 8,
    priority: "high",
    assignee: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["frontend", "api"],
    description: "Display products with pagination and filtering",
    acceptanceCriteria: ["Page size configuration", "Sort options", "Filter by category"]
  },
  {
    id: "US-005",
    title: "Advanced Product Search",
    storyPoints: 5,
    priority: "medium", 
    assignee: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["search", "frontend"],
    description: "Implement advanced search with multiple filters",
    acceptanceCriteria: ["Text search", "Category filter", "Price range"]
  },
  {
    id: "US-012",
    title: "User Profile Management",
    storyPoints: 5,
    priority: "low",
    assignee: null,
    labels: ["profile", "settings"],
    description: "Allow users to manage their profile information",
    acceptanceCriteria: ["Edit profile", "Avatar upload", "Preferences"]
  },
  {
    id: "US-013",
    title: "Order History",
    storyPoints: 8,
    priority: "medium",
    assignee: { name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["orders", "history"],
    description: "Display user's order history with details",
    acceptanceCriteria: ["Order list", "Order details", "Reorder functionality"]
  },
  {
    id: "US-014",
    title: "Shopping Cart Persistence",
    storyPoints: 3,
    priority: "high",
    assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["cart", "persistence"],
    description: "Save cart items across sessions",
    acceptanceCriteria: ["Local storage", "User authentication", "Sync across devices"]
  }
]

const sprintStories: Story[] = [
  {
    id: "US-015",
    title: "Payment Gateway Integration", 
    storyPoints: 8,
    priority: "high",
    assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["payment", "integration"],
    description: "Integrate with payment gateway for checkout",
    acceptanceCriteria: ["Payment processing", "Error handling", "Success confirmation"]
  },
  {
    id: "US-016",
    title: "Checkout Flow",
    storyPoints: 5,
    priority: "high", 
    assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["checkout", "frontend"],
    description: "Complete checkout process flow",
    acceptanceCriteria: ["Address validation", "Payment selection", "Order confirmation"]
  },
  {
    id: "US-017",
    title: "Order Confirmation Email",
    storyPoints: 3,
    priority: "medium",
    assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    labels: ["email", "notification"],
    description: "Send confirmation email after successful order",
    acceptanceCriteria: ["Email template", "Order details", "Delivery tracking"]
  }
]

// Mock past and upcoming sprints with stories
type SprintListItem = {
  id: number
  name: string
  startDate: string
  endDate: string
  stories: Story[]
}

const sprintsList: SprintListItem[] = [
  {
    id: 3,
    name: "Sprint 3",
    startDate: "March 1, 2024",
    endDate: "March 15, 2024",
    stories: [
      {
        id: "US-010",
        title: "Wishlist Feature",
        storyPoints: 5,
        priority: "medium",
        assignee: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
        labels: ["frontend"],
      },
      {
        id: "US-011",
        title: "Coupon Codes",
        storyPoints: 3,
        priority: "low",
        assignee: null,
        labels: ["checkout"],
      }
    ]
  },
  {
    id: 2,
    name: "Sprint 2",
    startDate: "Feb 15, 2024",
    endDate: "Feb 29, 2024",
    stories: [
      {
        id: "US-007",
        title: "Profile Avatar Upload",
        storyPoints: 3,
        priority: "medium",
        assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        labels: ["profile"],
      }
    ]
  },
  {
    id: 1,
    name: "Sprint 1",
    startDate: "Feb 1, 2024",
    endDate: "Feb 14, 2024",
    stories: [
      {
        id: "US-001",
        title: "User Sign Up",
        storyPoints: 5,
        priority: "high",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        labels: ["authentication"],
      }
    ]
  }
]

const teamMembers = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 6, name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 7, name: "Tom Brown", avatar: "/placeholder.svg?height=32&width=32" }
]

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-chart-4/10 text-chart-4 border-chart-4/20", 
  low: "bg-chart-2/10 text-chart-2 border-chart-2/20"
}

export default function SprintPlanningPage({ params }: { params: Promise<{ id: string; sprintId: string }> }) {
  const resolvedParams = use(params)
  const [backlogSearch, setBacklogSearch] = useState('')
  const [selectedStories, setSelectedStories] = useState<string[]>([])
  const [committedStories, setCommittedStories] = useState<StoryWithSource[]>(
    sprintStories.map(story => ({ ...story, source: 'backlog' as const }))
  )
  const [availableStories, setAvailableStories] = useState<StoryWithSource[]>(
    backlogStories.map(story => ({ ...story, source: 'backlog' as const }))
  )
  const [sprintsState, setSprintsState] = useState<SprintListItem[]>(sprintsList)
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [draggedStory, setDraggedStory] = useState<any>(null)

  const filteredBacklogStories = availableStories.filter(story => 
    story.title.toLowerCase().includes(backlogSearch.toLowerCase()) ||
    story.id.toLowerCase().includes(backlogSearch.toLowerCase())
  )

  // Tạo danh sách tất cả stories có thể chọn (từ backlog và sprints)
  const allSelectableStories = [
    ...availableStories,
    ...sprintsState.flatMap(sp => sp.stories)
  ]

  const totalCommittedPoints = committedStories.reduce((sum, story) => sum + story.storyPoints, 0)
  const isOverCapacity = totalCommittedPoints > sprint.capacity
  const capacityPercentage = (totalCommittedPoints / sprint.capacity) * 100

  const handleDragStart = (e: React.DragEvent, story: any) => {
    setDraggedStory(story)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify(story))
  }

  const handleStoryClick = (e: React.MouseEvent, story: any) => {
    // Check if click is on interactive elements first
    const target = e.target as HTMLElement
    if (target.closest('input, button, [role="button"], [data-radix-collection-item]')) {
      return // Don't handle story click if clicking on interactive elements
    }
    
    // Prevent default behavior and propagation
    e.preventDefault()
    e.stopPropagation()
    
    // Set the selected story
    setSelectedStory(story)
    console.log('Selected story:', story.id, story.title) // Debug log
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropToSprint = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedStory && !committedStories.find(s => s.id === draggedStory.id)) {
      // Xác định nguồn gốc của story được kéo
      const sourceSprint = sprintsState.find(sp => sp.stories.some(s => s.id === draggedStory.id))
      const storyWithSource: StoryWithSource = {
        ...draggedStory,
        source: sourceSprint ? 'sprint' as const : 'backlog' as const,
        sourceSprintId: sourceSprint?.id
      }
      
      setCommittedStories(prev => [...prev, storyWithSource])
      setAvailableStories(prev => prev.filter(s => s.id !== draggedStory.id))
      setSprintsState(prev => prev.map(sp => ({
        ...sp,
        stories: sp.stories.filter(s => s.id !== draggedStory.id)
      })))
      
      // Tự động uncheck story khi kéo sang sprint
      setSelectedStories(prev => prev.filter(id => id !== draggedStory.id))
    }
    setDraggedStory(null)
  }

  const handleDropToBacklog = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedStory && !availableStories.find(s => s.id === draggedStory.id)) {
      // Xác định nguồn gốc của story được kéo
      const sourceSprint = sprintsState.find(sp => sp.stories.some(s => s.id === draggedStory.id))
      const storyWithSource: StoryWithSource = {
        ...draggedStory,
        source: sourceSprint ? 'sprint' as const : 'backlog' as const,
        sourceSprintId: sourceSprint?.id
      }
      
      setAvailableStories(prev => [...prev, storyWithSource])
      setCommittedStories(prev => prev.filter(s => s.id !== draggedStory.id))
      setSprintsState(prev => prev.map(sp => ({
        ...sp,
        stories: sp.stories.filter(s => s.id !== draggedStory.id)
      })))
      
      // Tự động uncheck story khi kéo về backlog
      setSelectedStories(prev => prev.filter(id => id !== draggedStory.id))
    }
    setDraggedStory(null)
  }

  const removeFromSprint = (storyId: string) => {
    const story = committedStories.find(s => s.id === storyId)
    if (story) {
      setCommittedStories(prev => prev.filter(s => s.id !== storyId))
      
      // Trả story về đúng nguồn gốc ban đầu
      if (story.source === 'sprint' && story.sourceSprintId) {
        // Trả về sprint ban đầu
        setSprintsState(prev => prev.map(sp => 
          sp.id === story.sourceSprintId 
            ? { ...sp, stories: [...sp.stories, story] }
            : sp
        ))
      } else {
        // Trả về backlog
        setAvailableStories(prev => [...prev, story])
      }
    }
  }

  const addSelectedToSprint = () => {
    const fromBacklog = availableStories.filter(story => selectedStories.includes(story.id))
    const fromSprints = sprintsState.flatMap(sp => sp.stories.filter(story => selectedStories.includes(story.id)))
    
    // Tạo stories với thông tin nguồn gốc
    const storiesToAdd: StoryWithSource[] = [
      ...fromBacklog.map(story => ({ ...story, source: 'backlog' as const })),
      ...fromSprints.map(story => ({ 
        ...story, 
        source: 'sprint' as const,
        sourceSprintId: sprintsState.find(sp => sp.stories.some(s => s.id === story.id))?.id
      }))
    ]
    
    if (storiesToAdd.length === 0) return
    
    setCommittedStories(prev => {
      const existingIds = new Set(prev.map(s => s.id))
      const toAppend = storiesToAdd.filter(s => !existingIds.has(s.id))
      return [...prev, ...toAppend]
    })
    
    setAvailableStories(prev => prev.filter(story => !selectedStories.includes(story.id)))
    setSprintsState(prev => prev.map(sp => ({
      ...sp,
      stories: sp.stories.filter(story => !selectedStories.includes(story.id))
    })))
    
    // Tự động uncheck tất cả stories trước khi xóa selectedStories
    setSelectedStories([])
  }

  const updateStoryDetails = (updates: any) => {
    if (!selectedStory) return
    
    const updateStory = (stories: any[], updates: any) => 
      stories.map(story => 
        story.id === selectedStory.id ? { ...story, ...updates } : story
      )
    
    setCommittedStories(prev => updateStory(prev, updates))
    setAvailableStories(prev => updateStory(prev, updates))
    setSelectedStory({ ...selectedStory, ...updates })
  }

  return (
    <div className="px-6 py-6 w-full max-w-7xl mx-auto">
      <div className="p-2 sm:p-4 max-w-full xl:max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <NextLink href={`/project/${resolvedParams.id}/sprint`}>
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sprints
              </Button>
            </NextLink>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sprint Planning - {sprint.name}</h1>
              <p className="text-muted-foreground">{sprint.goal}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              <Save className="w-4 h-4 mr-2" />
              Save Planning
            </Button>
            <Button 
              className="rounded-full" 
              disabled={totalCommittedPoints === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Sprint
            </Button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
                     {/* Left Column - Backlog (30%) */}
           <div className="lg:col-span-4 bg-surface rounded-3xl overflow-hidden">
                           {/* Selected Stories - Chỉ hiển thị khi có stories được chọn VÀ còn stories để chọn */}
              {selectedStories.length > 0 && allSelectableStories.length > 0 && (
                <div className="p-4 bg-primary/10 border-b border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary">
                      {selectedStories.length} stories selected
                    </span>
                    <Button 
                      size="sm" 
                      onClick={addSelectedToSprint}
                      className="rounded-full h-8"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Sprint
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {selectedStories.map((storyId) => {
                      const story = allSelectableStories.find(s => s.id === storyId)
                      if (!story) return null
                      return (
                        <div key={story.id} className="flex items-center gap-3 p-2 bg-primary/5 rounded-xl border border-primary/20">
                          <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">{story.id}</Badge>
                          <span className="text-sm text-foreground line-clamp-1 flex-1">{story.title}</span>
                          <span className="text-xs font-medium text-primary">{story.storyPoints} pts</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedStories(prev => prev.filter(id => id !== story.id))}
                            className="h-6 w-6 p-0 rounded-full hover:bg-primary/20"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Thông báo khi tất cả stories đã được thêm vào sprint - chỉ hiện khi không còn gì để chọn */}
              {allSelectableStories.length === 0 && selectedStories.length === 0 && (
                <div className="p-4 bg-chart-2/10 border-b border-chart-2/20">
                  <div className="flex items-center gap-2 text-chart-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">All available stories have been added to the sprint</span>
                  </div>
                </div>
              )}

             <div className="bg-muted/30 px-4 py-3 border-b border-outline-variant/20">
               <h3 className="text-lg font-medium text-foreground mb-3">Product Backlog</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                 <Input
                   placeholder="Search stories..."
                   value={backlogSearch}
                   onChange={(e) => setBacklogSearch(e.target.value)}
                   className="pl-10 rounded-full border-outline h-9"
                 />
               </div>
             </div>

             <div className="max-h-[500px] overflow-y-auto p-4">
               {/* Sprint list above backlog */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-on-surface-variant px-1">Sprints</h4>
                {sprintsState.map((sp) => (
                  <Collapsible key={sp.id}>
                    <CollapsibleTrigger
                      className="group w-full flex items-center justify-between p-3 rounded-2xl border border-outline-variant/30 bg-surface/50 hover:bg-surface-variant/10 transition-colors data-[state=open]:bg-primary/5 data-[state=open]:border-primary/30"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{sp.name}</div>
                          <div className="text-xs text-muted-foreground">{sp.startDate} - {sp.endDate}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{sp.stories.length} items</div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-2 space-y-2">
                        {sp.stories.map((story) => (
                          <div
                            key={story.id}
                            className={`p-3 rounded-2xl border transition-colors cursor-pointer hover:shadow-md ${
                              selectedStories.includes(story.id)
                                ? 'border-primary/50 bg-primary/5'
                                : 'border-outline-variant/20 bg-muted/10 hover:bg-muted/20'
                            } ${selectedStory?.id === story.id ? 'ring-2 ring-primary/30' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, story)}
                            onClick={(e) => handleStoryClick(e, story)}
                            onMouseDown={(e) => {
                              const target = e.target as HTMLElement
                              if (target.closest('input, button, [role="button"], [data-radix-collection-item]')) {
                                e.preventDefault()
                                e.stopPropagation()
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={selectedStories.includes(story.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedStories(prev => [...prev, story.id])
                                  } else {
                                    setSelectedStories(prev => prev.filter(id => id !== story.id))
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">{story.id}</Badge>
                                  <Badge className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[story.priority as keyof typeof priorityColors]}`}>{story.priority}</Badge>
                                </div>
                                <div className="text-sm text-foreground line-clamp-1">{story.title}</div>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-primary">{story.storyPoints} pts</span>
                                    {story.labels && (
                                      <div className="flex gap-1">
                                        {story.labels.slice(0, 2).map((label) => (
                                          <Badge key={label} variant="secondary" className="text-[10px] px-1.5 py-0.5 rounded">{label}</Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  {story.assignee && (
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={story.assignee.avatar} alt={story.assignee.name} />
                                      <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                        {story.assignee.name.split(' ').map((n: string) => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                <div className="pt-3 pb-2 px-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[2px] bg-outline/60 rounded-full" />
                    <span className="text-xs text-muted-foreground">Backlog items</span>
                    <div className="flex-1 h-[2px] bg-outline/60 rounded-full" />
                  </div>
                </div>
              </div>

              <div 
                className="space-y-3"
                onDragOver={handleDragOver}
                onDrop={handleDropToBacklog}
              >
                {filteredBacklogStories.map((story) => (
                  <div
                    key={story.id}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                      selectedStories.includes(story.id) 
                        ? 'border-primary/50 bg-primary/5' 
                        : 'border-outline-variant/20 bg-muted/10 hover:bg-muted/20'
                    } ${selectedStory?.id === story.id ? 'ring-2 ring-primary/30' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, story)}
                    onClick={(e) => handleStoryClick(e, story)}
                    onMouseDown={(e) => {
                      // Prevent drag when clicking on interactive elements
                      const target = e.target as HTMLElement
                      if (target.closest('input, button, [role="button"], [data-radix-collection-item]')) {
                        e.preventDefault()
                        e.stopPropagation()
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedStories.includes(story.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStories(prev => [...prev, story.id])
                          } else {
                            setSelectedStories(prev => prev.filter(id => id !== story.id))
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                            {story.id}
                          </Badge>
                          <Badge className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[story.priority as keyof typeof priorityColors]}`}>
                            {story.priority}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                          {story.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-primary">
                              {story.storyPoints} pts
                            </span>
                            {story.labels && (
                              <div className="flex gap-1">
                                {story.labels.slice(0, 2).map((label) => (
                                  <Badge key={label} variant="secondary" className="text-xs px-1.5 py-0.5 rounded">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          {story.assignee && (
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={story.assignee.avatar} alt={story.assignee.name} />
                              <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                {story.assignee.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Sprint Planning (40%) */}
          <div className="lg:col-span-5 bg-surface rounded-3xl overflow-hidden">
            {/* Sprint Info Header */}
            <div className="bg-primary/10 px-4 py-4 border-b border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{sprint.name}</h3>
                  <p className="text-sm text-muted-foreground">{sprint.startDate} - {sprint.endDate}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Planning Poker
                </Button>
              </div>

              {/* Capacity Info */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-surface/50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">Capacity</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">{sprint.capacity} pts</div>
                </div>
                <div className="bg-surface/50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-chart-2" />
                    <span className="text-xs font-medium text-foreground">Committed</span>
                  </div>
                  <div className={`text-lg font-bold ${isOverCapacity ? 'text-destructive' : 'text-foreground'}`}>
                    {totalCommittedPoints} pts
                  </div>
                </div>
                <div className="bg-surface/50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-chart-4" />
                    <span className="text-xs font-medium text-foreground">Velocity</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">{sprint.teamVelocity} pts</div>
                </div>
              </div>

              {/* Capacity Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sprint Capacity</span>
                  <span className={`font-medium ${isOverCapacity ? 'text-destructive' : 'text-foreground'}`}>
                    {Math.round(capacityPercentage)}%
                  </span>
                </div>
                <Progress 
                  value={capacityPercentage} 
                  className={`h-2 ${isOverCapacity ? '[&>div]:bg-destructive' : ''}`}
                />
                {isOverCapacity && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Sprint is over capacity by {totalCommittedPoints - sprint.capacity} points</span>
                  </div>
                )}
                {totalCommittedPoints > 0 && totalCommittedPoints <= sprint.teamVelocity && (
                  <div className="flex items-center gap-2 text-sm text-chart-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Within team velocity range</span>
                  </div>
                )}
              </div>
            </div>

            {/* Committed Stories */}
            <div className="max-h-[400px] overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">
                  Sprint Commitment ({committedStories.length} stories)
                </h4>
              </div>

              <div
                className={`space-y-3 min-h-[200px] p-4 rounded-2xl border-2 border-dashed transition-colors ${
                  draggedStory ? 'border-primary/50 bg-primary/5' : 'border-outline-variant/30'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDropToSprint}
              >
                {committedStories.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Drag stories from backlog or use bulk actions to add stories to this sprint
                    </p>
                  </div>
                ) : (
                  committedStories.map((story, index) => (
                    <div
                      key={story.id}
                      className={`p-4 rounded-2xl border border-outline-variant/20 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer ${
                        selectedStory?.id === story.id ? 'ring-2 ring-primary/30' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, story)}
                      onClick={(e) => handleStoryClick(e, story)}
                      onMouseDown={(e) => {
                        // Prevent drag when clicking on interactive elements
                        const target = e.target as HTMLElement
                        if (target.closest('button, [role="button"], [data-radix-collection-item]')) {
                          e.preventDefault()
                          e.stopPropagation()
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                              {story.id}
                            </Badge>
                            <Badge className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[story.priority as keyof typeof priorityColors]}`}>
                              {story.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">#{index + 1}</span>
                          </div>
                          <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                            {story.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-primary">
                                {story.storyPoints} pts
                              </span>
                              {story.labels && (
                                <div className="flex gap-1">
                                  {story.labels.slice(0, 2).map((label) => (
                                    <Badge key={label} variant="secondary" className="text-xs px-1.5 py-0.5 rounded">
                                      {label}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {story.assignee && (
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={story.assignee.avatar} alt={story.assignee.name} />
                                  <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                                    {story.assignee.name.split(' ').map((n: string) => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  removeFromSprint(story.id)
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                                className="rounded-full h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Story Details (30%) */}
          <div className="lg:col-span-3 bg-surface rounded-3xl overflow-hidden">
            <div className="bg-muted/30 px-4 py-3 border-b border-outline-variant/20">
              <h3 className="text-lg font-medium text-foreground">Story Details</h3>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-4">
              {selectedStory ? (
                <div className="space-y-6">
                  {/* Story Header */}
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                        {selectedStory.id}
                      </Badge>
                      <Badge className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[selectedStory.priority as keyof typeof priorityColors]}`}>
                        {selectedStory.priority}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {selectedStory.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStory.description}
                    </p>
                  </div>

                  {/* Quick Edit Form */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground">Quick Edit</h5>
                    
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Story Points</Label>
                      <Select 
                        value={selectedStory.storyPoints.toString()} 
                        onValueChange={(value) => updateStoryDetails({ storyPoints: parseInt(value) })}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          {[1, 2, 3, 5, 8, 13, 21].map(points => (
                            <SelectItem key={points} value={points.toString()}>{points} points</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Assignee</Label>
                      <Select 
                        value={selectedStory.assignee?.name || 'unassigned'} 
                        onValueChange={(value) => {
                          if (value === 'unassigned') {
                            updateStoryDetails({ assignee: null })
                          } else {
                            const assignee = teamMembers.find(member => member.name === value)
                            updateStoryDetails({ assignee })
                          }
                        }}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {teamMembers.map(member => (
                            <SelectItem key={member.id} value={member.name}>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-5 h-5">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback className="text-xs">
                                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {member.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Priority</Label>
                      <Select 
                        value={selectedStory.priority} 
                        onValueChange={(value) => updateStoryDetails({ priority: value })}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Labels</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedStory.labels?.map((label: string) => (
                          <Badge key={label} variant="secondary" className="text-xs px-2 py-1 rounded">
                            {label}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newLabels = selectedStory.labels.filter((l: string) => l !== label)
                                updateStoryDetails({ labels: newLabels })
                              }}
                              className="ml-1 h-auto w-auto p-0 hover:bg-transparent"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="text-xs rounded h-6">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Label
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Acceptance Criteria */}
                  {selectedStory.acceptanceCriteria && (
                    <div>
                      <h5 className="font-medium text-foreground mb-3">Acceptance Criteria</h5>
                      <div className="space-y-2">
                        {selectedStory.acceptanceCriteria.map((criteria: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{criteria}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full rounded-2xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Breakdown to Tasks
                    </Button>
                    <Button variant="outline" className="w-full rounded-2xl">
                      <MoreVertical className="w-4 h-4 mr-2" />
                      More Actions
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a story to view and edit details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
