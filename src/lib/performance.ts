// Performance monitoring utilities
import React from 'react';

export interface PerformanceMetrics {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.recordMetric('page-load', entry.duration, entry.startTime);
          }
        });
      });
      
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.recordMetric('lcp', lastEntry.startTime, 0);
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Observe first input delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any; // Type assertion for FID entry
          if (fidEntry.processingStart) {
            this.recordMetric('fid', fidEntry.processingStart - entry.startTime, entry.startTime);
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }
  }

  startTiming(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordMetric(name, duration, startTime);
    };
  }

  recordMetric(name: string, duration: number, startTime: number) {
    const metric: PerformanceMetrics = {
      name,
      duration,
      startTime,
      endTime: startTime + duration,
    };
    
    this.metrics.set(name, metric);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
  }

  getMetric(name: string): PerformanceMetrics | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): PerformanceMetrics[] {
    return Array.from(this.metrics.values());
  }

  getWebVitals() {
    return {
      lcp: this.getMetric('lcp'),
      fid: this.getMetric('fid'),
      cls: this.getCLS(),
    };
  }

  private getCLS(): PerformanceMetrics | undefined {
    if (typeof window === 'undefined') return undefined;
    
    // Simplified CLS calculation
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: any[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += (entry as any).value;
            sessionEntries.push(entry);
          } else {
            sessionValue = (entry as any).value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
          }
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    
    return {
      name: 'cls',
      duration: clsValue,
      startTime: 0,
      endTime: 0,
    };
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    startTiming: performanceMonitor.startTiming.bind(performanceMonitor),
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    getMetric: performanceMonitor.getMetric.bind(performanceMonitor),
    getAllMetrics: performanceMonitor.getAllMetrics.bind(performanceMonitor),
    getWebVitals: performanceMonitor.getWebVitals.bind(performanceMonitor),
  };
}

// HOC for component performance monitoring
export function withPerformanceMonitor<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: T) {
    const endTiming = performanceMonitor.startTiming(`component-${componentName}`);
    
    React.useEffect(() => {
      return () => {
        endTiming();
      };
    }, [endTiming]);

    return React.createElement(Component, props);
  };
}

// Utility for measuring async operations
export async function measureAsync<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const endTiming = performanceMonitor.startTiming(name);
  try {
    const result = await operation();
    return result;
  } finally {
    endTiming();
  }
}