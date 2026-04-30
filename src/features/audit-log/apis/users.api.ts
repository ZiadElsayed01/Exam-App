"use server";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IPaginatedResponse } from "@/shared/types/api";
import { IUser } from "../hooks/use-users-dropdown";
import {
  PAGINATION_LIMIT,
  HEADERS,
} from "@/shared/constants/api-headers.constants";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsersAction(req: NextRequest) {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";

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
    ...(role && { role }),
  });

  const response = await fetch(
    `${API_URL}/admin/users?${queryParams.toString()}`,
    {
      headers: {
        ...HEADERS.AUTH(token.token),
      },
    },
  );

  const payload: IApiResponse<IPaginatedResponse<IUser>> =
    await response.json();

  return payload;
}
