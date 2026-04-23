export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className=" bg-gray-50 min-h-screen">{children}</section>;
}
