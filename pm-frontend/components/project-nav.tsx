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

export function ProjectNav({ projectId }: ProjectNavProps) {
  const pathname = usePathname()
  const [visibleItems, setVisibleItems] = useState<number>(projectNavigation.length)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const items = container.querySelectorAll("[data-nav-item]")
      let totalWidth = 0
      let visibleCount = 0

      items.forEach((item, index) => {
        const itemWidth = (item as HTMLElement).offsetWidth + 4 // gap
        if (totalWidth + itemWidth + 100 < container.offsetWidth) {
          // 100px for more button
          totalWidth += itemWidth
          visibleCount++
        }
      })

      setVisibleItems(Math.max(1, visibleCount))
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [])

  const visibleNavItems = projectNavigation.slice(0, visibleItems)
  const hiddenNavItems = projectNavigation.slice(visibleItems)

  return (
    <div className="bg-background">
      <div ref={containerRef} className="flex items-center gap-1 px-6 py-3">
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
  )
}
