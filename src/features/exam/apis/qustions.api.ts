"use server";

import { HEADERS } from "@/shared/constants/api-headers.constants";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IQuestion } from "../types/questions";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getExamQustionsAction(examId: string) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  console.log(token);

  if (!token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/questions/exam/${examId}`, {
    headers: {
      ...HEADERS.AUTH(token),
    },
  });

  const payload: IApiResponse<{ qustions: IQuestion[] }> =
    await response.json();

  return payload.payload;
}
