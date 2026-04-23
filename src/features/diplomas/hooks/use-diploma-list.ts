import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IDiploma } from "../types/diploma";
import { DIPLOMA_KEYS } from "../apis/diploma.options";
import { useSearchParams } from "next/navigation";
import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";

export default function useDiplomaList() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);

  return useInfiniteQuery({
    queryKey: DIPLOMA_KEYS.list(page, limit),
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/diploma?page=${pageParam}&limit=${limit}`,
      );

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
  });
}
