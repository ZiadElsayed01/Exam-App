import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IExam } from "../types/exams";
import { EXAMS_KEYS } from "../apis/exam.options";
import { useSearchParams } from "next/navigation";
import {
  deleteExamAction,
  createExamAction,
  updateExamAction,
  immutableExamAction,
} from "../apis/exams.api";
import { ExamFormData } from "../schemas/exam.schema";

export function useExamListSingle() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const diplomaId = searchParams.get("diplomaId") || "";
  const immutableValue = searchParams.get("immutable");
  const immutable =
    immutableValue === "true"
      ? false // false means immutable
      : immutableValue === "false"
        ? true // true means mutable
        : undefined;

  return useQuery({
    queryKey: EXAMS_KEYS.list(
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      diplomaId,
      immutable,
    ),
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(search && { search }),
        ...(diplomaId && { diplomaId }),
        ...(immutable !== undefined && { immutable: immutable.toString() }),
      });

      const response = await fetch(`/api/exams?${queryParams.toString()}`);

      const data: IApiResponse<IPaginatedResponse<IExam>> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
  });
}

export function useDeleteExam(examId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-exam"],
    mutationFn: async () => {
      const response = await deleteExamAction(examId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-exam"],
    mutationFn: async (values: ExamFormData) => {
      const response = await createExamAction(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useUpdateExam(examId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-exam"],
    mutationFn: async (values: ExamFormData) => {
      const response = await updateExamAction(examId, values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useImmutableExam(examId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["immutable-Exam"],
    mutationFn: async () => {
      const response = await immutableExamAction(examId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}
