"use server";
import { IUser } from "@/features/auth/types/user";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { IApiResponse } from "@/shared/types/api";
import { HEADERS } from "@/shared/constants/api-headers.constants";
import { UserUpdateInfoFormData } from "../schemas/update-user.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfile = async (): Promise<IUser | null> => {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      ...HEADERS.AUTH(token!),
    },
  });

  const data: IApiResponse<{ user: IUser }> = await response.json();

  if (!data.status) {
    return null;
  }

  if (!data.payload || !data.payload.user) {
    return null;
  }

  return data.payload.user;
};

export const updateProfileAction = async (
  userData: UserUpdateInfoFormData,
): Promise<IApiResponse<IUser>> => {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PATCH",
    headers: {
      ...HEADERS.JSON,
      ...HEADERS.AUTH(token!),
    },
    body: JSON.stringify(userData),
  });

  const data: IApiResponse<IUser> = await response.json();
  if (!data.status) {
    return data;
  }

  return data;
};

export const deleteProfileAction = async (): Promise<
  IApiResponse<undefined>
> => {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  const response = await fetch(`${API_BASE_URL}/users/account`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IApiResponse<undefined> = await response.json();
  if (!data.status) {
    return data;
  }

  return data;
};
