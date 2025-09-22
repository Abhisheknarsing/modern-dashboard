import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import { DashboardProvider } from '@/components/providers/dashboard-provider'
import { KPIGrid } from '@/components/dashboard/kpi-grid'
import { FinancialGrid } from '@/components/dashboard/financial-grid'
import { mockKPIData, mockFinancialData } from '@/test/utils'

// Mock the dashboard data hook
const mockUseDashboard = vi.fn()
vi.mock('@/hooks/useDashboard', () => ({
  useDashboard: () => mockUseDashboard(),
}))

describe('Dashboard Data Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and displays KPI data correctly', async () => {
    mockUseDashboard.mockReturnValue({
      kpiData: mockKPIData,
      financialData: mockFinancialData,
      isLoading: false,
      error: null,
      refreshData: vi.fn(),
    })

    render(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('1.25M')).toBeInTheDocument() // accounts
      expect(screen.getByText('450K')).toBeInTheDocument() // expenses
      expect(screen.getByText('2.8M')).toBeInTheDocument() // company value
      expect(screen.getByText('156')).toBeInTheDocument() // employees
    })
  })

  it('displays loading state while fetching data', () => {
    mockUseDashboard.mockReturnValue({
      kpiData: null,
      financialData: null,
      isLoading: true,
      error: null,
      refreshData: vi.fn(),
    })

    render(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('handles error state gracefully', async () => {
    const mockError = new Error('Failed to fetch data')
    mockUseDashboard.mockReturnValue({
      kpiData: null,
      financialData: null,
      isLoading: false,
      error: mockError,
      refreshData: vi.fn(),
    })

    render(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/error loading data/i)).toBeInTheDocument()
    })
  })

  it('refreshes data when refresh function is called', async () => {
    const mockRefresh = vi.fn()
    mockUseDashboard.mockReturnValue({
      kpiData: mockKPIData,
      financialData: mockFinancialData,
      isLoading: false,
      error: null,
      refreshData: mockRefresh,
    })

    render(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    refreshButton.click()

    expect(mockRefresh).toHaveBeenCalled()
  })

  it('displays financial data correctly', async () => {
    mockUseDashboard.mockReturnValue({
      kpiData: mockKPIData,
      financialData: mockFinancialData,
      isLoading: false,
      error: null,
      refreshData: vi.fn(),
    })

    render(
      <DashboardProvider>
        <FinancialGrid />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('$125K')).toBeInTheDocument() // income
      expect(screen.getByText('$45K')).toBeInTheDocument() // expenses
      expect(screen.getByText('$32K')).toBeInTheDocument() // spendings
      expect(screen.getByText('$48K')).toBeInTheDocument() // totals
    })
  })

  it('updates data reactively when provider state changes', async () => {
    const { rerender } = render(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    // Initial state
    mockUseDashboard.mockReturnValue({
      kpiData: mockKPIData,
      financialData: mockFinancialData,
      isLoading: false,
      error: null,
      refreshData: vi.fn(),
    })

    rerender(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('1.25M')).toBeInTheDocument()
    })

    // Updated state
    const updatedKPIData = {
      ...mockKPIData,
      accounts: {
        ...mockKPIData.accounts,
        current: 1500000,
      },
    }

    mockUseDashboard.mockReturnValue({
      kpiData: updatedKPIData,
      financialData: mockFinancialData,
      isLoading: false,
      error: null,
      refreshData: vi.fn(),
    })

    rerender(
      <DashboardProvider>
        <KPIGrid />
      </DashboardProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('1.5M')).toBeInTheDocument()
    })
  })
})