import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Number formatting utilities
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    const millions = value / 1000000;
    // Remove trailing zeros after decimal point
    return `${parseFloat(millions.toFixed(2))}M`;
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    // Remove trailing zeros after decimal point
    return `${parseFloat(thousands.toFixed(1))}K`;
  }
  return value.toString();
}

export function formatCurrency(value: number, currency = 'USD'): string {
  // For large numbers, use K/M suffixes
  if (Math.abs(value) >= 1000000) {
    const millions = value / 1000000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(millions) + 'M';
  }
  
  if (Math.abs(value) >= 1000) {
    const thousands = value / 1000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(thousands) + 'K';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatPercentage(value: number, decimals = 1, includeSign = false): string {
  const formatted = value.toFixed(decimals);
  if (includeSign && value > 0) {
    return `+${formatted}%`;
  }
  return `${formatted}%`;
}

// Date formatting utilities
export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'relative':
      return getRelativeTime(dateObj);
    default:
      return dateObj.toLocaleDateString('en-US');
  }
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US');
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Chart data utilities
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function getChangeType(change: number): 'positive' | 'negative' | 'neutral' {
  if (change > 0) return 'positive';
  if (change < 0) return 'negative';
  return 'neutral';
}
