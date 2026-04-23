import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IPaginatedResponse } from "@/shared/types/api";
import {
  PAGINATION_LIMIT,
  HEADERS,
} from "@/shared/constants/api-headers.constants";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { IExam } from "../types/exams";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getExams(req: NextRequest) {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;

  const diplomaId = searchParams.get("diplomaId");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);

  if (!token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(
    `${API_URL}/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`,
    {
      headers: {
        ...HEADERS.AUTH(token.token),
      },
    },
  );

  const payload: IApiResponse<IPaginatedResponse<IExam>> =
    await response.json();

  return payload;
}
