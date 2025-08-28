"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  List,
  Zap,
  Kanban,
  Calendar,
  MessageSquare,
  FileText,
  MoreHorizontal,
  Users,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectNavProps {
  projectId: string
  projectName?: string
}

const projectNavigation = [
  {
    name: "Summary",
    href: "",
    icon: FileText,
  },
  {
    name: "Backlog",
    href: "/backlog",
    icon: List,
  },
  {
    name: "Sprint Management",
    href: "/sprint",
    icon: Zap,
  },
  {
    name: "Board",
    href: "/board",
    icon: Kanban,
  },
  {
    name: "Daily Scrum",
    href: "/daily-scrum",
    icon: Calendar,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Communication",
    href: "/communication",
    icon: MessageSquare,
  },
  {
    name: "Members",
    href: "/members",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function ProjectNav({ projectId, projectName }: ProjectNavProps) {
  const pathname = usePathname()
  const [visibleItems, setVisibleItems] = useState<number>(projectNavigation.length)
  const containerRef = useRef<HTMLDivElement>(null)
  const displayName = (projectName && projectName.trim()) || projectId
  const getInitials = (name: string) => {
    const parts = name.replace(/[-_]/g, " ").split(" ").filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerWidth = container.offsetWidth
      
      // Ước tính kích thước mỗi item (có thể điều chỉnh theo thiết kế thực tế)
      const estimatedItemWidths = projectNavigation.map(item => {
        // Tính toán dựa trên độ dài text + icon + padding
        return Math.max(80, item.name.length * 8 + 50) // 8px per character + 50px cho icon và padding
      })
      
      let totalWidth = 0
      let visibleCount = 0
      const moreButtonWidth = 80 // Width của "More" button
      
      for (let i = 0; i < projectNavigation.length; i++) {
        const itemWidth = estimatedItemWidths[i] + 4 // gap
        const needsMoreButton = i < projectNavigation.length - 1
        const requiredWidth = totalWidth + itemWidth + (needsMoreButton ? moreButtonWidth : 0)
        
        if (requiredWidth <= containerWidth) {
          totalWidth += itemWidth
          visibleCount++
        } else {
          break
        }
      }
      
      // Nếu tất cả items đều fit, hiển thị tất cả
      if (visibleCount === projectNavigation.length) {
        setVisibleItems(projectNavigation.length)
      } else {
        setVisibleItems(Math.max(1, visibleCount))
      }
    }

    checkOverflow()
    
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    window.addEventListener("resize", checkOverflow)
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", checkOverflow)
    }
  }, [])

  const visibleNavItems = projectNavigation.slice(0, visibleItems)
  const hiddenNavItems = projectNavigation.slice(visibleItems)

  return (
    <div className="bg-background">
      <div className="px-6">
        <div className="w-full flex items-center justify-between py-3 gap-3">
          {/* Project identity (fixed width to avoid shifting) */}
          <div className="flex items-center gap-3 min-w-0 w-56 flex-shrink-0 -ml-1">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {getInitials(displayName)}
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold text-foreground truncate" title={displayName}>{displayName}</div>
              <div className="text-[11px] text-muted-foreground">Project</div>
            </div>
          </div>

          {/* Navigation items with fixed starting point */}
          <div ref={containerRef} className="flex items-center gap-1 min-w-0 flex-1 justify-end">
            {visibleNavItems.map((item) => {
              const href = `/project/${projectId}${item.href}`
              const isActive = pathname === href

              return (
                <Link key={item.name} href={href}>
                  <Button
                    data-nav-item
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2 whitespace-nowrap",
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}

            {hiddenNavItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MoreHorizontal className="w-4 h-4" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {hiddenNavItems.map((item) => {
                    const href = `/project/${projectId}${item.href}`
                    const isActive = pathname === href

                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={href} className={cn("flex items-center gap-2", isActive && "bg-accent")}>
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
