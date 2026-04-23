import { getExams } from "@/features/exams/apis/exams.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getExams(request);
  return NextResponse.json(payload);
}
