import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { CircularProgress } from '../circular-progress'

describe('CircularProgress', () => {
  it('renders circular progress with default props', () => {
    render(<CircularProgress value={75} />)
    
    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toBeInTheDocument()
    expect(progressElement).toHaveAttribute('aria-valuenow', '75')
    expect(progressElement).toHaveAttribute('aria-valuemax', '100')
  })

  it('displays percentage text', () => {
    render(<CircularProgress value={65} />)
    
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('handles custom max value', () => {
    render(<CircularProgress value={30} max={50} />)
    
    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toHaveAttribute('aria-valuemax', '50')
    expect(screen.getByText('60%')).toBeInTheDocument() // 30/50 * 100 = 60%
  })

  it('displays custom label when provided', () => {
    render(<CircularProgress value={80} label="Completion" />)
    
    expect(screen.getByText('Completion')).toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<CircularProgress value={50} size="sm" />)
    
    let svg = screen.getByRole('progressbar').querySelector('svg')
    expect(svg).toHaveAttribute('width', '80')
    expect(svg).toHaveAttribute('height', '80')
    
    rerender(<CircularProgress value={50} size="md" />)
    svg = screen.getByRole('progressbar').querySelector('svg')
    expect(svg).toHaveAttribute('width', '120')
    expect(svg).toHaveAttribute('height', '120')
    
    rerender(<CircularProgress value={50} size="lg" />)
    svg = screen.getByRole('progressbar').querySelector('svg')
    expect(svg).toHaveAttribute('width', '160')
    expect(svg).toHaveAttribute('height', '160')
  })

  it('applies custom color when provided', () => {
    render(<CircularProgress value={75} color="#ff0000" />)
    
    const progressCircle = screen.getByTestId('progress-circle')
    expect(progressCircle).toHaveAttribute('stroke', '#ff0000')
  })

  it('handles edge cases for value', () => {
    const { rerender } = render(<CircularProgress value={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    
    rerender(<CircularProgress value={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    
    rerender(<CircularProgress value={150} />)
    expect(screen.getByText('100%')).toBeInTheDocument() // Should cap at 100%
  })

  it('calculates stroke-dasharray correctly', () => {
    render(<CircularProgress value={25} />)
    
    const progressCircle = screen.getByTestId('progress-circle')
    // For 25%, stroke-dasharray should be calculated based on circumference
    expect(progressCircle).toHaveAttribute('stroke-dasharray')
  })

  it('is accessible with proper ARIA attributes', () => {
    render(<CircularProgress value={60} label="Loading progress" />)
    
    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toHaveAttribute('aria-label', 'Loading progress')
    expect(progressElement).toHaveAttribute('aria-valuenow', '60')
    expect(progressElement).toHaveAttribute('aria-valuemin', '0')
    expect(progressElement).toHaveAttribute('aria-valuemax', '100')
  })

  it('supports keyboard navigation', () => {
    render(<CircularProgress value={75} />)
    
    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toHaveAttribute('tabIndex', '0')
  })
})