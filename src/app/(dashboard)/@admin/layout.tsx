export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
