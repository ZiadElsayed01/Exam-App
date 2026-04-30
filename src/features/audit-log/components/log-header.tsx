import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IAuditLog } from "@/features/audit-log/types/audit.d";
import { getEntityLink } from "@/shared/lib/utils/utils";
import { DeleteLogButton } from "./delete-log-button";

interface LogHeaderProps {
  auditLog: IAuditLog;
}

export function LogHeader({ auditLog }: LogHeaderProps) {
  return (
    <div className="bg-white py-1.5 px-6 border-t border-gray-100 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold font-inter capitalize">
          {auditLog.entityType} {auditLog.action.toLowerCase()} By{" "}
          {auditLog.actorUsername}
        </h1>

        <h2 className="text-sm font-inter text-gray-400 capitalize flex gap-1">
          Entity: {auditLog.entityType}
          <span className="text-gray-400 border-b border-gray-400">
            {getEntityLink(
              auditLog.entityType,
              auditLog.entityId,
              auditLog.metadata,
            ) && (
              <Link
                href={
                  getEntityLink(
                    auditLog.entityType,
                    auditLog.entityId,
                    auditLog.metadata,
                  )!
                }
                className="text-gray-400 flex items-center gap-1"
              >
                [{auditLog.entityId}]
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-2.5">
        <DeleteLogButton auditLogId={auditLog.id} />
      </div>
    </div>
  );
}
