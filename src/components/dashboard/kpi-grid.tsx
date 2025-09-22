import React from 'react';
import { KPICard } from './kpi-card';
import { KPICardProps } from '@/types';
import { cn } from '@/lib/utils';

interface KPIGridProps {
  kpis: KPICardProps[];
  className?: string;
}

export function KPIGrid({ kpis, className }: KPIGridProps) {
  return (
    <div
      className={cn(
        'grid gap-3 sm:gap-4 md:gap-6',
        'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
        className
      )}
    >
      {kpis.map((kpi, index) => (
        <KPICard
          key={`${kpi.title}-${index}`}
          {...kpi}
          className="w-full"
        />
      ))}
    </div>
  );
}