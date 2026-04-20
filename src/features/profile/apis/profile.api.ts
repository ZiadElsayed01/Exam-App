import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfile = async () => {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
