"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Contact } from "@/types";
import { 
  Plus, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Mail,
  Phone,
  Building
} from "lucide-react";

// Mock data for contacts
const mockContacts: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    position: "CEO",
    status: "active",
    tags: ["VIP", "Enterprise"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@techstart.com",
    phone: "+1 (555) 987-6543",
    company: "TechStart Inc",
    position: "CTO",
    status: "active",
    tags: ["Tech", "Startup"],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-14")
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@gmail.com",
    phone: "+1 (555) 456-7890",
    company: "Freelancer",
    position: "Designer",
    status: "inactive",
    tags: ["Creative", "Freelance"],
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-13")
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@innovate.co",
    phone: "+1 (555) 321-0987",
    company: "Innovate Co",
    position: "Product Manager",
    status: "active",
    tags: ["Product", "Innovation"],
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "5",
    firstName: "Charlie",
    lastName: "Wilson",
    email: "charlie.wilson@consulting.com",
    phone: "+1 (555) 654-3210",
    company: "Wilson Consulting",
    position: "Senior Consultant",
    status: "active",
    tags: ["Consulting", "B2B"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-11")
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'default';
    case 'inactive': return 'secondary';
    default: return 'outline';
  }
};

export default function ContactsPage() {
  const [contacts] = useState<Contact[]>(mockContacts);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredContacts = selectedStatus === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === selectedStatus);

  const columns: DataTableColumn<Contact>[] = [
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{`${row.firstName} ${row.lastName}`}</div>
          <div className="text-sm text-muted-foreground">{row.position}</div>
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
      key: 'company',
      label: 'Company',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
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
      key: 'updatedAt',
      label: 'Last Contact',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your customer and business contacts.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{contacts.filter(c => c.status === 'active').length}</div>
            <p className="text-sm text-muted-foreground">Active Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{new Set(contacts.map(c => c.company)).size}</div>
            <p className="text-sm text-muted-foreground">Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.tags.includes('VIP')).length}
            </div>
            <p className="text-sm text-muted-foreground">VIP Contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contacts</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={filteredContacts}
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