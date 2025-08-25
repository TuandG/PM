"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus, Filter, Eye, EyeOff, Grid, List, Play, ArrowRight, Clock, CheckCircle, Star } from "lucide-react"
import { use, useState, useEffect } from "react"
import { getBoardConfig, saveBoardConfig, type BoardStatus, type BoardConfig, sortStatusesByPosition } from "@/lib/board-config"
import { BoardSettingsDialog } from "@/components/board-settings-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllViews, type BoardView, suggestViews, saveCustomViews } from "@/lib/board-views"

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
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [boardConfig, setBoardConfig] = useState<BoardConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // View preferences state
  const [visibleStatusIds, setVisibleStatusIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'custom'>('all');
  const [availableViews, setAvailableViews] = useState<BoardView[]>([]);
  const [currentViewId, setCurrentViewId] = useState<string>('all');

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    const loadBoardConfig = async () => {
      try {
        setIsLoading(true);
        const config = await getBoardConfig(resolvedParams.id);
        setBoardConfig(config);
        
        // Initialize with all statuses visible
        const allStatusIds = config.statuses.map(s => s.id);
        setVisibleStatusIds(allStatusIds);
        
        // Load available views
        const views = getAllViews(resolvedParams.id, allStatusIds);
        setAvailableViews(views);
        
        // Load user preferences from localStorage (client-side only)
        if (typeof window !== 'undefined') {
          const savedPrefs = localStorage.getItem(`board-view-${resolvedParams.id}`);
          if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            setVisibleStatusIds(prefs.visibleStatusIds || allStatusIds);
            setViewMode(prefs.viewMode || 'all');
            setCurrentViewId(prefs.currentViewId || 'all');
          }
        }
      } catch (error) {
        console.error('Failed to load board configuration:', error);
        // Fallback to default statuses or show error state
      } finally {
        setIsLoading(false);
      }
    };

    loadBoardConfig();
  }, [resolvedParams]);

  // Save view preferences (client-side only)
  useEffect(() => {
    if (boardConfig && resolvedParams && typeof window !== 'undefined') {
      const prefs = { visibleStatusIds, viewMode, currentViewId };
      localStorage.setItem(`board-view-${resolvedParams.id}`, JSON.stringify(prefs));
    }
  }, [visibleStatusIds, viewMode, currentViewId, resolvedParams, boardConfig]);

  const handleConfigChange = async (newConfig: BoardConfig) => {
    try {
      await saveBoardConfig(newConfig);
      setBoardConfig(newConfig);
      
      // Update visible status IDs if a status was deleted
      const newStatusIds = newConfig.statuses.map(s => s.id);
      setVisibleStatusIds(prev => prev.filter(id => newStatusIds.includes(id)));
    } catch (error) {
      console.error('Failed to save board configuration:', error);
      // Show error toast or notification
    }
  };

  const handleStatusToggle = (statusId: string) => {
    setVisibleStatusIds(prev => {
      const newVisible = prev.includes(statusId) 
        ? prev.filter(id => id !== statusId)
        : [...prev, statusId];
      
      // If we're showing/hiding manually, switch to custom mode
      if (viewMode === 'all') {
        setViewMode('custom');
      }
      
      return newVisible;
    });
  };

  const handleViewModeChange = (mode: 'all' | 'custom') => {
    setViewMode(mode);
    if (mode === 'all' && boardConfig) {
      setVisibleStatusIds(boardConfig.statuses.map(s => s.id));
      setCurrentViewId('all');
    }
  };

  const handleApplyView = (view: BoardView) => {
    setVisibleStatusIds(view.statusIds);
    setViewMode(view.id === 'all' ? 'all' : 'custom');
    setCurrentViewId(view.id);
  };

  const getTaskCount = (statusId: string) => {
    return tasks[statusId as keyof typeof tasks]?.length || 0;
  };

  const getIconComponent = (iconName: string) => {
    const icons = { Grid, Play, ArrowRight, Clock, CheckCircle, Eye, Star, Filter };
    return icons[iconName as keyof typeof icons] || Eye;
  };

  const allStatuses = boardConfig ? sortStatusesByPosition(boardConfig.statuses) : [];
  const statuses = viewMode === 'all' ? allStatuses : allStatuses.filter(s => visibleStatusIds.includes(s.id));

  // Get task counts for suggestions
  const taskCounts = allStatuses.reduce((acc, status) => {
    acc[status.id] = getTaskCount(status.id);
    return acc;
  }, {} as Record<string, number>);

  const suggestedViewIds = suggestViews(taskCounts);
  const currentView = availableViews.find(v => v.id === currentViewId);

  // Loading state
  if (isLoading || !resolvedParams) {
  return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sprint Board</h1>
        <p className="text-muted-foreground">Track progress of current sprint tasks</p>
          </div>
          <div className="h-9 w-32 bg-muted rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="bg-surface rounded-3xl border border-outline-variant/50 overflow-hidden">
                <div className="bg-muted/50 p-4 animate-pulse">
                  <div className="h-6 bg-muted rounded-full w-24"></div>
                </div>
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-16 bg-muted rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sprint Board</h1>
          <p className="text-muted-foreground">
            Track progress of current sprint tasks 
            {currentView && currentView.id !== 'all' && statuses.length < allStatuses.length && (
              <span className="text-primary"> • {currentView.name} view ({statuses.length} columns)</span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Filter Dropdown */}
          {boardConfig && allStatuses.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full border-outline bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  View Columns
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {statuses.length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-96 elevation-3 rounded-3xl border-outline-variant/50 p-0 overflow-hidden"
                style={{ maxHeight: 'min(85vh, 700px)' }}
              >
                {/* Header */}
                <div className="bg-surface-variant/20 px-6 py-4 border-b border-outline-variant/20 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg text-on-surface">Board Views</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Choose how to display your board columns</p>
                </div>

                {/* Content Area với fixed height */}
                <div className="flex flex-col overflow-hidden" style={{ height: 'calc(min(85vh, 700px) - 88px)' }}>
                  <div className="overflow-y-auto flex-1">
                  {/* Preset Views */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-on-surface">Quick Views</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {availableViews.map((view) => {
                        const IconComponent = getIconComponent(view.icon);
                        const isActive = currentViewId === view.id;
                        const isSuggested = suggestedViewIds.includes(view.id);
                        
                        return (
                          <button
                            key={view.id}
                            onClick={() => handleApplyView(view)}
                            className={`
                              w-full p-4 rounded-2xl border transition-all duration-200 text-left
                              ${isActive 
                                ? 'bg-primary/10 border-primary/30 text-primary' 
                                : 'bg-surface border-outline-variant/50 hover:border-primary/30 hover:bg-primary/5'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`
                                p-2 rounded-xl flex-shrink-0
                                ${isActive ? 'bg-primary/20' : 'bg-surface-variant/50'}
                              `}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium truncate">{view.name}</span>
                                  {isSuggested && (
                                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium">
                                      Suggested
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">{view.description}</div>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
                                  {view.statusIds.length}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="h-px bg-outline-variant/20"></div>

                  {/* Individual Status Toggle */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm text-on-surface">Custom Selection</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setVisibleStatusIds(allStatuses.map(s => s.id));
                            setViewMode('all');
                          }}
                          className="text-xs text-primary hover:text-primary/80 font-medium"
                        >
                          All
                        </button>
                        <span className="text-muted-foreground">•</span>
                        <button
                          onClick={() => {
                            setVisibleStatusIds([]);
                            setViewMode('custom');
                          }}
                          className="text-xs text-primary hover:text-primary/80 font-medium"
                        >
                          None
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {allStatuses.map((status) => {
                        const isVisible = visibleStatusIds.includes(status.id);
                        const taskCount = getTaskCount(status.id);
                        
                        return (
                          <div 
                            key={status.id}
                            onClick={() => handleStatusToggle(status.id)}
                            className={`
                              flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-200
                              ${isVisible 
                                ? 'bg-surface border-outline-variant/50' 
                                : 'bg-surface-variant/30 border-outline-variant/30'
                              }
                              hover:border-primary/30 hover:bg-primary/5
                            `}
                          >
                            <Checkbox 
                              checked={isVisible}
                              onChange={() => handleStatusToggle(status.id)}
                              className="rounded-md"
                            />
                            <div className={`w-4 h-4 rounded-full bg-${status.color}-500 flex-shrink-0`}></div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{status.title}</div>
                              <div className="text-xs text-muted-foreground">{taskCount} tasks</div>
                            </div>
                            {!isVisible && (
                              <EyeOff className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Board Settings */}
          {boardConfig && (
            <BoardSettingsDialog
              config={boardConfig}
              onSave={handleConfigChange}
            />
          )}
        </div>
      </div>

      {/* Dynamic Board Grid */}
      {statuses.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <EyeOff className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">No Columns Visible</h3>
              <p className="text-muted-foreground">
                Select columns to display using the "View Columns" filter above
              </p>
            </div>
            <Button 
              onClick={() => handleViewModeChange('all')}
              className="rounded-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Show All Columns
            </Button>
          </div>
        </div>
      ) : (
        <div className={`
          grid gap-6 
          ${statuses.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : ''}
          ${statuses.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
          ${statuses.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
          ${statuses.length >= 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : ''}
        `}>
        {statuses.map((status) => (
          <div key={status.id} className="space-y-4">
            {/* Column Container đơn giản với background color */}
            <div className={`
              ${status.bgColor} rounded-3xl overflow-hidden transition-all duration-200
            `}>
              {/* Column Header */}
              <div className={`
                ${status.headerColor} px-4 py-3 border-b border-black/5 dark:border-white/5
                flex items-center justify-between
              `}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
                  <h2 className="font-semibold text-on-surface">{status.title}</h2>
                  <Badge 
                    variant="secondary" 
                    className={`
                      bg-${status.color}-100 text-${status.color}-800 border-${status.color}-200
                      dark:bg-${status.color}-900/30 dark:text-${status.color}-300 dark:border-${status.color}-800
                      font-medium px-2 py-0.5 rounded-full text-xs
                    `}
                  >
                    {getTaskCount(status.id)}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full hover:bg-surface-variant/50"
                >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

              {/* Column Content */}
              <div className={`${status.bgColor} p-4 min-h-[400px]`}>
                <div className="space-y-3">
                  {tasks[status.id as keyof typeof tasks]?.map((task) => (
                    <div 
                      key={task.id} 
                      className="
                        bg-surface rounded-2xl p-4 
                        hover:bg-surface/80 hover:scale-[1.02]
                        transition-all duration-200 cursor-pointer group
                      "
                    >
            <div className="space-y-3">
                        {/* Task Header */}
                    <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm text-on-surface leading-tight group-hover:text-primary transition-colors">
                            {task.title}
                          </h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>

                        {/* Task Footer */}
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
                              className="text-xs rounded-full px-2 py-0.5"
                        >
                          {task.priority}
                        </Badge>
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 bg-primary/10 text-primary font-bold rounded-full text-xs flex items-center justify-center">
                                {task.points}
                              </div>
                              <span className="text-xs text-muted-foreground">pts</span>
                            </div>
                      </div>
                          <Avatar className="w-7 h-7 ring-2 ring-outline-variant/30">
                            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                              {task.assignee}
                            </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                                    </div>
              ))}

                  {/* Add Task Button */}
                  {getTaskCount(status.id) === 0 && (
                    <div className="flex items-center justify-center py-8">
                      <Button 
                        variant="ghost" 
                        className="
                          flex flex-col items-center gap-2 p-6 rounded-2xl
                          bg-surface/50 hover:bg-surface
                          transition-all duration-200
                        "
                      >
                        <Plus className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Add task</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Info Card for Custom View - chỉ hiển thị khi thực sự custom */}
      {viewMode === 'custom' && statuses.length > 0 && statuses.length < allStatuses.length && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Filter className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-primary">Custom View Active</div>
              <div className="text-sm text-primary/70">
                Showing {statuses.length} of {allStatuses.length} available columns
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleViewModeChange('all')}
            className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Show All
          </Button>
        </div>
      )}
    </div>
  )
}
