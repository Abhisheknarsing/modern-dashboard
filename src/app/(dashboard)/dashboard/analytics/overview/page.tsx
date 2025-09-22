"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Eye,
  Clock,
  Target,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

const metrics: MetricCard[] = [
  {
    title: "Total Visitors",
    value: "45,231",
    change: "+12.5%",
    changeType: "positive",
    icon: Users
  },
  {
    title: "Page Views",
    value: "123,456",
    change: "+8.2%",
    changeType: "positive",
    icon: Eye
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: "-2.1%",
    changeType: "negative",
    icon: Clock
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    changeType: "positive",
    icon: Target
  },
  {
    title: "Revenue",
    value: "$54,239",
    change: "+15.3%",
    changeType: "positive",
    icon: DollarSign
  },
  {
    title: "Orders",
    value: "1,429",
    change: "+9.7%",
    changeType: "positive",
    icon: ShoppingCart
  }
];

const topPages = [
  { page: "/", views: 12543, bounce: "42.1%" },
  { page: "/products", views: 8932, bounce: "38.5%" },
  { page: "/about", views: 5421, bounce: "55.2%" },
  { page: "/contact", views: 3210, bounce: "48.7%" },
  { page: "/blog", views: 2876, bounce: "35.9%" }
];

const trafficSources = [
  { source: "Organic Search", visitors: 18543, percentage: 41.0 },
  { source: "Direct", visitors: 12876, percentage: 28.5 },
  { source: "Social Media", visitors: 7654, percentage: 16.9 },
  { source: "Referral", visitors: 4321, percentage: 9.6 },
  { source: "Email", visitors: 1837, percentage: 4.0 }
];

export default function AnalyticsOverviewPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive view of your website performance and user behavior.
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{page.page}</p>
                    <p className="text-xs text-muted-foreground">
                      {page.views.toLocaleString()} views
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.bounce}</p>
                    <p className="text-xs text-muted-foreground">bounce rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {source.visitors.toLocaleString()} visitors
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">↗ 12.5%</div>
              <p className="text-sm text-muted-foreground">Traffic Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">↗ 8.2%</div>
              <p className="text-sm text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">↗ 15.3%</div>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">↗ 3.2%</div>
              <p className="text-sm text-muted-foreground">Conversion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}