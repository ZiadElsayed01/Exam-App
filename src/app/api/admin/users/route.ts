import { getUsersAction } from "@/features/audit-log/apis/users.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getUsersAction(request);
  return NextResponse.json(payload);
}
