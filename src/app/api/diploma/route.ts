import { getDiplomas } from "@/features/diplomas/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getDiplomas(request);
  return NextResponse.json(payload);
}
