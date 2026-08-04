import { isAdminRole } from "@/features/auth/constants/user.constants";
import Image from "next/image";
import SideBarDropmenu from "./side-bar-dropmenu";
import { IUser } from "@/features/auth/types/user";
import { cn } from "@/shared/lib/utils/utils";

export default async function SideBarFooter({
  isAdminSuper,
  user,
}: {
  isAdminSuper: boolean;
  user: IUser;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          isAdminRole(user.role)
            ? "border border-white"
            : "border border-primary",
        )}
      >
        {user.profilePhoto ? (
          <Image src={user.profilePhoto} alt="User" width={40} height={40} />
        ) : (
          <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-800 font-medium">
              {user.firstName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="w-3/4">
        <p
          className={cn(
            isAdminRole(user.role)
              ? "text-white"
              : "text-primary",
            "font-medium",
          )}
        >
          {user.firstName}
        </p>
        <p className="text-sm text-gray-400 truncate">{user.email}</p>
      </div>

      <SideBarDropmenu isAdminSuper={isAdminSuper} />
    </div>
  );
}
