"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

const MIN_SIDEBAR_WIDTH = 150
const MAX_SIDEBAR_WIDTH = 600
const DEFAULT_SIDEBAR_WIDTH = 256

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Load sidebar width from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebar-width')
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (width >= MIN_SIDEBAR_WIDTH && width <= MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(width)
      }
    }
  }, [])

  // Save sidebar width to localStorage
  const saveSidebarWidth = useCallback((width: number) => {
    localStorage.setItem('sidebar-width', width.toString())
  }, [])

  // Handle mouse move during resize
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return

    e.preventDefault()
    const newWidth = Math.min(Math.max(e.clientX, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH)
    setSidebarWidth(newWidth)
  }, [isResizing])

  // Handle mouse up to stop resizing
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      saveSidebarWidth(sidebarWidth)
    }
  }, [isResizing, sidebarWidth, saveSidebarWidth])

  // Add/remove event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  // Start resizing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <div
        ref={sidebarRef}
        className={`relative transition-all duration-300 ${sidebarOpen ? "" : "w-0"} overflow-hidden flex-shrink-0`}
        style={{
          width: sidebarOpen ? `${sidebarWidth}px` : '0px'
        }}
      >
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarWidth={sidebarWidth}
        />

        {/* Resize Handle */}
        {sidebarOpen && (
          <div
            className="absolute top-0 right-0 w-2 h-full bg-transparent hover:bg-border/50 cursor-col-resize group transition-all"
            onMouseDown={handleMouseDown}
          >
            <div className="w-full h-full group-hover:bg-primary/30 transition-colors duration-150" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-border/30 rounded-full group-hover:bg-primary/50 transition-colors duration-150" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex items-center border-b border-border bg-background">
          {!sidebarOpen && (
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="m-2 h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div className="flex-1">
            <TopBar />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
