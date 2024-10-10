import type { Metadata } from "next";
import { UserLayout } from "./layout/userLayout";

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "Next Level Tour Guide Sharing Service",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserLayout>{children}</UserLayout>
    </div>
  );
}
