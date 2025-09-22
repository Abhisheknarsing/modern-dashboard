import React from 'react';
import { FinancialCard } from './financial-card';
import { FinancialData } from '@/types';
import { DollarSign, TrendingDown, CreditCard, PiggyBank } from 'lucide-react';

export interface FinancialGridProps {
  data: FinancialData;
  className?: string;
}

export function FinancialGrid({ data, className }: FinancialGridProps) {
  const financialCards = [
    {
      title: 'Income',
      value: data.income,
      change: data.incomeChange,
      icon: DollarSign,
    },
    {
      title: 'Expenses',
      value: data.expenses,
      change: data.expensesChange,
      icon: TrendingDown,
    },
    {
      title: 'Spendings',
      value: data.spendings,
      change: data.spendingsChange,
      icon: CreditCard,
    },
    {
      title: 'Totals',
      value: data.totals,
      change: data.totalsChange,
      icon: PiggyBank,
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 ${className || ''}`}>
      {financialCards.map((card) => (
        <FinancialCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
        />
      ))}
    </div>
  );
}