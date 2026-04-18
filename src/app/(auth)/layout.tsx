import Aside from "@/features/auth/components/aside/aside";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* Aside */}
      <section className="hidden lg:block h-screen sticky top-0">
        <Aside />
      </section>

      {/* Content */}
      <section className="flex items-center justify-center px-4 lg:px-0 overflow-y-auto h-screen">
        {children}
      </section>
    </aside>
  );
}
