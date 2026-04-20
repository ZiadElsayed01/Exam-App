export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <p>Welcome to the Admin Dashboard</p>
        {children}
      </div>
    </div>
  );
}
