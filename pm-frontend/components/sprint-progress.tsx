import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp } from "lucide-react"

export function SprintProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Sprint Progress
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sprint 23: Mobile App MVP</span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Dec 1 - Dec 15, 2024</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Story Points Completed</span>
            <span className="font-medium">34 / 50</span>
          </div>
          <Progress value={68} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Goal</span>
            </div>
            <p className="text-xs">Complete user onboarding flow and core features</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Velocity</span>
            </div>
            <p className="text-xs">On track for completion</p>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days remaining</span>
            <span className="font-medium">5 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
