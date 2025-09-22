'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export interface BarChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  title?: string;
  height?: number;
  xAxisKey?: string;
  yAxisKey?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const defaultColors = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
];

export function BarChart({
  data,
  title,
  height = 300,
  xAxisKey = 'name',
  yAxisKey = 'value',
  showGrid = true,
  showTooltip = true,
  className = '',
}: BarChartProps) {
  // Add default colors to data points that don't have them
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length],
  }));

  // Responsive height based on screen size
  const responsiveHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? Math.max(height * 0.8, 200) : height;

  return (
    <div className={`w-full group touch-manipulation ${className}`}>
      {title && (
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4 group-hover:text-primary transition-colors duration-200">{title}</h3>
      )}
      <div className="transition-all duration-300 hover:scale-[1.01] overflow-hidden">
        <ResponsiveContainer width="100%" height={responsiveHeight}>
        <RechartsBarChart
          data={dataWithColors}
          margin={{
            top: 10,
            right: 15,
            left: 10,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          )}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            width={40}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: '500',
                maxWidth: '200px',
              }}
              cursor={{ 
                fill: 'rgba(59, 130, 246, 0.1)',
                stroke: 'rgba(59, 130, 246, 0.3)',
                strokeWidth: 1,
                strokeDasharray: '5 5'
              }}
              animationDuration={200}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()}`,
                name === 'value' ? 'Value' : name
              ]}
              labelFormatter={(label: string) => `Source: ${label}`}
              allowEscapeViewBox={{ x: true, y: true }}
            />
          )}
          <Bar 
            dataKey={yAxisKey} 
            radius={[4, 4, 0, 0]}
            className="transition-all duration-200"
          >
            {dataWithColors.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}