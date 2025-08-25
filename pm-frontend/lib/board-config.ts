// Board configuration utilities for dynamic status management

export interface BoardStatus {
  id: string
  title: string
  color: string
  bgColor: string
  borderColor: string
  headerColor: string
  position: number
  isDefault?: boolean
}

export interface BoardConfig {
  projectId: string
  statuses: BoardStatus[]
  createdAt: Date
  updatedAt: Date
}

// Default status configurations
export const DEFAULT_STATUSES: BoardStatus[] = [
  {
    id: "todo",
    title: "To Do",
    color: "slate",
    bgColor: "bg-slate-50 dark:bg-slate-900/20",
    borderColor: "border-slate-200 dark:border-slate-800",
    headerColor: "bg-slate-100 dark:bg-slate-800",
    position: 0,
    isDefault: true,
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "blue",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    headerColor: "bg-blue-100 dark:bg-blue-800",
    position: 1,
    isDefault: true,
  },
  {
    id: "review",
    title: "In Review",
    color: "amber",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    headerColor: "bg-amber-100 dark:bg-amber-800",
    position: 2,
    isDefault: true,
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    headerColor: "bg-green-100 dark:bg-green-800",
    position: 3,
    isDefault: true,
  },
]

// Predefined color themes for custom statuses
export const STATUS_COLOR_THEMES = {
  slate: {
    bgColor: "bg-slate-50 dark:bg-slate-900/20",
    borderColor: "border-slate-200 dark:border-slate-800",
    headerColor: "bg-slate-100 dark:bg-slate-800",
  },
  blue: {
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    headerColor: "bg-blue-100 dark:bg-blue-800",
  },
  amber: {
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    headerColor: "bg-amber-100 dark:bg-amber-800",
  },
  green: {
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    headerColor: "bg-green-100 dark:bg-green-800",
  },
  red: {
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    headerColor: "bg-red-100 dark:bg-red-800",
  },
  purple: {
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    headerColor: "bg-purple-100 dark:bg-purple-800",
  },
  indigo: {
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    headerColor: "bg-indigo-100 dark:bg-indigo-800",
  },
  emerald: {
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    headerColor: "bg-emerald-100 dark:bg-emerald-800",
  },
  orange: {
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    headerColor: "bg-orange-100 dark:bg-orange-800",
  },
  pink: {
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    headerColor: "bg-pink-100 dark:bg-pink-800",
  },
}

/**
 * Get board configuration for a project
 * In real implementation, this would fetch from API/database
 */
export const getBoardConfig = async (projectId: string): Promise<BoardConfig> => {
  // Simulate API call
  // In practice: const response = await fetch(`/api/projects/${projectId}/board-config`)
  
  // For now, return default configuration with fixed dates to prevent hydration mismatch
  const fixedDate = new Date('2024-01-01T00:00:00.000Z');
  return {
    projectId,
    statuses: DEFAULT_STATUSES,
    createdAt: fixedDate,
    updatedAt: fixedDate,
  }
}

/**
 * Save board configuration for a project
 */
export const saveBoardConfig = async (config: BoardConfig): Promise<void> => {
  // Simulate API call
  // In practice: await fetch(`/api/projects/${config.projectId}/board-config`, { method: 'PUT', body: JSON.stringify(config) })
  console.log('Saving board config:', config)
}

/**
 * Create a new custom status
 */
export const createCustomStatus = (
  title: string,
  colorTheme: keyof typeof STATUS_COLOR_THEMES,
  position: number
): BoardStatus => {
  const id = title.toLowerCase().replace(/\s+/g, '-')
  const theme = STATUS_COLOR_THEMES[colorTheme]
  
  return {
    id,
    title,
    color: colorTheme,
    position,
    isDefault: false,
    ...theme,
  }
}

/**
 * Validate board configuration
 */
export const validateBoardConfig = (config: BoardConfig): string[] => {
  const errors: string[] = []
  
  if (config.statuses.length === 0) {
    errors.push('Board must have at least one status column')
  }
  
  const positions = config.statuses.map(s => s.position)
  const uniquePositions = new Set(positions)
  if (positions.length !== uniquePositions.size) {
    errors.push('Status positions must be unique')
  }
  
  const ids = config.statuses.map(s => s.id)
  const uniqueIds = new Set(ids)
  if (ids.length !== uniqueIds.size) {
    errors.push('Status IDs must be unique')
  }
  
  return errors
}

/**
 * Sort statuses by position
 */
export const sortStatusesByPosition = (statuses: BoardStatus[]): BoardStatus[] => {
  return [...statuses].sort((a, b) => a.position - b.position)
}

// Example of custom board configurations for different project types
export const BOARD_TEMPLATES = {
  scrum: {
    name: "Scrum Board",
    description: "Standard Scrum workflow",
    statuses: DEFAULT_STATUSES,
  },
  kanban: {
    name: "Kanban Board", 
    description: "Continuous flow workflow",
    statuses: [
      createCustomStatus("Backlog", "slate", 0),
      createCustomStatus("Ready", "blue", 1),
      createCustomStatus("In Progress", "amber", 2),
      createCustomStatus("Testing", "purple", 3),
      createCustomStatus("Done", "green", 4),
    ],
  },
  bugTracking: {
    name: "Bug Tracking",
    description: "Issue and bug management",
    statuses: [
      createCustomStatus("New", "red", 0),
      createCustomStatus("Triaged", "orange", 1),
      createCustomStatus("In Progress", "blue", 2),
      createCustomStatus("Testing", "purple", 3),
      createCustomStatus("Verified", "green", 4),
      createCustomStatus("Closed", "slate", 5),
    ],
  },
  devOps: {
    name: "DevOps Pipeline",
    description: "Development to deployment workflow",
    statuses: [
      createCustomStatus("Backlog", "slate", 0),
      createCustomStatus("Development", "blue", 1),
      createCustomStatus("Code Review", "indigo", 2),
      createCustomStatus("Testing", "purple", 3),
      createCustomStatus("Staging", "amber", 4),
      createCustomStatus("Production", "green", 5),
    ],
  },
}
