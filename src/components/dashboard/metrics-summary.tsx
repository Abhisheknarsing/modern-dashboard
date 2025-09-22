"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"

interface MetricsSummaryProps {
  lastUpdated?: Date
  totalMetrics?: number
  activeAlerts?: number
  systemStatus?: 'healthy' | 'warning' | 'error'
}

export function MetricsSummary({ 
  lastUpdated, 
  totalMetrics = 12, 
  activeAlerts = 0,
  systemStatus = 'healthy' 
}: MetricsSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <TrendingUp className="h-4 w-4" />
      case 'warning': return <Activity className="h-4 w-4" />
      case 'error': return <TrendingDown className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">System Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge className={getStatusColor(systemStatus)}>
            {getStatusIcon(systemStatus)}
            <span className="ml-1 capitalize">{systemStatus}</span>
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Active Metrics</span>
          <span className="text-sm font-medium">{totalMetrics}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Alerts</span>
          <Badge variant={activeAlerts > 0 ? "destructive" : "secondary"}>
            {activeAlerts}
          </Badge>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last updated
            </span>
            <span className="text-xs text-muted-foreground">
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}