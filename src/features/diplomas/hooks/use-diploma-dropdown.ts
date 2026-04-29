import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IDiploma } from "../types/diploma";
import { DIPLOMA_KEYS } from "../apis/diploma.options";

export default function useDiplomaDropdown() {
  // Use consistent parameters with the main diploma list
  const page = 1;
  const limit = 12;
  const sortBy = "title";
  const sortOrder = "asc";
  const search = "";
  const immutable = undefined;

  return useInfiniteQuery({
    queryKey: DIPLOMA_KEYS.list(
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      immutable,
    ),
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/diploma?${queryParams.toString()}`);

      const data: IApiResponse<IPaginatedResponse<IDiploma>> =
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
    staleTime: 0, // Ensure fresh data when navigating back
  });
}
