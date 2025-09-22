"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);
  return (
    <div className="min-h-screen p-8 bg-background">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Modern Dashboard
          </h1>
          <p className="text-muted-foreground">
            Next.js 14+ with TypeScript, Tailwind CSS, and shadcn/ui
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Setup Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your Next.js project is now configured with all the necessary
                dependencies and tools.
              </p>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Next.js 14+ with App Router</li>
                <li>TypeScript with strict mode</li>
                <li>Tailwind CSS with custom theme</li>
                <li>shadcn/ui components</li>
                <li>ESLint and Prettier</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}