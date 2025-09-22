import { test, expect } from '@playwright/test'

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL('/dashboard')
  })

  test('should display all KPI cards', async ({ page }) => {
    await expect(page.getByTestId('kpi-accounts')).toBeVisible()
    await expect(page.getByTestId('kpi-expenses')).toBeVisible()
    await expect(page.getByTestId('kpi-company-value')).toBeVisible()
    await expect(page.getByTestId('kpi-employees')).toBeVisible()
  })

  test('should display KPI values and changes', async ({ page }) => {
    const accountsCard = page.getByTestId('kpi-accounts')
    await expect(accountsCard.getByText(/1\.25M/)).toBeVisible()
    await expect(accountsCard.getByText(/\+13\.6%/)).toBeVisible()
    
    const expensesCard = page.getByTestId('kpi-expenses')
    await expect(expensesCard.getByText(/450K/)).toBeVisible()
    await expect(expensesCard.getByText(/-13\.5%/)).toBeVisible()
  })

  test('should display traffic sources chart', async ({ page }) => {
    await expect(page.getByTestId('traffic-chart')).toBeVisible()
    await expect(page.getByText(/traffic sources/i)).toBeVisible()
  })

  test('should display financial cards', async ({ page }) => {
    await expect(page.getByTestId('financial-income')).toBeVisible()
    await expect(page.getByTestId('financial-expenses')).toBeVisible()
    await expect(page.getByTestId('financial-spendings')).toBeVisible()
    await expect(page.getByTestId('financial-totals')).toBeVisible()
  })

  test('should show correct financial values', async ({ page }) => {
    const incomeCard = page.getByTestId('financial-income')
    await expect(incomeCard.getByText(/\$125K/)).toBeVisible()
    await expect(incomeCard.getByText(/\+12\.5%/)).toBeVisible()
  })

  test('should navigate between dashboard sections', async ({ page }) => {
    await page.getByRole('link', { name: /analytics/i }).click()
    await expect(page).toHaveURL('/dashboard/analytics')
    
    await page.getByRole('link', { name: /dashboard/i }).click()
    await expect(page).toHaveURL('/dashboard')
  })

  test('should toggle sidebar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile viewport
    
    const sidebar = page.getByRole('navigation')
    await expect(sidebar).toHaveClass(/mobile-collapsed/)
    
    await page.getByRole('button', { name: /toggle sidebar/i }).click()
    await expect(sidebar).toHaveClass(/mobile-open/)
  })

  test('should refresh data when refresh button is clicked', async ({ page }) => {
    const refreshButton = page.getByRole('button', { name: /refresh/i })
    await refreshButton.click()
    
    // Should show loading state briefly
    await expect(page.getByTestId('loading-skeleton')).toBeVisible()
    
    // Then show updated data
    await expect(page.getByTestId('kpi-accounts')).toBeVisible()
  })

  test('should display tooltips on chart hover', async ({ page }) => {
    const chart = page.getByTestId('traffic-chart')
    await chart.hover()
    
    // Tooltip should appear with data
    await expect(page.getByTestId('chart-tooltip')).toBeVisible()
  })

  test('should handle error states gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/api/dashboard/metrics', route => {
      route.abort('failed')
    })
    
    await page.reload()
    
    await expect(page.getByText(/error loading data/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /retry/i })).toBeVisible()
  })
})