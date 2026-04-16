import "server-only";

import { HEADERS } from "@/shared/constants/api.constants";
import { ApiResponse } from "@/shared/types/api";
import { LoginResponse, LoginCredentials } from "../types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      ...HEADERS.JSON,
    },
  });

  const data: ApiResponse<LoginResponse> = await response.json();

  return data;
};
