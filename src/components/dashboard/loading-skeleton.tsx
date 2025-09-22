"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LoadingSkeletonProps {
  variant?: 'dashboard' | 'kpi' | 'chart' | 'financial' | 'kpi-grid' | 'financial-grid' | 'circular-progress' | 'metrics-summary'
  count?: number
}

// Enhanced shimmer animation using Tailwind classes
const shimmerClass = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function LoadingSkeleton({ variant = 'dashboard', count = 1 }: LoadingSkeletonProps) {
  if (variant === 'dashboard') {
    return (
      <div className="space-y-6">
        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
        {/* Header skeleton */}
        <div className="space-y-1 sm:space-y-2 animate-pulse">
          <div className={`h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48 ${shimmerClass}`}></div>
          <div className={`h-3 sm:h-4 bg-gray-200 rounded w-64 sm:w-96 ${shimmerClass}`}></div>
        </div>
        
        {/* KPI cards skeleton */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-2 sm:space-y-3">
                <div className={`h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
                <div className={`h-6 sm:h-8 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
                <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Charts skeleton */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-7">
          <Card className="lg:col-span-4 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
              <div className={`h-4 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 ${shimmerClass}`}></div>
            </CardHeader>
            <CardContent className="px-1 sm:px-6 pb-3 sm:pb-6">
              <div className={`h-36 sm:h-48 bg-gray-200 rounded ${shimmerClass}`}></div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
              <div className={`h-4 sm:h-6 bg-gray-200 rounded w-28 sm:w-40 ${shimmerClass}`}></div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="space-y-3 sm:space-y-4">
                <div className={`h-16 w-16 sm:h-24 sm:w-24 bg-gray-200 rounded-full mx-auto ${shimmerClass}`}></div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className={`h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-full mx-auto ${shimmerClass}`}></div>
                  <div className={`h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-full mx-auto ${shimmerClass}`}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Financial section skeleton */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2 animate-pulse">
            <div className={`h-5 sm:h-7 bg-gray-200 rounded w-36 sm:w-48 ${shimmerClass}`}></div>
            <div className={`h-3 sm:h-4 bg-gray-200 rounded w-56 sm:w-80 ${shimmerClass}`}></div>
          </div>
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-2 sm:space-y-3">
                  <div className={`h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
                  <div className={`h-6 sm:h-8 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
                  <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'kpi') {
    return (
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-2 sm:space-y-3">
              <div className={`h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
              <div className={`h-6 sm:h-8 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
              <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (variant === 'chart') {
    return (
      <Card className="animate-pulse hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
          <div className={`h-4 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 ${shimmerClass}`}></div>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className={`h-48 sm:h-64 bg-gray-200 rounded ${shimmerClass}`}></div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'financial') {
    return (
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-2 sm:space-y-3">
              <div className={`h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
              <div className={`h-6 sm:h-8 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
              <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (variant === 'kpi-grid') {
    return (
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-2 sm:space-y-3">
              <div className={`h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
              <div className={`h-6 sm:h-8 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
              <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (variant === 'financial-grid') {
    return (
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-2 sm:space-y-3">
              <div className={`h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 ${shimmerClass}`}></div>
              <div className={`h-6 sm:h-8 bg-gray-200 rounded w-20 sm:w-24 ${shimmerClass}`}></div>
              <div className={`h-2 sm:h-3 bg-gray-200 rounded w-12 sm:w-16 ${shimmerClass}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (variant === 'circular-progress') {
    return (
      <div className="space-y-3 sm:space-y-6 animate-pulse">
        <div className="flex justify-center">
          <div className={`h-16 w-16 sm:h-24 sm:w-24 bg-gray-200 rounded-full ${shimmerClass}`}></div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="text-center">
            <div className={`h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-full mx-auto ${shimmerClass}`}></div>
          </div>
          <div className="text-center">
            <div className={`h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-full mx-auto ${shimmerClass}`}></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'metrics-summary') {
    return (
      <Card className="p-3 sm:p-6 animate-pulse hover:shadow-lg transition-shadow duration-300">
        <div className="space-y-2 sm:space-y-3">
          <div className={`h-4 sm:h-5 bg-gray-200 rounded w-24 sm:w-32 ${shimmerClass}`}></div>
          <div className={`h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40 ${shimmerClass}`}></div>
          <div className={`h-3 sm:h-4 bg-gray-200 rounded w-28 sm:w-36 ${shimmerClass}`}></div>
        </div>
      </Card>
    )
  }

  return null
}