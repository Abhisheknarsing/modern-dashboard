"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/dashboard";
import { DashboardProvider } from "@/components/providers";
import { DashboardErrorBoundary } from "@/components/dashboard/dashboard-error-boundary";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <DashboardErrorBoundary>
      <DashboardProvider autoRefresh={true} refreshInterval={30000}>
        <DashboardLayout>{children}</DashboardLayout>
      </DashboardProvider>
    </DashboardErrorBoundary>
  );
}