import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Modern Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-600">Professional analytics platform</p>
        </div>
        
        <Card className="shadow-lg border-0 sm:border">
          <CardHeader className="space-y-1 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xl sm:text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</CardContent>
        </Card>
        
        <div className="text-center text-xs sm:text-sm text-gray-500">
          <p>© 2024 Modern Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}