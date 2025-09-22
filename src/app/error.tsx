'use client'

import React, { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
    
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error)
    }
  }, [error])

  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isAuthError = error.message.includes('auth') || error.message.includes('unauthorized')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-900">
              {isNetworkError ? 'Connection Error' : 
               isAuthError ? 'Authentication Error' : 
               'Something went wrong'}
            </CardTitle>
            <CardDescription className="text-base">
              {isNetworkError ? 
                'Unable to connect to the server. Please check your internet connection.' :
                isAuthError ?
                'There was a problem with authentication. Please try signing in again.' :
                'An unexpected error occurred. Our team has been notified and is working on a fix.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {process.env.NODE_ENV === 'development' && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">Error Details:</p>
                <p className="text-sm text-red-700 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-1">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div className="rounded-md bg-blue-50 p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">What you can try:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Refresh the page to try again</li>
                {isNetworkError && <li>• Check your internet connection</li>}
                {isAuthError && <li>• Sign out and sign back in</li>}
                <li>• Clear your browser cache</li>
                <li>• Try again in a few minutes</li>
                <li>• Contact support if the problem persists</li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={reset}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Refresh Page
              </Button>
              
              <Button 
                variant="ghost" 
                asChild
                className="w-full"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}