"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar, 
  Filter,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Users
} from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  name: string;
  type: 'traffic' | 'conversion' | 'revenue' | 'user';
  status: 'completed' | 'processing' | 'scheduled';
  createdAt: string;
  size: string;
  icon: React.ComponentType<{ className?: string }>;
}

const reports: Report[] = [
  {
    id: "1",
    name: "Monthly Traffic Report",
    type: "traffic",
    status: "completed",
    createdAt: "2024-01-15",
    size: "2.4 MB",
    icon: BarChart3
  },
  {
    id: "2", 
    name: "Conversion Analysis",
    type: "conversion",
    status: "completed",
    createdAt: "2024-01-14",
    size: "1.8 MB",
    icon: TrendingUp
  },
  {
    id: "3",
    name: "Revenue Breakdown",
    type: "revenue", 
    status: "processing",
    createdAt: "2024-01-13",
    size: "3.1 MB",
    icon: PieChart
  },
  {
    id: "4",
    name: "User Behavior Report",
    type: "user",
    status: "completed", 
    createdAt: "2024-01-12",
    size: "4.2 MB",
    icon: Users
  },
  {
    id: "5",
    name: "Weekly Performance",
    type: "traffic",
    status: "scheduled",
    createdAt: "2024-01-16",
    size: "1.5 MB",
    icon: BarChart3
  }
];

const quickStats = [
  { label: "Total Reports", value: "24", change: "+3" },
  { label: "This Month", value: "8", change: "+2" },
  { label: "Scheduled", value: "5", change: "+1" },
  { label: "Processing", value: "2", change: "0" }
];

export default function AnalyticsReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredReports = selectedType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'scheduled': return 'outline';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'traffic': return 'bg-blue-100 text-blue-800';
      case 'conversion': return 'bg-green-100 text-green-800';
      case 'revenue': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Reports</h1>
          <p className="text-muted-foreground">
            Generate, view, and download detailed analytics reports.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reports</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Types</option>
                <option value="traffic">Traffic</option>
                <option value="conversion">Conversion</option>
                <option value="revenue">Revenue</option>
                <option value="user">User Behavior</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-accent rounded-lg">
                    <report.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{report.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <Badge variant={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  {report.status === 'completed' && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Traffic Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Conversion Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <PieChart className="h-6 w-6" />
              <span className="text-sm">Revenue Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">User Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}