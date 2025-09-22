"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts";

const analyticsData = [
  { name: 'Jan', pageViews: 12000, uniqueVisitors: 8000 },
  { name: 'Feb', pageViews: 15000, uniqueVisitors: 9500 },
  { name: 'Mar', pageViews: 18000, uniqueVisitors: 11000 },
  { name: 'Apr', pageViews: 22000, uniqueVisitors: 13500 },
  { name: 'May', pageViews: 25000, uniqueVisitors: 15000 },
  { name: 'Jun', pageViews: 28000, uniqueVisitors: 16800 },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Page Views Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={analyticsData.map(item => ({
              name: item.name,
              value: item.pageViews,
            }))}
            xAxisKey="name"
            yAxisKey="value"
            height={200}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unique Visitors Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={analyticsData.map(item => ({
              name: item.name,
              value: item.uniqueVisitors,
            }))}
            xAxisKey="name"
            yAxisKey="value"
            height={200}
          />
        </CardContent>
      </Card>
    </div>
  );
}