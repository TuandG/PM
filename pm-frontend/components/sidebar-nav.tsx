"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const projects = [
  { id: "1", name: "E-commerce Platform", status: "active" },
  { id: "2", name: "Mobile Banking App", status: "active" },
  { id: "3", name: "CRM System", status: "planning" },
  { id: "4", name: "Analytics Dashboard", status: "completed" },
  { id: "5", name: "Marketing Website", status: "active" },
  { id: "6", name: "Internal Tools", status: "planning" },
]

const MAX_SIDEBAR_PROJECTS = 3

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
]

interface SidebarNavProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function SidebarNav({ sidebarOpen, setSidebarOpen }: SidebarNavProps) {
  const pathname = usePathname()
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true)

  const sidebarProjects = projects.slice(0, MAX_SIDEBAR_PROJECTS)
  const hasMoreProjects = projects.length > MAX_SIDEBAR_PROJECTS

  return (
    <div className="flex h-full w-60 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center justify-between pl-6 pr-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">ScrumBoard</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="h-8 w-8 p-0 hover:bg-sidebar-accent"
        >
          <X className="h-4 w-4 text-sidebar-foreground" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}

          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
              className="w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {isProjectsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <FolderOpen className="w-4 h-4" />
              Projects
            </Button>

            {isProjectsExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {sidebarProjects.map((project) => {
                  const isActive = pathname.startsWith(`/project/${project.id}`)
                  return (
                    <Link key={project.id} href={`/project/${project.id}`}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-9 text-sm",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full ",
                            project.status === "active"
                              ? "bg-green-500"
                              : project.status === "planning"
                                ? "bg-yellow-500"
                                : "bg-gray-400",
                          )}
                        />
                        <span className="truncate max-w-33">{project.name}</span>
                      </Button>
                    </Link>
                  )
                })}

                {hasMoreProjects && (
                  <Link href="/projects">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-9 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      More Projects ({projects.length - MAX_SIDEBAR_PROJECTS})
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </ScrollArea>

      <div className="p-3 border-t border-sidebar-border">
        <Link href="/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}
