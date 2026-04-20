import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import AdminDashboard from "./(dashboard)/@admin/page";
import UserLayout from "./(dashboard)/@user/layout";
import SideBar from "@/shared/components/global/side-bar/side-bar";
import { USER_ROLES } from "@/features/auth/constants/user.constants";

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === USER_ROLES.ADMIN;

  return (
    <main className="grid grid-cols-[362px_1fr]">
      <SideBar />
      {isAdmin ? (
        <AdminDashboard>{children}</AdminDashboard>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </main>
  );
}
