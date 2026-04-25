import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { USER_ROLES } from "@/features/auth/constants/user.constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === USER_ROLES.ADMIN;
  if (!isAdmin) return null;

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        {/* Admin navigation */}
        <ul>
          <li><a href="/dashboard/admin">Dashboard</a></li>
          <li><a href="/dashboard/admin/users">Users</a></li>
          <li><a href="/dashboard/admin/settings">Settings</a></li>
        </ul>
      </nav>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
