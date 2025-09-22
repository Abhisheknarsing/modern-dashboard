import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL('/dashboard')
  })

  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // Sidebar should be visible
    const sidebar = page.getByRole('navigation')
    await expect(sidebar).toBeVisible()
    await expect(sidebar).not.toHaveClass(/collapsed/)
    
    // KPI grid should be 2x2
    const kpiGrid = page.getByTestId('kpi-grid')
    await expect(kpiGrid).toHaveClass(/grid-cols-2/)
  })

  test('should adapt layout for tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    
    // Sidebar should still be visible but may be collapsible
    const sidebar = page.getByRole('navigation')
    await expect(sidebar).toBeVisible()
    
    // KPI grid should adapt
    const kpiGrid = page.getByTestId('kpi-grid')
    await expect(kpiGrid).toBeVisible()
  })

  test('should optimize for mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Sidebar should be collapsed by default
    const sidebar = page.getByRole('navigation')
    await expect(sidebar).toHaveClass(/mobile-collapsed/)
    
    // KPI grid should be single column
    const kpiGrid = page.getByTestId('kpi-grid')
    await expect(kpiGrid).toHaveClass(/grid-cols-1/)
    
    // Charts should be responsive
    const chart = page.getByTestId('traffic-chart')
    await expect(chart).toBeVisible()
  })

  test('should handle sidebar toggle on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const sidebar = page.getByRole('navigation')
    const toggleButton = page.getByRole('button', { name: /toggle sidebar/i })
    
    // Initially collapsed
    await expect(sidebar).toHaveClass(/mobile-collapsed/)
    
    // Toggle open
    await toggleButton.click()
    await expect(sidebar).toHaveClass(/mobile-open/)
    
    // Toggle closed
    await toggleButton.click()
    await expect(sidebar).toHaveClass(/mobile-collapsed/)
  })

  test('should maintain functionality across breakpoints', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1024, height: 768 },  // Tablet landscape
      { width: 768, height: 1024 },  // Tablet portrait
      { width: 375, height: 667 },   // Mobile
    ]
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      
      // All KPI cards should be visible
      await expect(page.getByTestId('kpi-accounts')).toBeVisible()
      await expect(page.getByTestId('kpi-expenses')).toBeVisible()
      await expect(page.getByTestId('kpi-company-value')).toBeVisible()
      await expect(page.getByTestId('kpi-employees')).toBeVisible()
      
      // Charts should be visible
      await expect(page.getByTestId('traffic-chart')).toBeVisible()
      
      // Financial cards should be visible
      await expect(page.getByTestId('financial-income')).toBeVisible()
    }
  })

  test('should handle touch interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Test touch scrolling
    await page.touchscreen.tap(200, 300)
    
    // Test touch navigation
    const navLink = page.getByRole('link', { name: /analytics/i })
    await navLink.tap()
    await expect(page).toHaveURL('/dashboard/analytics')
  })

  test('should optimize font sizes for different screens', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    const desktopTitle = page.getByRole('heading', { name: /dashboard/i })
    const desktopFontSize = await desktopTitle.evaluate(el => 
      window.getComputedStyle(el).fontSize
    )
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 })
    const mobileFontSize = await desktopTitle.evaluate(el => 
      window.getComputedStyle(el).fontSize
    )
    
    // Font size should be smaller on mobile
    expect(parseInt(mobileFontSize)).toBeLessThanOrEqual(parseInt(desktopFontSize))
  })

  test('should handle orientation changes', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByTestId('kpi-grid')).toBeVisible()
    
    // Landscape
    await page.setViewportSize({ width: 667, height: 375 })
    await expect(page.getByTestId('kpi-grid')).toBeVisible()
  })

  test('should maintain accessibility on all screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 375, height: 667 },
    ]
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      
      // Check keyboard navigation
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Check ARIA labels
      const navigation = page.getByRole('navigation')
      await expect(navigation).toHaveAttribute('aria-label')
    }
  })
})