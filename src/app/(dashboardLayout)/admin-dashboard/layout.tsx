import type { Metadata } from "next";
import { AdminLayout } from "./layout/adminLayout";

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "Next Level Tour Guide Sharing Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
