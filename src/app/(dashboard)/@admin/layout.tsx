import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import BreadCrumb from "@/shared/components/global/bread-crumb";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === USER_ROLES.ADMIN;
  if (!isAdmin) return null;

  return (
    <>
      <BreadCrumb />
      <main className="bg-gray-100">{children}</main>
    </>
  );
}
