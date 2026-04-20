import { Folder, Code } from "lucide-react";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { UserRoles } from "@/features/auth/types/user";

interface ExamAppLogoProps {
  role?: UserRoles;
}

export default function ExamAppLogo({ role }: ExamAppLogoProps) {
  return (
    <div
      className={`font-semibold flex items-center gap-2.5 font-geist-mono text-xl ${role === USER_ROLES.ADMIN_SUPER ? "text-white" : "text-primary"}`}
    >
      <div className="relative h-10 w-10">
        <Folder
          fill={`${role === USER_ROLES.ADMIN_SUPER ? "transparent" : "var(--primary)"}`}
          className="h-10 w-10"
        />

        <Code
          stroke="white"
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4"
        />
      </div>
      Exam App
    </div>
  );
}
