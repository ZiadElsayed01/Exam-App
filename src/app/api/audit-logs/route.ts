import { getAuditLogsAction } from "@/features/audit-log/apis/audit.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getAuditLogsAction(request);
  return NextResponse.json(payload);
}
