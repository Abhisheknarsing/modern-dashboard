import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Modern Dashboard",
  description: "Sign in or create an account for Modern Dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}