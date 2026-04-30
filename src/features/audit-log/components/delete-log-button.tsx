"use client";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useDeleteAuditLog } from "../hooks/use-audit-log";
import { toast } from "sonner";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { useSession } from "next-auth/react";

interface DeleteLogButtonProps {
  auditLogId: string;
}

export function DeleteLogButton({ auditLogId }: DeleteLogButtonProps) {
  const router = useRouter();
  const deleteAuditLog = useDeleteAuditLog();
  const { data: session } = useSession();

  const handleDelete = async () => {
    deleteAuditLog.mutate(auditLogId, {
      onSuccess: () => {
        toast.success("Audit log deleted successfully");
        router.push("/audit-log");
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Button
      className={`bg-red-600 text-white flex items-center gap-2.5 hover:bg-red-700 ${session?.user?.role !== USER_ROLES.SUPER_ADMIN && "hidden"}`}
      disabled={deleteAuditLog.isPending}
      onClick={handleDelete}
    >
      <Trash2 className="w-4.5 h-4.5" />
      {deleteAuditLog.isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-white" />
      ) : (
        "Delete"
      )}
    </Button>
  );
}
