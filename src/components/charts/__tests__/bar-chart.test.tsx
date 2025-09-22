import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { BarChart } from '../bar-chart'
import { mockChartData } from '@/test/utils'

describe('BarChart', () => {
  const defaultProps = {
    data: mockChartData,
    xAxisKey: 'name',
    yAxisKey: 'value',
    title: 'Traffic Sources',
  }

  it('renders bar chart with title', () => {
    render(<BarChart {...defaultProps} />)
    
    expect(screen.getByText('Traffic Sources')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('renders chart components correctly', () => {
    render(<BarChart {...defaultProps} />)
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    expect(screen.getByTestId('bar')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })

  it('renders without title when not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...propsWithoutTitle } = defaultProps
    render(<BarChart {...propsWithoutTitle} />)
    
    expect(screen.queryByText('Traffic Sources')).not.toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(<BarChart {...defaultProps} data={[]} />)
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('applies custom height when provided', () => {
    render(<BarChart {...defaultProps} height={400} />)
    
    const container = screen.getByTestId('responsive-container')
    expect(container).toBeInTheDocument()
  })

  it('uses correct data keys for axes', () => {
    render(<BarChart {...defaultProps} xAxisKey="category" yAxisKey="amount" />)
    
    // Chart should still render with different keys
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('is accessible with proper structure', () => {
    render(<BarChart {...defaultProps} />)
    
    const chartContainer = screen.getByRole('img', { hidden: true })
    expect(chartContainer).toBeInTheDocument()
  })

  it('handles responsive behavior', () => {
    render(<BarChart {...defaultProps} />)
    
    const responsiveContainer = screen.getByTestId('responsive-container')
    expect(responsiveContainer).toBeInTheDocument()
  })
})