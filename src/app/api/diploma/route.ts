import { getDiplomasAction } from "@/features/diplomas/apis/diploma.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const payload = await getDiplomasAction(request);
  return NextResponse.json(payload);
}
