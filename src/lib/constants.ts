// Application constants
export const APP_NAME = 'Modern Dashboard';
export const APP_DESCRIPTION = 'A modern, commercial-grade dashboard application';

// API endpoints (will be used when backend is implemented)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  DASHBOARD: {
    METRICS: '/api/dashboard/metrics',
    FINANCIAL: '/api/dashboard/financial',
    TRAFFIC: '/api/dashboard/traffic',
  },
} as const;

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  GRAY: '#6b7280',
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'dashboard-theme',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: 'BarChart3',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    href: '/commerce',
    icon: 'ShoppingCart',
  },
  {
    id: 'crm',
    label: 'CRM',
    href: '/crm',
    icon: 'Users',
  },
] as const;