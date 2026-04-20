import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import AdminDashboard from "./(dashboard)/@admin/page";
import UserLayout from "./(dashboard)/@user/layout";
import SideBar from "@/shared/components/global/side-bar";
import { USER_ROLES } from "@/features/auth/constants/user.constants";

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSession(authOptions);

  return (
    <main className="grid grid-cols-[362px_1fr]">
      <SideBar />
      {user?.role === USER_ROLES.ADMIN ? (
        <AdminDashboard>{children}</AdminDashboard>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </main>
  );
}
