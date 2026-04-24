import SideBarBody from "./side-bar-body";
import SideBarFooter from "./side-bar-footer";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ElevateLogo from "../../../../../public/ElevateLogo.png";
import WhiteElevateLogo from "../../../../../public/WhiteElevateLogo.png";
import ExamAppLogo from "../exam-app-logo";
import Image from "next/image";

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  const isAdminSuper = USER_ROLES.ADMIN_SUPER.includes(
    session?.user.role as "ADMIN" | "SUPER_ADMIN",
  );

  return (
    <>
      <aside
        className={`fixed left-0 top-0 p-10 flex flex-col bg-blue-50 h-screen w-90.5 z-50 ${isAdminSuper ? "bg-gray-800" : ""}`}
      >
        <div className="w-70.5">
          {/* Elevate Logo */}
          <div className="mb-2.5">
            <Image
              src={isAdminSuper ? WhiteElevateLogo : ElevateLogo}
              alt="Elevate Logo"
              className="w-48 h-9"
              style={{ width: "auto" }}
              loading="eager"
            />
          </div>

          {/* Exam App Logo */}
          <ExamAppLogo
            role={isAdminSuper ? USER_ROLES.ADMIN_SUPER : USER_ROLES.USER}
          />
        </div>

        {/* SideBar Body */}
        <SideBarBody isAdminSuper={isAdminSuper} />

        {/* User Info */}
        <div className="mt-auto w-70.5">
          <SideBarFooter isAdminSuper={isAdminSuper} />
        </div>
      </aside>
    </>
  );
}
