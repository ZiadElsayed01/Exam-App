"use client";
import AuditLogTable from "@/features/audit-log/components/audit-log-table";
import SearchAndFilter from "@/features/audit-log/components/search-and-filter";
import { useAuditLogList } from "@/features/audit-log/hooks/use-audit-log";
import FallbackError from "@/shared/components/global/fallback-error";
import Pagination from "@/shared/components/global/pagination";
import { useMemo } from "react";

export default function AuditLogPage() {
  const { data: auditLogData, isLoading, error } = useAuditLogList();

  // Memoize audit logs data to prevent unnecessary re-renders
  const auditLogs = useMemo(
    () => auditLogData?.data || [],
    [auditLogData?.data],
  );

  if (error) {
    return (
      <>
        <div className="mx-6">
          <FallbackError error={error.message} />
        </div>
      </>
    );
  }

  return (
    <>
      <Pagination
        data={auditLogData}
        isLoading={isLoading}
        href=""
        addText=""
        audit
      />

      <div className="p-6 space-y-6 min-h-screen">
        <SearchAndFilter />

        <AuditLogTable auditLogs={auditLogs} isLoading={isLoading} />
      </div>
    </>
  );
}
