"use server";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IPaginatedResponse } from "@/shared/types/api";
import {
  PAGINATION_LIMIT,
  HEADERS,
} from "@/shared/constants/api-headers.constants";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { IExam } from "../types/exams";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { ExamFormData } from "../schemas/exam.schema";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getExamsAction(req: NextRequest) {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;

  const diplomaId = searchParams.get("diplomaId") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const immutableValue = searchParams.get("immutable");
  const immutable =
    immutableValue === "true"
      ? false // false means immutable
      : immutableValue === "false"
        ? true // true means mutable
        : undefined;

  if (!token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(search && { search }),
    ...(diplomaId && { diplomaId }),
    ...(immutable !== undefined && { immutable: immutable.toString() }),
  });

  const response = await fetch(`${API_URL}/exams?${queryParams.toString()}`, {
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<IPaginatedResponse<IExam>> =
    await response.json();

  return payload;
}

export async function getExamByIdAction(id: string): Promise<IExam> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {} as IExam;
  }

  const response = await fetch(`${API_URL}/exams/${id}`, {
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<{ exam: IExam }> = await response.json();

  if (!payload.status || !payload.payload) {
    return {} as IExam;
  }

  return payload.payload.exam;
}

export async function deleteExamAction(id: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/exams/${id}`, {
    method: "DELETE",
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<IExam> = await response.json();

  return payload;
}

export async function createExamAction(values: ExamFormData) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/exams`, {
    method: "POST",
    headers: {
      ...HEADERS.AUTH(token.token),
      ...HEADERS.JSON,
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<IExam> = await response.json();

  return payload;
}

export async function updateExamAction(examId: string, values: ExamFormData) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/exams/${examId}`, {
    method: "PUT",
    headers: {
      ...HEADERS.AUTH(token.token),
      ...HEADERS.JSON,
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<IExam> = await response.json();

  return payload;
}

export async function immutableExamAction(examId: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/admin/exams/${examId}/immutable`, {
    method: "PATCH",
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}
