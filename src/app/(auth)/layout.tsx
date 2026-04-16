import Aside from "@/features/auth/components/aside/aside";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="grid grid-cols-1 lg:grid-cols-2">
      {/* Aside */}
      <section className="hidden lg:block">
        <Aside />
      </section>

      {/* Content */}
      <section className="flex items-center justify-center min-h-screen px-4 lg:px-0">
        {children}
      </section>
    </aside>
  );
}
