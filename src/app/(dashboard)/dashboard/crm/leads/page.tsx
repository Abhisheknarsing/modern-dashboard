"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Lead } from "@/types";
import { 
  Plus, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Mail,
  Phone,
  Building,
  DollarSign,
  User
} from "lucide-react";

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: "1",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@startup.io",
    phone: "+1 (555) 111-2222",
    company: "Startup.io",
    source: "Website",
    status: "qualified",
    value: 15000,
    notes: "Interested in enterprise package",
    assignedTo: "Sarah Johnson",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.r@techcorp.com",
    phone: "+1 (555) 333-4444",
    company: "TechCorp",
    source: "LinkedIn",
    status: "proposal",
    value: 25000,
    notes: "Needs custom integration",
    assignedTo: "Mike Davis",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-14")
  },
  {
    id: "3",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@innovate.com",
    phone: "+1 (555) 555-6666",
    company: "Innovate Inc",
    source: "Referral",
    status: "contacted",
    value: 8000,
    notes: "Follow up next week",
    assignedTo: "Lisa Wang",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-13")
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Thompson",
    email: "sarah.t@growth.co",
    phone: "+1 (555) 777-8888",
    company: "Growth Co",
    source: "Google Ads",
    status: "new",
    value: 12000,
    notes: "Interested in demo",
    assignedTo: "John Smith",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14")
  },
  {
    id: "5",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.m@enterprise.org",
    phone: "+1 (555) 999-0000",
    company: "Enterprise Org",
    source: "Trade Show",
    status: "won",
    value: 50000,
    notes: "Closed deal - enterprise package",
    assignedTo: "Sarah Johnson",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "6",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.lee@smallbiz.com",
    phone: "+1 (555) 222-3333",
    company: "Small Biz",
    source: "Email Campaign",
    status: "lost",
    value: 3000,
    notes: "Budget constraints",
    assignedTo: "Mike Davis",
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-11")
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'secondary';
    case 'contacted': return 'outline';
    case 'qualified': return 'default';
    case 'proposal': return 'default';
    case 'won': return 'default';
    case 'lost': return 'destructive';
    default: return 'outline';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'Website': return 'bg-blue-100 text-blue-800';
    case 'LinkedIn': return 'bg-purple-100 text-purple-800';
    case 'Referral': return 'bg-green-100 text-green-800';
    case 'Google Ads': return 'bg-orange-100 text-orange-800';
    case 'Trade Show': return 'bg-pink-100 text-pink-800';
    case 'Email Campaign': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const sources = Array.from(new Set(leads.map(l => l.source)));

  const filteredLeads = leads.filter(lead => {
    const statusMatch = selectedStatus === 'all' || lead.status === selectedStatus;
    const sourceMatch = selectedSource === 'all' || lead.source === selectedSource;
    return statusMatch && sourceMatch;
  });

  const columns: DataTableColumn<Lead>[] = [
    {
      key: 'firstName',
      label: 'Lead',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{`${row.firstName} ${row.lastName}`}</div>
          <div className="text-sm text-muted-foreground">{row.company}</div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contact',
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{value}</span>
          </div>
          {row.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{row.phone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'source',
      label: 'Source',
      sortable: true,
      render: (value) => (
        <Badge className={getSourceColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{value?.toLocaleString() || 'N/A'}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <User className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      sortable: true,
      render: (value) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const wonValue = leads.filter(l => l.status === 'won').reduce((sum, lead) => sum + (lead.value || 0), 0);
  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Track and manage your sales leads and opportunities.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeLeads.length}</div>
            <p className="text-sm text-muted-foreground">Active Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Pipeline Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${wonValue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Won Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leads</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={filteredLeads}
            columns={columns}
            searchable={true}
            sortable={true}
            pagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}