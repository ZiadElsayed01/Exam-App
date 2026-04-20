import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { getProfile } from "@/features/profile/apis/profile.api";
import Image from "next/image";
import SideBarDropmenu from "./side-bar-dropmenu";

export default async function SideBarFooter({ isAdminSuper }: { isAdminSuper: boolean }) {
  const { payload } = await getProfile();

  const user = payload.user;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${user.role === USER_ROLES.ADMIN ? "border border-white" : "border border-primary"}`}
      >
        {user.profilePhoto ? (
          <Image src={user.profilePhoto} alt="User" width={40} height={40} />
        ) : (
          <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {user.firstName?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
        )}
      </div>

      <div className="w-3/4">
        <p
          className={`text-${user.role === USER_ROLES.ADMIN ? "white" : "primary"} font-medium`}
        >
          {user.firstName}
        </p>
        <p className="text-sm text-gray-400 truncate">{user.email}</p>
      </div>

      <SideBarDropmenu isAdminSuper={isAdminSuper} />
    </div>
  );
}
