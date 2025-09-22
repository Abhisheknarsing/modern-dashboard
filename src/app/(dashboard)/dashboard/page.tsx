"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/dashboard";
import { useDashboard } from "@/components/providers";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Suspense, lazy } from "react";

// Lazy load heavy dashboard components
const KPIGrid = lazy(() => import("@/components/dashboard").then(mod => ({ default: mod.KPIGrid })));
const FinancialGrid = lazy(() => import("@/components/dashboard").then(mod => ({ default: mod.FinancialGrid })));
const MetricsSummary = lazy(() => import("@/components/dashboard").then(mod => ({ default: mod.MetricsSummary })));
const BarChart = lazy(() => import("@/components/charts").then(mod => ({ default: mod.BarChart })));
const CircularProgress = lazy(() => import("@/components/charts").then(mod => ({ default: mod.CircularProgress })));

export default function DashboardPage() {
  const {
    kpiCards,
    financialData,
    trafficSources,
    barChartData,
    performanceMetrics,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refreshData,
    clearError,
  } = useDashboard();

  // Transform traffic sources for bar chart
  const trafficChartData = trafficSources.map(item => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  if (isLoading) {
    return <LoadingSkeleton variant="dashboard" />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with refresh functionality */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome to your modern dashboard. Here&apos;s an overview of your business metrics.
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 w-fit touch-manipulation"
        >
          <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-xs sm:text-sm">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              onClick={clearError}
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards Section */}
      {kpiCards.length > 0 && (
        <div className={`transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
          <Suspense fallback={<LoadingSkeleton variant="kpi-grid" />}>
            <KPIGrid kpis={kpiCards} />
          </Suspense>
        </div>
      )}

      {/* Charts Section */}
      <div className={`grid gap-3 sm:gap-4 lg:grid-cols-7 transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
        <Card className="lg:col-span-4">
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="px-1 sm:px-2 pb-3 sm:pb-6">
            {trafficChartData.length > 0 ? (
              <Suspense fallback={<div className="h-36 sm:h-48 flex items-center justify-center"><LoadingSkeleton variant="chart" /></div>}>
                <BarChart
                  data={trafficChartData}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={180}
                />
              </Suspense>
            ) : (
              <div className="h-36 sm:h-48 flex items-center justify-center text-muted-foreground text-sm">
                No traffic data available
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3 space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <Suspense fallback={<LoadingSkeleton variant="circular-progress" />}>
                <div className="space-y-3 sm:space-y-6">
                  <div className="flex justify-center">
                    <CircularProgress
                      value={performanceMetrics.overall}
                      size="md"
                      label="Overall Performance"
                      color="#3b82f6"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="text-center">
                      <CircularProgress
                        value={performanceMetrics.sales}
                        size="sm"
                        label="Sales"
                        color="#10b981"
                      />
                    </div>
                    <div className="text-center">
                      <CircularProgress
                        value={performanceMetrics.marketing}
                        size="sm"
                        label="Marketing"
                        color="#f59e0b"
                      />
                    </div>
                  </div>
                </div>
              </Suspense>
            </CardContent>
          </Card>
          
          <Suspense fallback={<LoadingSkeleton variant="metrics-summary" />}>
            <MetricsSummary 
              lastUpdated={lastUpdated || undefined}
              totalMetrics={kpiCards.length + (financialData ? 4 : 0)}
              activeAlerts={error ? 1 : 0}
              systemStatus={error ? 'error' : isRefreshing ? 'warning' : 'healthy'}
            />
          </Suspense>
        </div>
      </div>

      {/* Financial Metrics Section */}
      {financialData && (
        <div className={`space-y-3 sm:space-y-4 transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Financial Overview</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track your financial performance and key monetary metrics.
            </p>
          </div>
          <Suspense fallback={<LoadingSkeleton variant="financial-grid" />}>
            <FinancialGrid data={financialData} />
          </Suspense>
        </div>
      )}

      {/* Additional Charts Section */}
      {barChartData.length > 0 && (
        <div className={`space-y-3 sm:space-y-4 transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Revenue Trends</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monthly revenue and expense trends over time.
            </p>
          </div>
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent className="px-1 sm:px-6 pb-3 sm:pb-6">
              <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingSkeleton variant="chart" /></div>}>
                <BarChart
                  data={barChartData.map(item => ({
                    name: item.month as string,
                    value: item.revenue as number,
                    color: '#3b82f6'
                  }))}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={250}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}