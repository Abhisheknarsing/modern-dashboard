import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, formatNumber, formatPercentage } from '@/lib/utils';
import { KPICardProps } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  subtitle,
  className,
  ...props
}: KPICardProps & { className?: string }) {
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  const formattedChange = formatPercentage(change, 1, true);
  
  const changeColorClass = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  }[changeType];

  const TrendIcon = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: Minus,
  }[changeType];

  return (
    <Card 
      className={cn(
        'group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/20',
        className
      )} 
      role="article"
      aria-label={`${title}: ${formattedValue}, ${changeType === 'positive' ? 'increased' : changeType === 'negative' ? 'decreased' : 'unchanged'} by ${formattedChange}`}
      tabIndex={0}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 truncate">
          {title}
        </div>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-200 flex-shrink-0" data-testid="kpi-icon" />
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-200 break-all">{formattedValue}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 truncate">{subtitle}</div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-1">
            <div
              className={cn(
                'flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 group-hover:scale-105 w-fit',
                changeColorClass.split(' ')[1] // Get background color class
              )}
            >
              <TrendIcon className={cn("h-2 w-2 sm:h-3 sm:w-3 transition-transform duration-200 group-hover:scale-110", changeColorClass.split(' ')[0])} />
              <span className={changeColorClass.split(' ')[0]}>{formattedChange}</span>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              from last period
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}