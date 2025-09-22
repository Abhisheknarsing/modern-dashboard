import { BarChartDataPoint } from '@/components/charts/bar-chart';

// Types for chart data transformation
export interface RawDataPoint {
  [key: string]: string | number | Date;
}

export interface ChartDataTransformOptions {
  xKey: string;
  yKey: string;
  colorKey?: string;
  sortBy?: 'asc' | 'desc' | 'none';
  limit?: number;
}

export interface TrafficSourceData {
  source: string;
  visitors: number;
  percentage: number;
  color?: string;
}

export interface FinancialMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

// Default color palette for charts
export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  pink: '#ec4899',
  indigo: '#6366f1',
} as const;

export const CHART_COLOR_ARRAY = Object.values(CHART_COLORS);

/**
 * Transform raw data into format suitable for bar charts
 */
export function transformToBarChartData(
  data: RawDataPoint[],
  options: ChartDataTransformOptions
): BarChartDataPoint[] {
  const { xKey, yKey, colorKey, sortBy = 'none', limit } = options;

  let transformed = data.map((item, index) => ({
    name: String(item[xKey]),
    value: Number(item[yKey]) || 0,
    color: colorKey && item[colorKey] 
      ? String(item[colorKey]) 
      : CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length],
  }));

  // Sort data if requested
  if (sortBy === 'asc') {
    transformed.sort((a, b) => a.value - b.value);
  } else if (sortBy === 'desc') {
    transformed.sort((a, b) => b.value - a.value);
  }

  // Limit results if requested
  if (limit && limit > 0) {
    transformed = transformed.slice(0, limit);
  }

  return transformed;
}

/**
 * Transform traffic source data for visualization
 */
export function transformTrafficSourceData(
  data: TrafficSourceData[]
): BarChartDataPoint[] {
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  
  return data.map((item, index) => ({
    name: item.source,
    value: item.visitors,
    percentage: totalVisitors > 0 ? (item.visitors / totalVisitors) * 100 : 0,
    color: item.color || CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length],
  }));
}

/**
 * Calculate percentage for circular progress charts
 */
export function calculatePercentage(
  current: number,
  target: number,
  options: { min?: number; max?: number } = {}
): number {
  const { min = 0, max = 100 } = options;
  
  if (target === 0) return 0;
  
  const percentage = (current / target) * 100;
  return Math.min(Math.max(percentage, min), max);
}

/**
 * Format numbers for chart display
 */
export function formatChartNumber(
  value: number,
  options: {
    decimals?: number;
    suffix?: string;
    prefix?: string;
    compact?: boolean;
  } = {}
): string {
  const { decimals = 0, suffix = '', prefix = '', compact = false } = options;

  if (compact) {
    return formatCompactNumber(value, decimals) + suffix;
  }

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return prefix + formatted + suffix;
}

/**
 * Format numbers in compact form (1K, 1M, etc.)
 */
export function formatCompactNumber(value: number, decimals: number = 1): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e9) {
    return sign + (absValue / 1e9).toFixed(decimals) + 'B';
  } else if (absValue >= 1e6) {
    return sign + (absValue / 1e6).toFixed(decimals) + 'M';
  } else if (absValue >= 1e3) {
    return sign + (absValue / 1e3).toFixed(decimals) + 'K';
  }

  return sign + absValue.toFixed(decimals);
}

/**
 * Calculate change percentage between two values
 */
export function calculateChangePercentage(
  current: number,
  previous: number
): { change: number; changeType: 'positive' | 'negative' | 'neutral' } {
  if (previous === 0) {
    return {
      change: current > 0 ? 100 : 0,
      changeType: current > 0 ? 'positive' : 'neutral',
    };
  }

  const change = ((current - previous) / Math.abs(previous)) * 100;
  
  return {
    change: Math.abs(change),
    changeType: change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral',
  };
}

/**
 * Generate mock traffic source data
 */
export function generateMockTrafficData(): TrafficSourceData[] {
  return [
    { source: 'Organic Search', visitors: 12543, percentage: 45.2, color: CHART_COLORS.primary },
    { source: 'Direct', visitors: 8932, percentage: 32.1, color: CHART_COLORS.success },
    { source: 'Social Media', visitors: 4321, percentage: 15.5, color: CHART_COLORS.warning },
    { source: 'Email', visitors: 1876, percentage: 6.7, color: CHART_COLORS.purple },
    { source: 'Referral', visitors: 432, percentage: 1.6, color: CHART_COLORS.cyan },
  ];
}

/**
 * Generate mock financial metrics data
 */
export function generateMockFinancialData(): FinancialMetric[] {
  return [
    {
      label: 'Income',
      value: 45230,
      change: 12.5,
      changeType: 'positive',
    },
    {
      label: 'Expenses',
      value: 23450,
      change: 8.2,
      changeType: 'negative',
    },
    {
      label: 'Spendings',
      value: 12340,
      change: 5.1,
      changeType: 'negative',
    },
    {
      label: 'Totals',
      value: 67890,
      change: 15.3,
      changeType: 'positive',
    },
  ];
}

/**
 * Utility to create chart-ready data from any object array
 */
export function createChartData<T extends Record<string, unknown>>(
  data: T[],
  xField: keyof T,
  yField: keyof T,
  options: {
    colors?: string[];
    transform?: (item: T) => Partial<BarChartDataPoint>;
  } = {}
): BarChartDataPoint[] {
  const { colors = CHART_COLOR_ARRAY, transform } = options;

  return data.map((item, index) => {
    const baseData: BarChartDataPoint = {
      name: String(item[xField]),
      value: Number(item[yField]) || 0,
      color: colors[index % colors.length],
    };

    if (transform) {
      return { ...baseData, ...transform(item) };
    }

    return baseData;
  });
}