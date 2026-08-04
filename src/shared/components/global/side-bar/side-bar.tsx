import SideBarBody from "./side-bar-body";
import SideBarFooter from "./side-bar-footer";
import { USER_ROLES, isAdminRole } from "@/features/auth/constants/user.constants";
import ElevateLogo from "../../../../../public/ElevateLogo.png";
import WhiteElevateLogo from "../../../../../public/WhiteElevateLogo.png";
import ExamAppLogo from "../exam-app-logo";
import Image from "next/image";
import { getProfileAction } from "@/features/account/apis/account.api";

export default async function SideBar() {
  const user = await getProfileAction();

  const isAdminSuper = isAdminRole(user?.role);

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
          <SideBarFooter isAdminSuper={isAdminSuper} user={user!} />
        </div>
      </aside>
    </>
  );
}
