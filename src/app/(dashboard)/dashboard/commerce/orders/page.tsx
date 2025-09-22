"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Order } from "@/types";
import { 
  Plus, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerId: "cust-1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { id: "1", productId: "prod-1", productName: "Laptop", quantity: 1, price: 999, total: 999 }
    ],
    total: 999,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    billingAddress: {
      street: "123 Main St",
      city: "New York", 
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerId: "cust-2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      { id: "2", productId: "prod-2", productName: "Smartphone", quantity: 2, price: 599, total: 1198 }
    ],
    total: 1198,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    billingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA", 
      zipCode: "90210",
      country: "USA"
    },
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerId: "cust-3",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    items: [
      { id: "3", productId: "prod-3", productName: "Headphones", quantity: 1, price: 199, total: 199 }
    ],
    total: 199,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    billingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601", 
      country: "USA"
    },
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customerId: "cust-4",
    customerName: "Alice Brown",
    customerEmail: "alice@example.com",
    items: [
      { id: "4", productId: "prod-4", productName: "Tablet", quantity: 1, price: 399, total: 399 }
    ],
    total: 399,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      street: "321 Elm St",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    billingAddress: {
      street: "321 Elm St",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customerId: "cust-5",
    customerName: "Charlie Wilson",
    customerEmail: "charlie@example.com",
    items: [
      { id: "5", productId: "prod-5", productName: "Monitor", quantity: 2, price: 299, total: 598 }
    ],
    total: 598,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingAddress: {
      street: "654 Maple Ave",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    billingAddress: {
      street: "654 Maple Ave",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-15")
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'default';
    case 'shipped': return 'secondary';
    case 'processing': return 'outline';
    case 'pending': return 'destructive';
    case 'cancelled': return 'destructive';
    default: return 'outline';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'default';
    case 'pending': return 'secondary';
    case 'failed': return 'destructive';
    case 'refunded': return 'outline';
    default: return 'outline';
  }
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const columns: DataTableColumn<Order>[] = [
    {
      key: 'orderNumber',
      label: 'Order #',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.customerEmail}</div>
        </div>
      )
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (value) => (
        <span className="font-medium">${value.toFixed(2)}</span>
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
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      render: (value) => (
        <Badge variant={getPaymentStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
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
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$54,239</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">23</div>
            <p className="text-sm text-muted-foreground">Pending Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$379</div>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={filteredOrders}
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