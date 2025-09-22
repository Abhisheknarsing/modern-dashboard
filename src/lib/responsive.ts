/**
 * Responsive utilities for mobile optimization
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if current screen size matches a breakpoint
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get responsive chart height based on screen size
 */
export function getResponsiveChartHeight(baseHeight: number): number {
  if (typeof window === 'undefined') return baseHeight;
  
  const width = window.innerWidth;
  
  if (width < breakpoints.sm) {
    return Math.max(baseHeight * 0.7, 150);
  } else if (width < breakpoints.md) {
    return Math.max(baseHeight * 0.8, 180);
  }
  
  return baseHeight;
}

/**
 * Get responsive grid columns based on screen size
 */
export function getResponsiveColumns(maxColumns: number): string {
  if (typeof window === 'undefined') return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${maxColumns}`;
  
  const width = window.innerWidth;
  
  if (width < breakpoints.sm) {
    return 'grid-cols-1';
  } else if (width < breakpoints.lg) {
    return 'grid-cols-2';
  }
  
  return `grid-cols-${maxColumns}`;
}

/**
 * Touch-friendly class names for interactive elements
 */
export const touchClasses = {
  button: 'touch-manipulation min-h-[44px] min-w-[44px]',
  link: 'touch-manipulation',
  interactive: 'touch-manipulation cursor-pointer',
} as const;

/**
 * Responsive spacing utilities
 */
export const responsiveSpacing = {
  section: 'space-y-4 sm:space-y-6',
  card: 'space-y-2 sm:space-y-4',
  grid: 'gap-3 sm:gap-4 md:gap-6',
  padding: 'p-3 sm:p-4 md:p-6',
  margin: 'm-3 sm:m-4 md:m-6',
} as const;

/**
 * Responsive text sizes
 */
export const responsiveText = {
  heading1: 'text-2xl sm:text-3xl lg:text-4xl',
  heading2: 'text-xl sm:text-2xl lg:text-3xl',
  heading3: 'text-lg sm:text-xl lg:text-2xl',
  body: 'text-sm sm:text-base',
  caption: 'text-xs sm:text-sm',
} as const;