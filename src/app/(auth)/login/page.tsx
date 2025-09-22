"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { AuthLayout, LoginForm } from "@/components/auth";
import { LoginData } from "@/types";

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect if already authenticated
    if (status === "authenticated" && session) {
      router.push("/dashboard");
      return;
    }

    // Check for success message from registration
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
    }
  }, [session, status, router, searchParams]);

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid credentials. Please check your email and password.");
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (error) {
      throw error; // Re-throw to be handled by the form
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      {successMessage && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}