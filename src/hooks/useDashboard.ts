// This hook is now deprecated in favor of the DashboardProvider context
// Import useDashboard from '@/components/providers' instead

import { useDashboard as useDashboardContext } from '@/components/providers/dashboard-provider';

/**
 * @deprecated Use useDashboard from '@/components/providers' instead
 * This hook is kept for backward compatibility but will be removed in future versions
 */
export function useDashboard() {
  console.warn('useDashboard from hooks is deprecated. Use useDashboard from @/components/providers instead');
  return useDashboardContext();
}