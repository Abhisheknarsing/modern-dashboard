"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Product } from "@/types";
import { 
  Plus, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Package
} from "lucide-react";
import Link from "next/link";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    description: "Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
    price: 2499,
    category: "Laptops",
    stock: 15,
    sku: "MBP-16-M2-512",
    image: "/products/macbook-pro.jpg",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2", 
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip, 128GB storage",
    price: 999,
    category: "Smartphones",
    stock: 32,
    sku: "IPH-15-PRO-128",
    image: "/products/iphone-15-pro.jpg",
    status: "active",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-14")
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Gen",
    description: "Wireless earbuds with active noise cancellation",
    price: 249,
    category: "Audio",
    stock: 0,
    sku: "APP-2ND-GEN",
    image: "/products/airpods-pro.jpg",
    status: "inactive",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-13")
  },
  {
    id: "4",
    name: "iPad Air 5th Gen",
    description: "10.9-inch iPad Air with M1 chip, 64GB WiFi",
    price: 599,
    category: "Tablets",
    stock: 8,
    sku: "IPA-AIR-M1-64",
    image: "/products/ipad-air.jpg",
    status: "active",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    description: "GPS + Cellular, 45mm, Midnight Aluminum",
    price: 429,
    category: "Wearables",
    stock: 25,
    sku: "AW-S9-45-MID",
    image: "/products/apple-watch.jpg",
    status: "active",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-11")
  },
  {
    id: "6",
    name: "Magic Keyboard",
    description: "Wireless keyboard with Touch ID for Mac",
    price: 179,
    category: "Accessories",
    stock: 12,
    sku: "MK-TOUCH-ID",
    image: "/products/magic-keyboard.jpg",
    status: "draft",
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-10")
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'default';
    case 'inactive': return 'secondary';
    case 'draft': return 'outline';
    default: return 'outline';
  }
};

const getStockColor = (stock: number) => {
  if (stock === 0) return 'destructive';
  if (stock < 10) return 'secondary';
  return 'default';
};

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || product.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const columns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <Link 
              href={`/dashboard/commerce/products/${row.id}`}
              className="font-medium hover:underline"
            >
              {value}
            </Link>
            <div className="text-sm text-muted-foreground">{row.sku}</div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value) => (
        <span className="font-medium">${value.toFixed(2)}</span>
      )
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value) => (
        <Badge variant={getStockColor(value)}>
          {value === 0 ? 'Out of Stock' : `${value} units`}
        </Badge>
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
          <Link href={`/dashboard/commerce/products/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
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
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</div>
            <p className="text-sm text-muted-foreground">Active Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</div>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={filteredProducts}
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