"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AuthLayout, RegisterForm } from "@/components/auth";
import { RegisterData } from "@/types";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect if already authenticated
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Redirect to login page with success message
      router.push("/login?message=Registration successful. Please sign in.");
    } catch (error) {
      throw error; // Re-throw to be handled by the form
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Get started with your free account today"
    >
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </AuthLayout>
  );
}