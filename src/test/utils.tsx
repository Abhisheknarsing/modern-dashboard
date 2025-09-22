import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'

// Mock session data
const mockSession = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
  },
  expires: '2024-12-31',
}

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={mockSession}>
      {children}
    </SessionProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Test data helpers
export const mockKPIData = {
  accounts: {
    current: 1250000,
    previous: 1100000,
    change: 13.6,
    changeType: 'positive' as const,
  },
  expenses: {
    current: 450000,
    previous: 520000,
    change: -13.5,
    changeType: 'negative' as const,
  },
  companyValue: {
    current: 2800000,
    previous: 2650000,
    change: 5.7,
    changeType: 'positive' as const,
  },
  employees: {
    current: 156,
    previous: 142,
    change: 9.9,
    changeType: 'positive' as const,
  },
}

export const mockChartData = [
  { name: 'Direct', value: 4000, color: '#3b82f6' },
  { name: 'Social', value: 3000, color: '#10b981' },
  { name: 'Email', value: 2000, color: '#f59e0b' },
  { name: 'Other', value: 2780, color: '#ef4444' },
]

export const mockFinancialData = {
  income: 125000,
  expenses: 45000,
  spendings: 32000,
  totals: 48000,
  incomeChange: 12.5,
  expensesChange: -8.2,
  spendingsChange: 15.3,
  totalsChange: 6.8,
}