'use client'

import React from 'react'
import { ErrorBoundary } from '../ui/error-boundary'
import { AlertCircle, Home } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

interface DashboardErrorBoundaryProps {
  children: React.ReactNode
}

const DashboardErrorFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] p-4">
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle className="text-xl">Dashboard Error</CardTitle>
        <CardDescription>
          We encountered an error while loading your dashboard. This might be due to a temporary issue with data loading or a component malfunction.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-blue-50 p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">What you can try:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Refresh the page to reload the dashboard</li>
            <li>• Check your internet connection</li>
            <li>• Try logging out and back in</li>
            <li>• Contact support if the issue persists</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Refresh Dashboard
          </Button>
          <Button 
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

export function DashboardErrorBoundary({ children }: DashboardErrorBoundaryProps) {
  return (
    <ErrorBoundary 
      fallback={<DashboardErrorFallback />}
      onError={(error, errorInfo) => {
        // Log dashboard-specific errors
        console.error('Dashboard Error:', error)
        console.error('Error Info:', errorInfo)
        
        // In production, send to error tracking service
        if (process.env.NODE_ENV === 'production') {
          // Example: trackDashboardError(error, errorInfo)
        }
      }}
    >
      {children}
    </ErrorBoundary>
  )
}