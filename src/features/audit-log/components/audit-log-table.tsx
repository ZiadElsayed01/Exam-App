"use client";
import { SortDropdown } from "@/shared/components/global/sort-dropdown";
import { memo } from "react";
import { auditSortOptions } from "../constants/audit.constants";
import TableSkeleton from "@/shared/skeletons/table-skeleton";
import { IAuditLog } from "../types/audit";
import AuditLogActionsDropdown from "./audit-log-actions-dropdown";
import {
  formatDate,
  getActionColor,
  getEntityLink,
  getRoleColor,
  slugify,
} from "@/shared/lib/utils/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AuditLogTableProps {
  auditLogs: IAuditLog[];
  isLoading?: boolean;
}

function AuditLogTable({ auditLogs, isLoading }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <TableSkeleton
        columns={5}
        showImageColumn={false}
        showMultiLineColumn={true}
        showActionColumn={true}
      />
    );
  }

  const formatActionBadge = (action: string, httpMethod: string) => {
    return (
      <div className="flex flex-col">
        <span
          className={`inline-flex items-center px-2 text-sm font-bold ${getActionColor(action)}`}
        >
          {action}
        </span>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-400`}
        >
          Method: {httpMethod}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary h-9">
            <tr>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-30"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-62.5"
              >
                User
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-95"
              >
                Entity
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-50"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-2.5 text-sm font-medium text-white w-20"
              >
                {""}
                <SortDropdown sortOptions={auditSortOptions} />
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {auditLogs.map((auditLog) => (
              <tr key={auditLog.id} className="hover:bg-gray-100">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  {formatActionBadge(auditLog.action, auditLog.httpMethod)}
                </td>
                <td className="px-4 py-2.5">
                  <div className="font-medium text-gray-800">
                    {auditLog.actorUsername}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {auditLog.actorEmail}
                  </div>
                  <div
                    className={`text-xs ${getRoleColor(auditLog.actorRole)}`}
                  >
                    {auditLog.actorRole}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="capitalize text-gray-800">
                    {auditLog.entityType}
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    {auditLog.entityId}
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
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="text-sm text-gray-800">
                    <div>{formatDate(auditLog.createdAt).time}</div>
                    <div>{formatDate(auditLog.createdAt).date}</div>
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-center text-sm font-medium">
                  <AuditLogActionsDropdown
                    id={auditLog.id}
                    viewLink={`/audit-log/${slugify(auditLog.category)}-${slugify(auditLog.action)}-by-${slugify(auditLog.actorUsername)}/${auditLog.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {auditLogs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-800">No audit logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AuditLogTable);
