import { IAuditLog } from "@/features/audit-log/types/audit.d";
import { Label } from "@/shared/components/ui/label";
import {
  formatDate,
  getActionColor,
  getEntityLink,
  getRoleColor,
} from "@/shared/lib/utils/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface LogBodyProps {
  log: IAuditLog;
}

export function LogBody({ log }: LogBodyProps) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Action</Label>
        <p className={`text-sm ${getActionColor(log.action)}`}>{log.action}</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Method</Label>
        <p className="text-gray-800 text-sm">{log.httpMethod}</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">User</Label>
        <p className="text-gray-800 text-sm">{log.actorUsername}</p>
        <p className="text-gray-500 text-xs">Email: {log.actorEmail}</p>
        <p className="text-gray-500 text-xs">IP Address: {log.ipAddress}</p>
        <p className="text-gray-500 text-xs">
          Role:{" "}
          <span className={`${getRoleColor(log.actorRole)}`}>
            {log.actorRole}
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Entity</Label>
        <p className="text-gray-800 text-sm flex items-center gap-1.5">
          <span className="capitalize">{log.entityType}</span>: {log.id}
          {getEntityLink(log.entityType, log.entityId, log.metadata) && (
            <Link
              href={getEntityLink(log.entityType, log.entityId, log.metadata)!}
              className="text-gray-800 hover:text-gray-600"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Date & Time</Label>
        <p className="text-gray-800 text-sm">
          {formatDate(log.createdAt).time} | {formatDate(log.createdAt).date}
        </p>
      </div>

      {log.metadata?.keys && log.metadata.keys.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm text-gray-400 font-normal">
            Updated Fields
          </Label>
          <div className="flex flex-wrap gap-2">
            {log.metadata.keys.map((key, index) => (
              <span key={index} className="text-gray-800 text-sm">
                {key}
                {index < (log.metadata?.keys?.length || 0) - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {log.metadata && Object.keys(log.metadata).length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm text-gray-400 font-normal">Metadata</Label>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(log.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
