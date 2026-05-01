import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";
import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IExam } from "../types/exams";
import { EXAMS_KEYS } from "../apis/exam.options";

export default function useExamDropdown() {
  return useInfiniteQuery({
    queryKey: EXAMS_KEYS.dropdown(),
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/exams?page=${pageParam}&limit=${PAGINATION_LIMIT}`,
      );

      const data: IApiResponse<IPaginatedResponse<IExam>> =
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
