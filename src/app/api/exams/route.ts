import { getExamsAction } from "@/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getExamsAction(request);
  return NextResponse.json(payload);
}
