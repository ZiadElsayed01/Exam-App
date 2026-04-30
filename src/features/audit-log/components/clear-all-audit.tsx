"use client";
import { Button } from "@/shared/components/ui/button";
import { Shredder } from "lucide-react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import ClearLogsDialog from "./clear-logs-dialog";

export default function ClearAllAuditButton() {
  const { data: session } = useSession();

  return (
    <div
      className={`flex items-center justify-center gap-2.5 ${session?.user?.role !== USER_ROLES.SUPER_ADMIN && "hidden"}`}
    >
      <ClearLogsDialog
        trigger={
          <Button className="h-10 px-4 font-medium text-sm bg-red-500 text-white flex items-center justify-center gap-2.5">
            <Shredder className="w-4.5 h-4.5" />
            Clear All Logs
          </Button>
        }
      />
    </div>
  );
}
