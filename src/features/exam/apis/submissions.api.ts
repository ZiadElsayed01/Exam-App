"use server";
import { HEADERS } from "@/shared/constants/api-headers.constants";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { CreateSubmissionPayload, ISubmission } from "../types/submisstions";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getQustionsAnswersAction(values: CreateSubmissionPayload) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token),
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<ISubmission> = await response.json();

  return payload;
}
