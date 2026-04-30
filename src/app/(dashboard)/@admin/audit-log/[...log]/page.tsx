import { getAuditLogByIdAction } from "@/features/audit-log/apis/audit.api";
import { notFound } from "next/navigation";
import { LogBody } from "../../../../../features/audit-log/components/log-body";
import { LogHeader } from "../../../../../features/audit-log/components/log-header";

interface AuditLogPageProps {
  params: Promise<{
    log: string[];
  }>;
}

export default async function AuditLogPage({ params }: AuditLogPageProps) {
  const { log } = await params;

  if (!log || log.length === 0) {
    notFound();
  }

  const auditLogId = log[log.length - 1];

  const { auditLog } = await getAuditLogByIdAction(auditLogId);

  if (!auditLog) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <LogHeader auditLog={auditLog} />

      {/* Content */}
      <div className="bg-gray-100 p-6 min-h-screen">
        <LogBody log={auditLog} />
      </div>
    </>
  );
}
