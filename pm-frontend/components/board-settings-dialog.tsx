"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings, 
  Plus, 
  Trash2, 
  RotateCcw,
  Palette,
  GripVertical,
  Eye,
  X
} from "lucide-react"
import { 
  type BoardStatus, 
  type BoardConfig,
  STATUS_COLOR_THEMES,
  BOARD_TEMPLATES,
  createCustomStatus,
  validateBoardConfig,
  sortStatusesByPosition 
} from '@/lib/board-config'

interface BoardSettingsDialogProps {
  config: BoardConfig
  onSave: (config: BoardConfig) => void
}

export function BoardSettingsDialog({ config, onSave }: BoardSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [workingConfig, setWorkingConfig] = useState<BoardConfig>(config)
  const [newStatusTitle, setNewStatusTitle] = useState('')
  const [newStatusColor, setNewStatusColor] = useState<keyof typeof STATUS_COLOR_THEMES>('slate')

  const sortedStatuses = sortStatusesByPosition(workingConfig.statuses)

  const handleLoadTemplate = (templateKey: keyof typeof BOARD_TEMPLATES) => {
    const template = BOARD_TEMPLATES[templateKey]
    setWorkingConfig({
      ...workingConfig,
      statuses: template.statuses.map((status, index) => ({
        ...status,
        position: index
      }))
    })
  }

  const handleAddStatus = () => {
    if (!newStatusTitle.trim()) return
    
    const newStatus = createCustomStatus(
      newStatusTitle.trim(),
      newStatusColor,
      sortedStatuses.length
    )
    
    setWorkingConfig({
      ...workingConfig,
      statuses: [...workingConfig.statuses, newStatus]
    })
    
    setNewStatusTitle('')
    setNewStatusColor('slate')
  }

  const handleDeleteStatus = (statusId: string) => {
    setWorkingConfig({
      ...workingConfig,
      statuses: workingConfig.statuses.filter(s => s.id !== statusId)
    })
  }

  const handleSave = () => {
    if (validateBoardConfig(workingConfig)) {
      onSave(workingConfig)
      setIsOpen(false)
    }
  }

  const handleReset = () => {
    setWorkingConfig(config)
    setNewStatusTitle('')
    setNewStatusColor('slate')
  }

  const getTemplateIcon = (templateName: string) => {
    switch (templateName.toLowerCase()) {
      case 'scrum board':
        return "🏃"
      case 'kanban board':
        return "📋"
      case 'bug tracking':
        return "🐛"
      case 'devops pipeline':
        return "🚀"
      default:
        return "📊"
    }
  }

  const colorOptions = [
    { value: "slate", label: "Slate", class: "bg-slate-500" },
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full border-outline bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Customize Columns
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0 p-6 pb-4 border-b">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
            <Palette className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-lg font-semibold">Board Configuration</DialogTitle>
            <p className="text-sm text-muted-foreground">Customize your board columns and workflow states</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-0">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Quick Templates Section */}
              <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 dark:bg-green-900/20">
                <RotateCcw className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Quick Templates</h3>
                <p className="text-xs text-muted-foreground">Start with a pre-built workflow</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
              {Object.entries(BOARD_TEMPLATES).map(([key, template]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all text-center p-3 hover:bg-accent`}
                  onClick={() => handleLoadTemplate(key as keyof typeof BOARD_TEMPLATES)}
                >
                  <div className="space-y-1">
                    <div className="text-lg">{getTemplateIcon(template.name)}</div>
                    <h4 className="font-medium text-xs">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <div className="flex items-center justify-center gap-1">
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {template.statuses.length} columns
                      </Badge>
                      <span className="text-xs text-green-600">Ready to use</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
              </div>

              {/* Add New Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 dark:bg-green-900/20">
                    <Plus className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Add New Column</h3>
                    <p className="text-xs text-muted-foreground">Create a custom column for your workflow</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="column-name" className="text-xs">
                      Column Name
                    </Label>
                    <Input
                      id="column-name"
                      placeholder="e.g. Testing, Deployment, Waiting for Review..."
                      value={newStatusTitle}
                      onChange={(e) => setNewStatusTitle(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color-theme" className="text-xs">
                      Color Theme
                    </Label>
                    <Select value={newStatusColor} onValueChange={(value) => setNewStatusColor(value as keyof typeof STATUS_COLOR_THEMES)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded ${color.class}`}></div>
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddStatus} className="w-full bg-green-600 hover:bg-green-700 text-sm">
                    Add Column
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Current Columns */}
              <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 dark:bg-green-900/20">
                <GripVertical className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Current Columns</h3>
                <p className="text-xs text-muted-foreground">{sortedStatuses.length} columns configured</p>
              </div>
            </div>

            <div className="space-y-2">
              {sortedStatuses.map((status) => (
                <Card key={status.id} className="border border-gray-200">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span className="text-sm font-medium">{status.title}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteStatus(status.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
              </div>
            </div>
          </div>

          {/* Live Preview - Full Width */}
          {sortedStatuses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 dark:bg-green-900/20">
                  <Eye className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Live Preview</h3>
                  <p className="text-xs text-muted-foreground">How your board will look</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {sortedStatuses.map((status, index) => {
                    // Get the color theme for this status
                    const colorClass = status.color === 'slate' ? 'slate' : 
                                     status.color === 'blue' ? 'blue' :
                                     status.color === 'green' ? 'green' :
                                     status.color === 'purple' ? 'purple' :
                                     status.color === 'orange' ? 'orange' :
                                     status.color === 'red' ? 'red' : 'slate';
                    
                    return (
                      <div key={status.id} className="flex-shrink-0 w-36 md:w-40 lg:w-44">
                        {/* Column Header */}
                        <div className={`bg-${colorClass}-100 dark:bg-${colorClass}-900/30 rounded-t-lg px-2 py-1.5 border-l-2 border-${colorClass}-400`}>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full bg-${colorClass}-500`}></div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                              {status.title}
                            </span>
                          </div>
                        </div>
                        
                        {/* Column Content */}
                        <div className="bg-white dark:bg-slate-800 rounded-b-lg min-h-[60px] p-2 border border-t-0 border-slate-200 dark:border-slate-600">
                          {/* Sample Task Cards */}
                          {index < 3 && (
                            <div className="space-y-1.5">
                              <div className="bg-slate-100 dark:bg-slate-700 rounded-md h-3 w-full"></div>
                              {index < 2 && (
                                <div className="bg-slate-100 dark:bg-slate-700 rounded-md h-3 w-4/5"></div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Preview Info */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {sortedStatuses.length} columns configured
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Live preview
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 pt-4 border-t bg-gray-50">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 text-sm bg-transparent">
            <RotateCcw className="h-3 w-3" />
            Reset Changes
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="text-sm bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-sm">
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}