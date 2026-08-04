"use server";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IAuditLog } from "../types/audit";
import { IPaginatedResponse } from "@/shared/types/api";
import {
  PAGINATION_LIMIT,
  HEADERS,
} from "@/shared/constants/api-headers.constants";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAuditLogsAction(req: NextRequest) {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const action = searchParams.get("action") || "";
  const actorUserId = searchParams.get("actorUserId") || "";

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
    ...(category && { category }),
    ...(action && { action }),
    ...(actorUserId && { actorUserId }),
  });

  const response = await fetch(
    `${API_URL}/admin/audit-logs?${queryParams.toString()}`,
    {
      headers: {
        ...HEADERS.AUTH(token.token),
      },
    },
  );

  const payload: IApiResponse<IPaginatedResponse<IAuditLog>> =
    await response.json();

  return payload;
}

export async function deleteAuditLogAction(auditLogId: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/admin/audit-logs/${auditLogId}`, {
    method: "DELETE",
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}

export async function getAuditLogByIdAction(auditLogId: string) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return undefined;
  }

  const response = await fetch(`${API_URL}/admin/audit-logs/${auditLogId}`, {
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const data: IApiResponse<IAuditLog> = await response.json();

  if (!data.status || !data.payload) {
    return undefined;
  }

  return data.payload;
}

export async function clearAllAuditLogsAction() {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      status: false,
      message: "No token provided",
      code: 401,
    } as IErrorResponse;
  }

  const response = await fetch(`${API_URL}/admin/audit-logs`, {
    method: "DELETE",
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}
