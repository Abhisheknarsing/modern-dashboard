"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  DollarSign,
  BarChart3,
  Calendar,
  Tag,
  AlertTriangle
} from "lucide-react";

// Mock product data (in real app, this would come from API)
const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    description: "Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Perfect for professional work, creative projects, and demanding applications. Features a stunning Liquid Retina XDR display, advanced camera and audio, and all-day battery life.",
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
    description: "Latest iPhone with A17 Pro chip, 128GB storage. Revolutionary camera system, Action Button, and USB-C connectivity.",
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
    description: "Wireless earbuds with active noise cancellation, spatial audio, and adaptive transparency.",
    price: 249,
    category: "Audio",
    stock: 0,
    sku: "APP-2ND-GEN",
    image: "/products/airpods-pro.jpg",
    status: "inactive",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-13")
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      // In real app, this would be an API call
      const foundProduct = mockProducts.find(p => p.id === params.id);
      setProduct(foundProduct || null);
      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-muted animate-pulse rounded" />
            <div className="h-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-muted animate-pulse rounded" />
            <div className="h-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground">SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image */}
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-1">Category</h4>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Status</h4>
                  <Badge variant={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-1">Created</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Last Updated</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-sm text-muted-foreground">Units Sold</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$12,543</div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Price</h4>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Stock Level</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStockColor(product.stock)}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                  </Badge>
                  {product.stock < 10 && product.stock > 0 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">SKU</h4>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {product.sku}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Tag className="h-4 w-4 mr-2" />
                Update Price
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Adjust Stock
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Sale
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Stock updated</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Price changed</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Product created</span>
                  <span className="text-muted-foreground">15 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}