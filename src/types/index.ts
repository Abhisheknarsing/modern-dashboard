// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Dashboard metrics types
export interface KPIMetric {
  current: number;
  previous: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface DashboardMetrics {
  accounts: KPIMetric;
  expenses: KPIMetric;
  companyValue: KPIMetric;
  employees: KPIMetric;
}

export interface FinancialData {
  income: number;
  expenses: number;
  spendings: number;
  totals: number;
  incomeChange: number;
  expensesChange: number;
  spendingsChange: number;
  totalsChange: number;
}

// Chart data types
export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

// Component prop types
export interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  subtitle?: string;
}

export interface BarChartProps {
  data: ChartDataPoint[];
  xAxisKey: string;
  yAxisKey: string;
  title?: string;
  height?: number;
}

export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}

// Navigation types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  href: string;
  children?: MenuItem[];
}

export interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  menuItems: MenuItem[];
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

// Form types
export interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  isLoading?: boolean;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading?: boolean;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}