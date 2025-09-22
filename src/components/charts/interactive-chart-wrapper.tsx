'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InteractiveChartWrapperProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
  isLoading?: boolean;
}

export function InteractiveChartWrapper({
  title,
  children,
  className,
  description,
  isLoading = false,
}: InteractiveChartWrapperProps) {
  return (
    <Card className={cn(
      'group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/20',
      className
    )}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {description}
            </p>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(
        'transition-all duration-300',
        isLoading && 'opacity-50'
      )}>
        <div className="relative">
          {children}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced chart container with hover effects
export function ChartContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]',
      className
    )}>
      {children}
    </div>
  );
}