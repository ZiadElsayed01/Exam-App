import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { USER_KEYS } from "../apis/user.options";

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function useUsersDropdown() {
  const page = 1;
  const limit = 12;
  const sortBy = "username";
  const sortOrder = "asc";
  const search = "";
  const role = undefined;

  return useInfiniteQuery({
    queryKey: USER_KEYS.list(
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      role || "",
    ),
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
      });

      const response = await fetch(
        `/api/admin/users?${queryParams.toString()}`,
      );

      const data: IApiResponse<IPaginatedResponse<IUser>> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        !lastPage ||
        lastPage?.metadata.page === lastPage?.metadata.totalPages
      ) {
        return undefined;
      }
      return lastPage.metadata.page + 1;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
