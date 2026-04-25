import BreadCrumb from "@/shared/components/global/bread-crumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { USER_ROLES } from "@/features/auth/constants/user.constants";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === USER_ROLES.ADMIN;
  if (isAdmin) return null;

  return (
    <section>
      <BreadCrumb />

      <div className="p-6 bg-gray-50 min-h-screen">{children}</div>
    </section>
  );
}
