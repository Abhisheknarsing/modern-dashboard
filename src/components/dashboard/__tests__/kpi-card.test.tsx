import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { KPICard } from '../kpi-card'
import { Users } from 'lucide-react'

describe('KPICard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 1250000,
    change: 12.5,
    changeType: 'positive' as const,
    icon: Users,
  }

  it('renders KPI card with all elements', () => {
    render(<KPICard {...defaultProps} />)
    
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('1.25M')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
  })

  it('displays positive change with green color', () => {
    render(<KPICard {...defaultProps} changeType="positive" change={15.2} />)
    
    const changeElement = screen.getByText('+15.2%')
    expect(changeElement).toHaveClass('text-green-600')
  })

  it('displays negative change with red color', () => {
    render(<KPICard {...defaultProps} changeType="negative" change={-8.5} />)
    
    const changeElement = screen.getByText('-8.5%')
    expect(changeElement).toHaveClass('text-red-600')
  })

  it('displays neutral change with gray color', () => {
    render(<KPICard {...defaultProps} changeType="neutral" change={0} />)
    
    const changeElement = screen.getByText('0.0%')
    expect(changeElement).toHaveClass('text-gray-600')
  })

  it('renders icon correctly', () => {
    render(<KPICard {...defaultProps} />)
    
    // Check if icon container is present
    const iconContainer = screen.getByTestId('kpi-icon')
    expect(iconContainer).toBeInTheDocument()
  })

  it('formats large numbers correctly', () => {
    render(<KPICard {...defaultProps} value={2800000} />)
    
    expect(screen.getByText('2.8M')).toBeInTheDocument()
  })

  it('formats small numbers without suffix', () => {
    render(<KPICard {...defaultProps} value={156} />)
    
    expect(screen.getByText('156')).toBeInTheDocument()
  })

  it('displays subtitle when provided', () => {
    render(<KPICard {...defaultProps} subtitle="Active this month" />)
    
    expect(screen.getByText('Active this month')).toBeInTheDocument()
  })

  it('handles string values', () => {
    render(<KPICard {...defaultProps} value="$1.25M" />)
    
    expect(screen.getByText('$1.25M')).toBeInTheDocument()
  })

  it('applies correct hover effects', () => {
    render(<KPICard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveClass('hover:shadow-lg')
  })

  it('is accessible with proper ARIA labels', () => {
    render(<KPICard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('Total Users'))
  })

  it('supports keyboard navigation', () => {
    render(<KPICard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('tabIndex', '0')
  })
})