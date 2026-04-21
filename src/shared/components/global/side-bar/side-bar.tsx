import SideBarBody from "./side-bar-body";
import SideBarFooter from "./side-bar-footer";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  const isAdminSuper = USER_ROLES.ADMIN_SUPER.includes(
    session?.user.role as "ADMIN" | "SUPER_ADMIN",
  );

  return (
    <>
      <div
        className={`p-10 relative left-0 top-0 flex flex-col bg-blue-50 h-full ${isAdminSuper ? "bg-gray-800" : ""}`}
      >
        {/* SideBar Body */}
        <SideBarBody isAdminSuper={isAdminSuper} />

        {/* User Info */}
        <div className="mt-auto w-70.5">
          <SideBarFooter isAdminSuper={isAdminSuper} />
        </div>
      </div>
    </>
  );
}
