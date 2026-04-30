"use server";

import { getNextAuthToken } from "../lib/utils/auth.utils";
import { HEADERS } from "./../constants/api-headers.constants";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const uploadImageAction = async (formData: FormData) => {
  const token = await getNextAuthToken();
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
  });

  return response.json();
};
