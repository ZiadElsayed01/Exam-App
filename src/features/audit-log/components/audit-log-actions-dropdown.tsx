"use client";
import { memo } from "react";
import { Button } from "@/shared/components/ui/button";
import { Ellipsis, Eye, Trash2 } from "lucide-react";
import { useDeleteAuditLog } from "../hooks/use-audit-log";
import { toast } from "sonner";
import {
  SimpleDropdown,
  SimpleDropdownItem,
} from "@/shared/components/ui/simple-dropdown";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@/features/auth/constants/user.constants";

interface AuditLogActionsDropdownProps {
  id: string;
  viewLink?: string;
}

function AuditLogActionsDropdown({
  id,
  viewLink,
}: AuditLogActionsDropdownProps) {
  const { mutate: deleteAuditLog } = useDeleteAuditLog();
  const { data: session } = useSession();

  const handleDelete = () => {
    deleteAuditLog(id, {
      onSuccess: () => {
        toast.success("Audit log deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <SimpleDropdown
      trigger={
        <Button
          size="icon"
          className="h-7.5 w-7.5 bg-gray-200 hover:bg-gray-300"
        >
          <Ellipsis className="h-4 w-4 text-gray-800" />
        </Button>
      }
      align="end"
      contentClassName="w-34 border border-gray-200"
    >
      {viewLink && (
        <Link href={viewLink}>
          <SimpleDropdownItem className="cursor-pointer flex items-center gap-2.5">
            <Eye className="h-4 w-4 text-emerald-500" />
            View
          </SimpleDropdownItem>
        </Link>
      )}

      <SimpleDropdownItem
        onClick={handleDelete}
        className={`cursor-pointer flex items-center gap-2.5 ${session?.user?.role !== USER_ROLES.SUPER_ADMIN && "hidden"}`}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        Delete
      </SimpleDropdownItem>
    </SimpleDropdown>
  );
}

export default memo(AuditLogActionsDropdown);
