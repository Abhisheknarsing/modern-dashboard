'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  backgroundColor?: string;
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  animate?: boolean;
}

const sizeConfig = {
  sm: { diameter: 50, fontSize: 'text-xs' },
  md: { diameter: 70, fontSize: 'text-sm' },
  lg: { diameter: 100, fontSize: 'text-base' },
  xl: { diameter: 140, fontSize: 'text-lg' },
};

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  strokeWidth = 8,
  label,
  showPercentage = true,
  className = '',
  animate = true,
}: CircularProgressProps) {
  const { diameter, fontSize } = sizeConfig[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className={cn(
        'relative inline-flex items-center justify-center group cursor-pointer transition-transform duration-200 hover:scale-105 touch-manipulation', 
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${Math.round(percentage)}%` : `${Math.round(percentage)}%`}
      tabIndex={0}
    >
      <svg
        width={diameter}
        height={diameter}
        className="transform -rotate-90 transition-all duration-200 group-hover:drop-shadow-lg max-w-full h-auto"
        viewBox={`0 0 ${diameter} ${diameter}`}
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={animate ? 'transition-all duration-1000 ease-out' : ''}
          style={{
            transformOrigin: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200 group-hover:scale-110">
        {showPercentage && (
          <span className={cn('font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary', fontSize)}>
            {Math.round(percentage)}%
          </span>
        )}
        {label && (
          <span className={cn('text-gray-600 text-center mt-1 transition-colors duration-200 group-hover:text-gray-800', 
            size === 'sm' ? 'text-xs' : 'text-xs'
          )}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// Preset color variants
export const CircularProgressVariants = {
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
} as const;

// Helper component with preset colors
export function CircularProgressSuccess(props: Omit<CircularProgressProps, 'color'>) {
  return <CircularProgress {...props} color={CircularProgressVariants.success} />;
}

export function CircularProgressWarning(props: Omit<CircularProgressProps, 'color'>) {
  return <CircularProgress {...props} color={CircularProgressVariants.warning} />;
}

export function CircularProgressDanger(props: Omit<CircularProgressProps, 'color'>) {
  return <CircularProgress {...props} color={CircularProgressVariants.danger} />;
}