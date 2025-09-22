"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from "react"
import { 
  DashboardMetrics, 
  FinancialData, 
  TrafficSource, 
  ChartDataPoint,
  KPICardProps 
} from "@/types"
import {
  generateDynamicMetrics,
  generateDynamicFinancialData,
  generateDynamicTrafficSources,
  generateDynamicBarChartData,
  generateDynamicMonthlyData,
  generateDynamicKPICards,
  mockPerformanceMetrics,
  mockRecentActivities,
  mockNotifications,
  simulateApiDelay
} from "@/data/mockData"

interface DashboardState {
  // Core metrics
  metrics: DashboardMetrics | null
  financialData: FinancialData | null
  trafficSources: TrafficSource[]
  kpiCards: KPICardProps[]
  
  // Chart data
  barChartData: ChartDataPoint[]
  monthlyData: ChartDataPoint[]
  performanceMetrics: typeof mockPerformanceMetrics
  
  // Additional data
  recentActivities: typeof mockRecentActivities
  notifications: typeof mockNotifications
  
  // Loading states
  isLoading: boolean
  isRefreshing: boolean
  
  // Error handling
  error: string | null
  
  // Last updated timestamp
  lastUpdated: Date | null
}

type DashboardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_METRICS'; payload: DashboardMetrics }
  | { type: 'SET_FINANCIAL_DATA'; payload: FinancialData }
  | { type: 'SET_TRAFFIC_SOURCES'; payload: TrafficSource[] }
  | { type: 'SET_KPI_CARDS'; payload: KPICardProps[] }
  | { type: 'SET_BAR_CHART_DATA'; payload: ChartDataPoint[] }
  | { type: 'SET_MONTHLY_DATA'; payload: ChartDataPoint[] }
  | { type: 'SET_PERFORMANCE_METRICS'; payload: typeof mockPerformanceMetrics }
  | { type: 'SET_RECENT_ACTIVITIES'; payload: typeof mockRecentActivities }
  | { type: 'SET_NOTIFICATIONS'; payload: typeof mockNotifications }
  | { type: 'UPDATE_LAST_UPDATED' }
  | { type: 'RESET_STATE' }

const initialState: DashboardState = {
  metrics: null,
  financialData: null,
  trafficSources: [],
  kpiCards: [],
  barChartData: [],
  monthlyData: [],
  performanceMetrics: mockPerformanceMetrics,
  recentActivities: mockRecentActivities,
  notifications: mockNotifications,
  isLoading: true,
  isRefreshing: false,
  error: null,
  lastUpdated: null,
}

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_REFRESHING':
      return { ...state, isRefreshing: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false, isRefreshing: false }
    case 'SET_METRICS':
      return { ...state, metrics: action.payload }
    case 'SET_FINANCIAL_DATA':
      return { ...state, financialData: action.payload }
    case 'SET_TRAFFIC_SOURCES':
      return { ...state, trafficSources: action.payload }
    case 'SET_KPI_CARDS':
      return { ...state, kpiCards: action.payload }
    case 'SET_BAR_CHART_DATA':
      return { ...state, barChartData: action.payload }
    case 'SET_MONTHLY_DATA':
      return { ...state, monthlyData: action.payload }
    case 'SET_PERFORMANCE_METRICS':
      return { ...state, performanceMetrics: action.payload }
    case 'SET_RECENT_ACTIVITIES':
      return { ...state, recentActivities: action.payload }
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload }
    case 'UPDATE_LAST_UPDATED':
      return { ...state, lastUpdated: new Date(), isLoading: false, isRefreshing: false }
    case 'RESET_STATE':
      return { ...initialState, isLoading: true }
    default:
      return state
  }
}

interface DashboardContextType extends DashboardState {
  // Actions
  refreshData: () => Promise<void>
  refreshMetrics: () => Promise<void>
  refreshFinancialData: () => Promise<void>
  refreshChartData: () => Promise<void>
  clearError: () => void
  
  // Utility functions
  isDataStale: () => boolean
  getRefreshInterval: () => number
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

interface DashboardProviderProps {
  children: ReactNode
  autoRefresh?: boolean
  refreshInterval?: number // in milliseconds
}

export function DashboardProvider({ 
  children, 
  autoRefresh = true, 
  refreshInterval = 30000 // 30 seconds
}: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        dispatch({ type: 'SET_REFRESHING', payload: true })
      } else {
        dispatch({ type: 'SET_LOADING', payload: true })
      }
      
      dispatch({ type: 'SET_ERROR', payload: null })

      // Simulate API delay for realistic loading experience
      await simulateApiDelay()

      // Generate fresh mock data
      const metrics = generateDynamicMetrics()
      const financialData = generateDynamicFinancialData()
      const trafficSources = generateDynamicTrafficSources()
      const kpiCards = generateDynamicKPICards()
      const barChartData = generateDynamicBarChartData()
      const monthlyData = generateDynamicMonthlyData()

      // Update state with new data
      dispatch({ type: 'SET_METRICS', payload: metrics })
      dispatch({ type: 'SET_FINANCIAL_DATA', payload: financialData })
      dispatch({ type: 'SET_TRAFFIC_SOURCES', payload: trafficSources })
      dispatch({ type: 'SET_KPI_CARDS', payload: kpiCards })
      dispatch({ type: 'SET_BAR_CHART_DATA', payload: barChartData })
      dispatch({ type: 'SET_MONTHLY_DATA', payload: monthlyData })
      dispatch({ type: 'UPDATE_LAST_UPDATED' })

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
    }
  }, [])

  // Refresh specific data sections
  const refreshMetrics = useCallback(async () => {
    try {
      dispatch({ type: 'SET_REFRESHING', payload: true })
      await simulateApiDelay(200, 800)
      
      const metrics = generateDynamicMetrics()
      const kpiCards = generateDynamicKPICards()
      
      dispatch({ type: 'SET_METRICS', payload: metrics })
      dispatch({ type: 'SET_KPI_CARDS', payload: kpiCards })
      dispatch({ type: 'UPDATE_LAST_UPDATED' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh metrics'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
    }
  }, [])

  const refreshFinancialData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_REFRESHING', payload: true })
      await simulateApiDelay(200, 800)
      
      const financialData = generateDynamicFinancialData()
      dispatch({ type: 'SET_FINANCIAL_DATA', payload: financialData })
      dispatch({ type: 'UPDATE_LAST_UPDATED' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh financial data'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
    }
  }, [])

  const refreshChartData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_REFRESHING', payload: true })
      await simulateApiDelay(300, 1000)
      
      const trafficSources = generateDynamicTrafficSources()
      const barChartData = generateDynamicBarChartData()
      const monthlyData = generateDynamicMonthlyData()
      
      dispatch({ type: 'SET_TRAFFIC_SOURCES', payload: trafficSources })
      dispatch({ type: 'SET_BAR_CHART_DATA', payload: barChartData })
      dispatch({ type: 'SET_MONTHLY_DATA', payload: monthlyData })
      dispatch({ type: 'UPDATE_LAST_UPDATED' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh chart data'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
    }
  }, [])

  // Refresh all data
  const refreshData = useCallback(() => {
    return fetchDashboardData(true)
  }, [fetchDashboardData])

  // Clear error state
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  // Check if data is stale
  const isDataStale = useCallback(() => {
    if (!state.lastUpdated) return true
    const now = new Date()
    const timeDiff = now.getTime() - state.lastUpdated.getTime()
    return timeDiff > refreshInterval
  }, [state.lastUpdated, refreshInterval])

  // Get refresh interval
  const getRefreshInterval = useCallback(() => refreshInterval, [refreshInterval])

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      if (isDataStale() && !state.isLoading && !state.isRefreshing) {
        refreshData()
      }
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, isDataStale, refreshData, state.isLoading, state.isRefreshing])

  const contextValue: DashboardContextType = {
    ...state,
    refreshData,
    refreshMetrics,
    refreshFinancialData,
    refreshChartData,
    clearError,
    isDataStale,
    getRefreshInterval,
  }

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}