import { DashboardMetrics, FinancialData, TrafficSource, ChartDataPoint, KPICardProps } from '@/types';
import { Users, DollarSign, Building2, UserCheck } from 'lucide-react';

// Mock dashboard metrics with realistic variations
export const mockDashboardMetrics: DashboardMetrics = {
  accounts: {
    current: 1250,
    previous: 1180,
    change: 5.9,
    changeType: 'positive',
  },
  expenses: {
    current: 45000,
    previous: 48000,
    change: -6.25,
    changeType: 'negative',
  },
  companyValue: {
    current: 2500000,
    previous: 2300000,
    change: 8.7,
    changeType: 'positive',
  },
  employees: {
    current: 156,
    previous: 152,
    change: 2.6,
    changeType: 'positive',
  },
};

// Generate dynamic mock data with time-based variations
export function generateDynamicMetrics(): DashboardMetrics {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Add some realistic variations based on time
  const timeMultiplier = 1 + (Math.sin(hour / 24 * Math.PI * 2) * 0.1);
  const dayMultiplier = day === 0 || day === 6 ? 0.7 : 1; // Weekend effect
  
  return {
    accounts: {
      current: Math.floor(1250 * timeMultiplier * dayMultiplier),
      previous: 1180,
      change: 5.9 + (Math.random() - 0.5) * 2,
      changeType: 'positive',
    },
    expenses: {
      current: Math.floor(45000 * timeMultiplier),
      previous: 48000,
      change: -6.25 + (Math.random() - 0.5) * 3,
      changeType: 'negative',
    },
    companyValue: {
      current: Math.floor(2500000 * (1 + (Math.random() - 0.5) * 0.05)),
      previous: 2300000,
      change: 8.7 + (Math.random() - 0.5) * 4,
      changeType: 'positive',
    },
    employees: {
      current: 156 + Math.floor(Math.random() * 5),
      previous: 152,
      change: 2.6 + (Math.random() - 0.5) * 1,
      changeType: 'positive',
    },
  };
}

// Mock financial data
export const mockFinancialData: FinancialData = {
  income: 125000,
  expenses: 45000,
  spendings: 32000,
  totals: 48000,
  incomeChange: 12.5,
  expensesChange: -8.2,
  spendingsChange: -5.1,
  totalsChange: 15.3,
};

// Generate dynamic financial data
export function generateDynamicFinancialData(): FinancialData {
  const baseIncome = 125000;
  const baseExpenses = 45000;
  const baseSpendings = 32000;
  
  const income = baseIncome + (Math.random() - 0.5) * 20000;
  const expenses = baseExpenses + (Math.random() - 0.5) * 10000;
  const spendings = baseSpendings + (Math.random() - 0.5) * 8000;
  const totals = income - expenses - spendings;
  
  return {
    income: Math.floor(income),
    expenses: Math.floor(expenses),
    spendings: Math.floor(spendings),
    totals: Math.floor(totals),
    incomeChange: 12.5 + (Math.random() - 0.5) * 10,
    expensesChange: -8.2 + (Math.random() - 0.5) * 6,
    spendingsChange: -5.1 + (Math.random() - 0.5) * 4,
    totalsChange: 15.3 + (Math.random() - 0.5) * 12,
  };
}

// Mock traffic sources
export const mockTrafficSources: TrafficSource[] = [
  { name: 'Organic Search', value: 45, color: '#3b82f6' },
  { name: 'Direct', value: 25, color: '#10b981' },
  { name: 'Social Media', value: 20, color: '#f59e0b' },
  { name: 'Email', value: 10, color: '#ef4444' },
];

// Generate dynamic traffic sources
export function generateDynamicTrafficSources(): TrafficSource[] {
  const sources = [
    { name: 'Organic Search', baseValue: 45, color: '#3b82f6' },
    { name: 'Direct', baseValue: 25, color: '#10b981' },
    { name: 'Social Media', baseValue: 20, color: '#f59e0b' },
    { name: 'Email', baseValue: 10, color: '#ef4444' },
    { name: 'Referral', baseValue: 8, color: '#8b5cf6' },
    { name: 'Paid Search', baseValue: 12, color: '#06b6d4' },
  ];
  
  return sources.map(source => ({
    ...source,
    value: Math.max(1, source.baseValue + (Math.random() - 0.5) * 10),
  }));
}

// Mock chart data for various visualizations
export const mockBarChartData: ChartDataPoint[] = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 33000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 36000 },
  { month: 'Jun', revenue: 67000, expenses: 42000 },
];

export const mockMonthlyData: ChartDataPoint[] = [
  { name: 'Jan', users: 4000, sessions: 2400, pageViews: 2400 },
  { name: 'Feb', users: 3000, sessions: 1398, pageViews: 2210 },
  { name: 'Mar', users: 2000, sessions: 9800, pageViews: 2290 },
  { name: 'Apr', users: 2780, sessions: 3908, pageViews: 2000 },
  { name: 'May', users: 1890, sessions: 4800, pageViews: 2181 },
  { name: 'Jun', users: 2390, sessions: 3800, pageViews: 2500 },
];

// Generate dynamic chart data
export function generateDynamicBarChartData(): ChartDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  return months.slice(0, currentMonth + 1).map((month, index) => ({
    month,
    revenue: 40000 + Math.random() * 30000 + index * 2000,
    expenses: 25000 + Math.random() * 15000 + index * 1000,
    profit: 15000 + Math.random() * 20000 + index * 1500,
  }));
}

export function generateDynamicMonthlyData(): ChartDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map((name, index) => ({
    name,
    users: 2000 + Math.random() * 3000 + index * 200,
    sessions: 1000 + Math.random() * 4000 + index * 300,
    pageViews: 1500 + Math.random() * 2000 + index * 150,
    conversions: 50 + Math.random() * 200 + index * 10,
  }));
}

// Mock user data
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
    role: 'admin' as const,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: undefined,
    role: 'user' as const,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
  },
];

// Mock KPI cards data with icons
export const mockKPICards: KPICardProps[] = [
  {
    title: 'Total Accounts',
    value: mockDashboardMetrics.accounts.current,
    change: mockDashboardMetrics.accounts.change,
    changeType: mockDashboardMetrics.accounts.changeType,
    icon: Users,
    subtitle: 'Active user accounts',
  },
  {
    title: 'Monthly Expenses',
    value: mockDashboardMetrics.expenses.current,
    change: mockDashboardMetrics.expenses.change,
    changeType: mockDashboardMetrics.expenses.changeType,
    icon: DollarSign,
    subtitle: 'Operating costs',
  },
  {
    title: 'Company Value',
    value: mockDashboardMetrics.companyValue.current,
    change: mockDashboardMetrics.companyValue.change,
    changeType: mockDashboardMetrics.companyValue.changeType,
    icon: Building2,
    subtitle: 'Market valuation',
  },
  {
    title: 'Employees',
    value: mockDashboardMetrics.employees.current,
    change: mockDashboardMetrics.employees.change,
    changeType: mockDashboardMetrics.employees.changeType,
    icon: UserCheck,
    subtitle: 'Team members',
  },
];

// Generate dynamic KPI cards
export function generateDynamicKPICards(): KPICardProps[] {
  const metrics = generateDynamicMetrics();
  
  return [
    {
      title: 'Total Accounts',
      value: metrics.accounts.current,
      change: metrics.accounts.change,
      changeType: metrics.accounts.changeType,
      icon: Users,
      subtitle: 'Active user accounts',
    },
    {
      title: 'Monthly Expenses',
      value: metrics.expenses.current,
      change: metrics.expenses.change,
      changeType: metrics.expenses.changeType,
      icon: DollarSign,
      subtitle: 'Operating costs',
    },
    {
      title: 'Company Value',
      value: metrics.companyValue.current,
      change: metrics.companyValue.change,
      changeType: metrics.companyValue.changeType,
      icon: Building2,
      subtitle: 'Market valuation',
    },
    {
      title: 'Employees',
      value: metrics.employees.current,
      change: metrics.employees.change,
      changeType: metrics.employees.changeType,
      icon: UserCheck,
      subtitle: 'Team members',
    },
  ];
}

// Additional comprehensive mock data
export const mockPerformanceMetrics = {
  overall: 75,
  sales: 85,
  marketing: 65,
  support: 92,
  development: 78,
};

export const mockRecentActivities = [
  { id: 1, action: 'New user registered', timestamp: new Date(Date.now() - 1000 * 60 * 5), type: 'user' },
  { id: 2, action: 'Payment processed', timestamp: new Date(Date.now() - 1000 * 60 * 15), type: 'payment' },
  { id: 3, action: 'Report generated', timestamp: new Date(Date.now() - 1000 * 60 * 30), type: 'system' },
  { id: 4, action: 'Data backup completed', timestamp: new Date(Date.now() - 1000 * 60 * 45), type: 'system' },
];

export const mockNotifications = [
  { id: 1, title: 'System Update', message: 'New features available', type: 'info', read: false },
  { id: 2, title: 'Payment Alert', message: 'Monthly payment due soon', type: 'warning', read: false },
  { id: 3, title: 'Backup Complete', message: 'Data backup finished successfully', type: 'success', read: true },
];

// Simulate API delay for realistic loading states
export const simulateApiDelay = (min: number = 500, max: number = 1500): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};