import SideBar from "@/shared/components/global/side-bar/side-bar";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  return (
    <main className="pl-[362px]">
      {/* SideBar */}
      <SideBar />

      {/* Content */}
      {admin}
      {user}
    </main>
  );
}
