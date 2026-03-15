import AuthAside from "./_components/auth-aside/auth-aside";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-screen">
      <div className="w-1/2">
        <AuthAside />
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}
