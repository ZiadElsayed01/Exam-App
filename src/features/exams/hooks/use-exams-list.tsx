import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";
import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { IExam } from "../types/exams";
import { EXAMS_KEYS } from "../apis/exam.options";

interface UseExamListProps {
  diplomaId: string;
}

export default function useExamList({ diplomaId }: UseExamListProps) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);

  return useInfiniteQuery({
    queryKey: EXAMS_KEYS.list(diplomaId, page, limit),
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/exams?diplomaId=${diplomaId}&page=${pageParam}&limit=${limit}`,
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
