'use client';

import React from 'react';
import { BarChart, CircularProgress, generateMockTrafficData, generateMockFinancialData } from './index';

export function ChartDemo() {
  const trafficData = generateMockTrafficData();
  const financialData = generateMockFinancialData();

  const barChartData = trafficData.map(item => ({
    name: item.source,
    value: item.visitors,
    color: item.color,
  }));

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Chart Components Demo</h2>
      </div>

      {/* Bar Chart Demo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <BarChart
          data={barChartData}
          title="Traffic Sources"
          height={300}
        />
      </div>

      {/* Circular Progress Demo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Circular Progress Examples</h3>
        <div className="flex flex-wrap gap-8">
          <CircularProgress
            value={75}
            size="md"
            label="Completion"
          />
          <CircularProgress
            value={45}
            size="lg"
            color="#10b981"
            label="Success Rate"
          />
          <CircularProgress
            value={90}
            size="sm"
            color="#f59e0b"
            label="Performance"
          />
        </div>
      </div>

      {/* Financial Metrics Demo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Financial Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {financialData.map((metric) => (
            <div key={metric.label} className="text-center">
              <CircularProgress
                value={Math.min((metric.value / 100000) * 100, 100)}
                size="md"
                label={metric.label}
                color={metric.changeType === 'positive' ? '#10b981' : '#ef4444'}
              />
              <div className="mt-2">
                <p className="text-sm font-medium">${metric.value.toLocaleString()}</p>
                <p className={`text-xs ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'positive' ? '+' : '-'}{metric.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}