"use server";
import { IApiResponse, IErrorResponse } from "@/shared/types/api";
import { IDiploma } from "../types/diploma";
import { IPaginatedResponse } from "@/shared/types/api";
import {
  PAGINATION_LIMIT,
  HEADERS,
} from "@/shared/constants/api-headers.constants";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDiplomasAction(req: NextRequest) {
  const token = await getToken({ req });
  const searchParams = req.nextUrl.searchParams;

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
    ...(immutable !== undefined && { immutable: immutable.toString() }),
  });

  const response = await fetch(
    `${API_URL}/diplomas?${queryParams.toString()}`,
    {
      headers: {
        ...HEADERS.AUTH(token.token),
      },
    },
  );

  const payload: IApiResponse<IPaginatedResponse<IDiploma>> =
    await response.json();

  return payload;
}

export async function getDiplomaByIdAction(diplomaId: string) {
  const token = await getNextAuthToken();

  const response = await fetch(`${API_URL}/diplomas/${diplomaId}`, {
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
  });

  const payload: IApiResponse<IDiploma> = await response.json();

  return payload.payload;
}

export async function createDiplomaAction(diplomaId: string, values) {
  const token = await getNextAuthToken();
  const response = await fetch(`${API_URL}/diplomas/${diplomaId}`, {
    method: "POST",
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<IDiploma> = await response.json();

  return payload;
}

export async function updateDiplomaAction(diplomaId: string, values) {
  const token = await getNextAuthToken();
  const response = await fetch(`${API_URL}/diplomas/${diplomaId}`, {
    method: "PUT",
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<IDiploma> = await response.json();

  return payload;
}

export async function deleteDiplomaAction(diplomaId: string) {
  const token = await getNextAuthToken();
  const response = await fetch(`${API_URL}/diplomas/${diplomaId}`, {
    method: "DELETE",
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
  });

  const payload: IApiResponse<IDiploma> = await response.json();

  return payload;
}
