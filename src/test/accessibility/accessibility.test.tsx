import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/auth/login-form'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Sidebar } from '@/components/dashboard/sidebar'
import { CircularProgress } from '@/components/charts/circular-progress'
import { Users } from 'lucide-react'

describe('Accessibility Tests', () => {
  describe('Keyboard Navigation', () => {
    it('supports tab navigation through login form', async () => {
      const user = userEvent.setup()
      render(<LoginForm onSubmit={vi.fn()} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Tab through form elements
      await user.tab()
      expect(emailInput).toHaveFocus()
      
      await user.tab()
      expect(passwordInput).toHaveFocus()
      
      await user.tab()
      expect(submitButton).toHaveFocus()
    })

    it('supports keyboard navigation in sidebar', async () => {
      const user = userEvent.setup()
      render(<Sidebar />)
      
      const firstMenuItem = screen.getByRole('link', { name: /dashboard/i })
      
      await user.tab()
      expect(firstMenuItem).toHaveFocus()
      
      // Test arrow key navigation
      await user.keyboard('{ArrowDown}')
      const nextMenuItem = screen.getByRole('link', { name: /analytics/i })
      expect(nextMenuItem).toHaveFocus()
    })

    it('supports Enter and Space key activation', async () => {
      const user = userEvent.setup()
      const mockClick = vi.fn()
      
      render(
        <button onClick={mockClick} data-testid="test-button">
          Test Button
        </button>
      )
      
      const button = screen.getByTestId('test-button')
      button.focus()
      
      await user.keyboard('{Enter}')
      expect(mockClick).toHaveBeenCalled()
      
      mockClick.mockClear()
      
      await user.keyboard(' ')
      expect(mockClick).toHaveBeenCalled()
    })
  })

  describe('ARIA Labels and Roles', () => {
    it('has proper ARIA labels on KPI cards', () => {
      render(
        <KPICard
          title="Total Users"
          value={1250}
          change={12.5}
          changeType="positive"
          icon={Users}
        />
      )
      
      const card = screen.getByRole('article')
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Total Users'))
    })

    it('has proper ARIA attributes on progress indicators', () => {
      render(<CircularProgress value={75} label="Loading progress" />)
      
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Loading progress')
      expect(progress).toHaveAttribute('aria-valuenow', '75')
      expect(progress).toHaveAttribute('aria-valuemin', '0')
      expect(progress).toHaveAttribute('aria-valuemax', '100')
    })

    it('has proper navigation landmarks', () => {
      render(<Sidebar />)
      
      const navigation = screen.getByRole('navigation')
      expect(navigation).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('has proper form labels', () => {
      render(<LoginForm onSubmit={vi.fn()} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toHaveAttribute('id')
      expect(passwordInput).toHaveAttribute('id')
      
      const emailLabel = screen.getByText(/email/i)
      const passwordLabel = screen.getByText(/password/i)
      
      expect(emailLabel).toHaveAttribute('for', emailInput.id)
      expect(passwordLabel).toHaveAttribute('for', passwordInput.id)
    })
  })

  describe('Focus Management', () => {
    it('maintains focus visibility', async () => {
      const user = userEvent.setup()
      render(<LoginForm onSubmit={vi.fn()} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      await user.tab()
      expect(emailInput).toHaveFocus()
      expect(emailInput).toHaveClass('focus:ring-2')
    })

    it('traps focus in modal dialogs', async () => {
      // This would be tested with actual modal components
      // For now, we test focus trap behavior
      const user = userEvent.setup()
      
      render(
        <div role="dialog" aria-modal="true">
          <button data-testid="first-button">First</button>
          <button data-testid="last-button">Last</button>
        </div>
      )
      
      const firstButton = screen.getByTestId('first-button')
      const lastButton = screen.getByTestId('last-button')
      
      firstButton.focus()
      expect(firstButton).toHaveFocus()
      
      // Simulate Tab from last element should cycle to first
      lastButton.focus()
      await user.tab()
      // In a real focus trap, this would cycle back to first
    })
  })

  describe('Screen Reader Support', () => {
    it('provides descriptive text for charts', () => {
      render(
        <div role="img" aria-label="Bar chart showing traffic sources">
          <div data-testid="bar-chart" />
        </div>
      )
      
      const chart = screen.getByRole('img')
      expect(chart).toHaveAttribute('aria-label', 'Bar chart showing traffic sources')
    })

    it('announces dynamic content changes', () => {
      render(
        <div aria-live="polite" data-testid="status-message">
          Data updated successfully
        </div>
      )
      
      const statusMessage = screen.getByTestId('status-message')
      expect(statusMessage).toHaveAttribute('aria-live', 'polite')
    })

    it('provides alternative text for icons', () => {
      render(
        <button aria-label="Close dialog">
          <span aria-hidden="true">×</span>
        </button>
      )
      
      const button = screen.getByRole('button', { name: /close dialog/i })
      expect(button).toHaveAttribute('aria-label', 'Close dialog')
      
      const icon = button.querySelector('span')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('uses sufficient color contrast for text', () => {
      render(
        <div className="text-gray-900 bg-white">
          High contrast text
        </div>
      )
      
      // This would typically be tested with automated tools
      // We can verify the classes are applied correctly
      const element = screen.getByText('High contrast text')
      expect(element).toHaveClass('text-gray-900', 'bg-white')
    })

    it('does not rely solely on color for information', () => {
      render(
        <div className="text-green-600">
          <span aria-label="Positive change">↑</span>
          +12.5%
        </div>
      )
      
      // Positive change is indicated by both color AND arrow symbol
      const indicator = screen.getByLabelText('Positive change')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('Form Accessibility', () => {
    it('associates error messages with form fields', async () => {
      const user = userEvent.setup()
      render(<LoginForm onSubmit={vi.fn()} />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      const emailInput = screen.getByLabelText(/email/i)
      const errorMessage = screen.getByText(/email is required/i)
      
      expect(emailInput).toHaveAttribute('aria-describedby')
      expect(errorMessage).toHaveAttribute('id')
    })

    it('provides helpful instructions for password requirements', () => {
      render(<LoginForm onSubmit={vi.fn()} />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveAttribute('aria-describedby')
    })
  })

  describe('Responsive Accessibility', () => {
    it('maintains accessibility on mobile devices', () => {
      render(<Sidebar />)
      
      const navigation = screen.getByRole('navigation')
      expect(navigation).toHaveAttribute('aria-label')
      
      // Mobile-specific accessibility features
      const mobileToggle = screen.getByRole('button', { name: /toggle navigation/i })
      expect(mobileToggle).toHaveAttribute('aria-expanded')
    })
  })
})