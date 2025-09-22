import { KPIMetric, DashboardMetrics } from '@/types';
import { calculatePercentageChange, getChangeType } from './utils';

/**
 * Creates a KPI metric object with calculated change and change type
 */
export function createKPIMetric(current: number, previous: number): KPIMetric {
  const change = calculatePercentageChange(current, previous);
  const changeType = getChangeType(change);

  return {
    current,
    previous,
    change,
    changeType,
  };
}

/**
 * Formats a KPI value for display with appropriate suffixes
 */
export function formatKPIValue(value: number, type: 'currency' | 'number' | 'percentage' = 'number'): string {
  switch (type) {
    case 'currency':
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
      }
      return `$${value.toLocaleString()}`;

    case 'percentage':
      return `${value.toFixed(1)}%`;

    case 'number':
    default:
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toLocaleString();
  }
}

/**
 * Calculates growth rate between two periods
 */
export function calculateGrowthRate(current: number, previous: number): {
  rate: number;
  isGrowth: boolean;
  formatted: string;
} {
  const rate = calculatePercentageChange(current, previous);
  const isGrowth = rate > 0;
  const formatted = `${isGrowth ? '+' : ''}${rate.toFixed(1)}%`;

  return { rate, isGrowth, formatted };
}

/**
 * Determines the color scheme for a metric based on its context
 */
export function getMetricColorScheme(
  changeType: 'positive' | 'negative' | 'neutral',
  metricType: 'revenue' | 'cost' | 'neutral' = 'neutral'
): {
  textColor: string;
  bgColor: string;
  borderColor: string;
} {
  // For cost metrics, negative change is good (lower costs)
  // For revenue metrics, positive change is good (higher revenue)
  const isGoodChange = metricType === 'cost'
    ? changeType === 'negative'
    : changeType === 'positive';

  if (changeType === 'neutral') {
    return {
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    };
  }

  if (isGoodChange) {
    return {
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    };
  }

  return {
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  };
}

/**
 * Creates mock dashboard metrics for development/demo purposes
 */
export function createMockDashboardMetrics(): DashboardMetrics {
  return {
    accounts: createKPIMetric(2420, 2240),
    expenses: createKPIMetric(1250000, 1180000),
    companyValue: createKPIMetric(45600000, 42300000),
    employees: createKPIMetric(156, 148),
  };
}

/**
 * Validates metric data and provides fallbacks
 */
export function validateMetric(metric: Partial<KPIMetric>): KPIMetric {
  return {
    current: metric.current ?? 0,
    previous: metric.previous ?? 0,
    change: metric.change ?? 0,
    changeType: metric.changeType ?? 'neutral',
  };
}

/**
 * Aggregates multiple metrics into summary statistics
 */
export function aggregateMetrics(metrics: KPIMetric[]): {
  totalCurrent: number;
  totalPrevious: number;
  averageChange: number;
  positiveChanges: number;
  negativeChanges: number;
} {
  const totalCurrent = metrics.reduce((sum, metric) => sum + metric.current, 0);
  const totalPrevious = metrics.reduce((sum, metric) => sum + metric.previous, 0);
  const averageChange = metrics.reduce((sum, metric) => sum + metric.change, 0) / metrics.length;
  const positiveChanges = metrics.filter(metric => metric.changeType === 'positive').length;
  const negativeChanges = metrics.filter(metric => metric.changeType === 'negative').length;

  return {
    totalCurrent,
    totalPrevious,
    averageChange,
    positiveChanges,
    negativeChanges,
  };
}