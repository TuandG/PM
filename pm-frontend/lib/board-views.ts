// Board view presets and utilities

export interface BoardView {
  id: string
  name: string
  description: string
  icon: string
  statusIds: string[]
  isBuiltIn?: boolean
}

// Built-in view presets
export const BUILT_IN_VIEWS = {
  all: {
    id: 'all',
    name: 'All Columns',
    description: 'Show all available status columns',
    icon: 'Grid',
    statusIds: [], // Will be populated dynamically
    isBuiltIn: true,
  },
  activeWork: {
    id: 'active-work',
    name: 'Active Work',
    description: 'Focus on in-progress items',
    icon: 'Play',
    statusIds: ['inprogress', 'review'], // Common active statuses
    isBuiltIn: true,
  },
  workflow: {
    id: 'workflow',
    name: 'Full Workflow',
    description: 'Complete task progression',
    icon: 'ArrowRight',
    statusIds: ['todo', 'inprogress', 'review', 'done'],
    isBuiltIn: true,
  },
  pending: {
    id: 'pending',
    name: 'Pending Items',
    description: 'Items waiting for action',
    icon: 'Clock',
    statusIds: ['todo', 'blocked', 'waiting'], // Statuses that need attention
    isBuiltIn: true,
  },
  completed: {
    id: 'completed',
    name: 'Completed Work',
    description: 'Finished and delivered items',
    icon: 'CheckCircle',
    statusIds: ['done', 'deployed', 'closed'], // Completion statuses
    isBuiltIn: true,
  },
} as const

/**
 * Get applicable preset views based on available statuses
 */
export const getApplicableViews = (availableStatusIds: string[]): BoardView[] => {
  const views: BoardView[] = []
  
  // Always include "All" view
  views.push({
    ...BUILT_IN_VIEWS.all,
    statusIds: availableStatusIds,
  })
  
  // Check other presets and include if they have matching statuses
  Object.values(BUILT_IN_VIEWS).forEach(preset => {
    if (preset.id === 'all') return // Already added
    
    const matchingStatuses = preset.statusIds.filter(id => availableStatusIds.includes(id))
    if (matchingStatuses.length > 0) {
      views.push({
        ...preset,
        statusIds: matchingStatuses,
      })
    }
  })
  
  return views
}

/**
 * Create a custom view
 */
export const createCustomView = (
  name: string,
  description: string,
  statusIds: string[]
): BoardView => {
  return {
    id: `custom-${Date.now()}`,
    name,
    description,
    icon: 'Eye',
    statusIds,
    isBuiltIn: false,
  }
}

/**
 * Save user's custom views to localStorage
 */
export const saveCustomViews = (projectId: string, views: BoardView[]): void => {
  const customViews = views.filter(v => !v.isBuiltIn)
  localStorage.setItem(`board-custom-views-${projectId}`, JSON.stringify(customViews))
}

/**
 * Load user's custom views from localStorage
 */
export const loadCustomViews = (projectId: string): BoardView[] => {
  try {
    const saved = localStorage.getItem(`board-custom-views-${projectId}`)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

/**
 * Get all available views (built-in + custom)
 */
export const getAllViews = (projectId: string, availableStatusIds: string[]): BoardView[] => {
  const builtInViews = getApplicableViews(availableStatusIds)
  const customViews = loadCustomViews(projectId)
  
  // Filter custom views to only include those with valid status IDs
  const validCustomViews = customViews.filter(view => 
    view.statusIds.some(id => availableStatusIds.includes(id))
  ).map(view => ({
    ...view,
    statusIds: view.statusIds.filter(id => availableStatusIds.includes(id))
  }))
  
  return [...builtInViews, ...validCustomViews]
}

/**
 * Smart view suggestions based on usage patterns
 */
export const suggestViews = (taskCounts: Record<string, number>): string[] => {
  const suggestions: string[] = []
  
  // If there are many active items, suggest active work view
  const activeCount = (taskCounts['inprogress'] || 0) + (taskCounts['review'] || 0)
  if (activeCount > 3) {
    suggestions.push('active-work')
  }
  
  // If there are many pending items, suggest pending view
  const pendingCount = (taskCounts['todo'] || 0) + (taskCounts['blocked'] || 0)
  if (pendingCount > 5) {
    suggestions.push('pending')
  }
  
  // If project is mostly done, suggest completed view
  const totalTasks = Object.values(taskCounts).reduce((sum, count) => sum + count, 0)
  const completedCount = taskCounts['done'] || 0
  if (totalTasks > 0 && completedCount / totalTasks > 0.7) {
    suggestions.push('completed')
  }
  
  return suggestions
}

// View icons mapping for UI
export const VIEW_ICONS = {
  Grid: 'Grid',
  Play: 'Play', 
  ArrowRight: 'ArrowRight',
  Clock: 'Clock',
  CheckCircle: 'CheckCircle',
  Eye: 'Eye',
  Star: 'Star',
  Filter: 'Filter',
} as const
