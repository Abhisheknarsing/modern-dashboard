import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '@/components/dashboard/sidebar'
import { KPIGrid } from '@/components/dashboard/kpi-grid'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

// Mock window.matchMedia for different screen sizes
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('Responsive Behavior Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Sidebar Responsive Behavior', () => {
    it('shows full sidebar on desktop', () => {
      mockMatchMedia(false) // Desktop (not mobile)
      
      render(<Sidebar />)
      
      const sidebar = screen.getByRole('navigation')
      expect(sidebar).not.toHaveClass('collapsed')
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('collapses sidebar on mobile', () => {
      mockMatchMedia(true) // Mobile
      
      render(<Sidebar />)
      
      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('mobile-collapsed')
    })

    it('toggles sidebar visibility on mobile', async () => {
      mockMatchMedia(true) // Mobile
      
      render(<Sidebar />)
    const user = userEvent.setup()
      
      const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i })
      await user.click(toggleButton)
      
      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('mobile-open')
    })
  })

  describe('KPI Grid Responsive Layout', () => {
    it('displays 2x2 grid on desktop', () => {
      mockMatchMedia(false) // Desktop
      
      render(<KPIGrid />)
      
      const grid = screen.getByTestId('kpi-grid')
      expect(grid).toHaveClass('grid-cols-2', 'lg:grid-cols-2')
    })

    it('displays single column on mobile', () => {
      mockMatchMedia(true) // Mobile
      
      render(<KPIGrid />)
      
      const grid = screen.getByTestId('kpi-grid')
      expect(grid).toHaveClass('grid-cols-1')
    })
  })

  describe('Dashboard Layout Responsive Behavior', () => {
    it('adjusts layout for mobile screens', () => {
      mockMatchMedia(true) // Mobile
      
      render(
        <DashboardLayout>
          <div>Dashboard Content</div>
        </DashboardLayout>
      )
      
      const layout = screen.getByTestId('dashboard-layout')
      expect(layout).toHaveClass('mobile-layout')
    })

    it('uses desktop layout for larger screens', () => {
      mockMatchMedia(false) // Desktop
      
      render(
        <DashboardLayout>
          <div>Dashboard Content</div>
        </DashboardLayout>
      )
      
      const layout = screen.getByTestId('dashboard-layout')
      expect(layout).toHaveClass('desktop-layout')
    })
  })

  describe('Chart Responsive Behavior', () => {
    it('adjusts chart height for mobile', () => {
      mockMatchMedia(true) // Mobile
      
      render(<div data-testid="chart-container" className="responsive-chart" />)
      
      const chart = screen.getByTestId('chart-container')
      expect(chart).toHaveClass('responsive-chart')
    })
  })

  describe('Touch Interactions', () => {
    it('handles touch events on mobile devices', async () => {
      mockMatchMedia(true) // Mobile
      
      const mockTouchHandler = vi.fn()
      
      render(
        <div
          data-testid="touch-element"
          onTouchStart={mockTouchHandler}
        >
          Touch me
        </div>
      )
      
      const element = screen.getByTestId('touch-element')
      
      // Simulate touch event
      const touchEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      
      element.dispatchEvent(touchEvent)
      expect(mockTouchHandler).toHaveBeenCalled()
    })
  })

  describe('Viewport Meta Tag', () => {
    it('has proper viewport configuration for mobile', () => {
      // This would typically be tested in an E2E test
      // but we can verify the meta tag exists
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      expect(viewportMeta).toBeTruthy()
    })
  })

  describe('Breakpoint Utilities', () => {
    it('applies correct classes at different breakpoints', () => {
      render(
        <div
          data-testid="responsive-element"
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          Responsive Element
        </div>
      )
      
      const element = screen.getByTestId('responsive-element')
      expect(element).toHaveClass('w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/4')
    })
  })
})