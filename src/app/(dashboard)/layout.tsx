import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import SideBar from "@/shared/components/global/side-bar/side-bar";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === USER_ROLES.ADMIN;
  return (
    <main className="pl-[362px]">
      <SideBar />
      {isAdmin ? admin : user}
    </main>
  );
}
