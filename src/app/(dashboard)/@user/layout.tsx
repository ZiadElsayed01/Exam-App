export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="user-layout">
      <nav className="user-nav">
        {/* User navigation */}
        <ul>
          <li><a href="/dashboard/user">Dashboard</a></li>
          <li><a href="/dashboard/user/profile">Profile</a></li>
          <li><a href="/dashboard/user/exams">My Exams</a></li>
        </ul>
      </nav>
      <main className="user-main">
        {children}
      </main>
    </div>
  );
}
