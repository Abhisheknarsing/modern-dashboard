import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { FinancialCard } from '../financial-card'
import { DollarSign } from 'lucide-react'

describe('FinancialCard', () => {
  const defaultProps = {
    title: 'Income',
    value: 125000,
    change: 12.5,
    icon: DollarSign,
  }

  it('renders financial card with all elements', () => {
    render(<FinancialCard {...defaultProps} />)
    
    expect(screen.getByText('Income')).toBeInTheDocument()
    expect(screen.getByText('$125K')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
  })

  it('displays positive change with up arrow and green color', () => {
    render(<FinancialCard {...defaultProps} changeType="positive" />)
    
    const changeElement = screen.getByText('+12.5%')
    expect(changeElement).toHaveClass('text-green-600')
    
    // Check for up arrow icon
    const arrowIcon = screen.getByTestId('trend-up-icon')
    expect(arrowIcon).toBeInTheDocument()
  })

  it('displays negative change with down arrow and red color', () => {
    render(<FinancialCard {...defaultProps} changeType="negative" change={-8.2} />)
    
    const changeElement = screen.getByText('-8.2%')
    expect(changeElement).toHaveClass('text-red-600')
    
    // Check for down arrow icon
    const arrowIcon = screen.getByTestId('trend-down-icon')
    expect(arrowIcon).toBeInTheDocument()
  })

  it('displays neutral change with minus icon and gray color', () => {
    render(<FinancialCard {...defaultProps} changeType="neutral" change={0} />)
    
    const changeElement = screen.getByText('0.0%')
    expect(changeElement).toHaveClass('text-gray-600')
    
    // Check for minus icon
    const minusIcon = screen.getByTestId('minus-icon')
    expect(minusIcon).toBeInTheDocument()
  })

  it('formats currency amounts correctly', () => {
    const testCases = [
      { amount: 1500, expected: '$1.5K' },
      { amount: 125000, expected: '$125K' },
      { amount: 1250000, expected: '$1.25M' },
      { amount: 999, expected: '$999' },
    ]
    
    testCases.forEach(({ amount, expected }) => {
      const { rerender } = render(<FinancialCard {...defaultProps} amount={amount} />)
      expect(screen.getByText(expected)).toBeInTheDocument()
      rerender(<div />)
    })
  })

  it('handles zero amounts', () => {
    render(<FinancialCard {...defaultProps} amount={0} />)
    
    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  it('handles negative amounts', () => {
    render(<FinancialCard {...defaultProps} amount={-5000} />)
    
    expect(screen.getByText('-$5K')).toBeInTheDocument()
  })

  it('applies correct styling for different card types', () => {
    render(<FinancialCard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm')
  })

  it('is accessible with proper structure', () => {
    render(<FinancialCard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toBeInTheDocument()
    
    // Check for proper heading structure
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('Income')
  })

  it('supports hover interactions', () => {
    render(<FinancialCard {...defaultProps} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveClass('hover:shadow-md')
  })
})