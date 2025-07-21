"use client";

import Sidebar from "@/components/sidebar";
import { useAutoLogout } from "@/hooks/useAutoLogout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useAutoLogout();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 md:pt-8 md:p-8">{children}</main>
    </div>
  );
}
