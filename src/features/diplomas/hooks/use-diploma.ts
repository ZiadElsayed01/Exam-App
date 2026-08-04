import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IDiploma } from "../types/diploma";
import { DIPLOMA_KEYS } from "../apis/diploma.options";
import { useSearchParams } from "next/navigation";
import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";
import {
  createDiplomaAction,
  deleteDiplomaAction,
  immutableDiplomaAction,
  updateDiplomaAction,
} from "../apis/diploma.api";
import { DiplomaFormData } from "../schemas/diploma.schema";

export default function useDiplomaList() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || PAGINATION_LIMIT);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const immutableValue = searchParams.get("immutable");
  const immutable =
    immutableValue === "true"
      ? false // false means immutable
      : immutableValue === "false"
        ? true // true means mutable
        : undefined;

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
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(search && { search }),
        ...(immutable !== undefined && { immutable: immutable.toString() }),
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

export function useDiplomaListSingle() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const immutableValue = searchParams.get("immutable");
  const immutable =
    immutableValue === "true"
      ? false // false means immutable
      : immutableValue === "false"
        ? true // true means mutable
        : undefined;

  return useQuery({
    queryKey: DIPLOMA_KEYS.list(
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      immutable,
    ),
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(search && { search }),
        ...(immutable !== undefined && { immutable: immutable.toString() }),
      });

      const response = await fetch(`/api/diploma?${queryParams.toString()}`);

      const data: IApiResponse<IPaginatedResponse<IDiploma>> =
        await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useCreateDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-Diploma"],
    mutationFn: async (values: DiplomaFormData) => {
      const response = await createDiplomaAction(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diplomas"] });
    },
  });
}

export function useUpdateDiploma(diplomaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-Diploma"],
    mutationFn: async (values: DiplomaFormData) => {
      const response = await updateDiplomaAction(diplomaId, values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diplomas"] });
    },
  });
}

export function useDeleteDiploma(diplomaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-Diploma"],
    mutationFn: async () => {
      const response = await deleteDiplomaAction(diplomaId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diplomas"] });
    },
  });
}

export function useImmutableDiploma(diplomaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["immutable-Diploma"],
    mutationFn: async () => {
      const response = await immutableDiplomaAction(diplomaId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diplomas"] });
    },
  });
}
