import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUDIT_KEYS } from "../apis/audit.options";
import { useSearchParams } from "next/navigation";
import {
  clearAllAuditLogsAction,
  deleteAuditLogAction,
} from "../apis/audit.api";
import { IApiResponse, IPaginatedResponse } from "@/shared/types/api";
import { IAuditLog } from "../types/audit";

export function useAuditLogList() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const action = searchParams.get("action") || "";
  const actorUserId = searchParams.get("actorUserId") || "";

  return useQuery({
    queryKey: AUDIT_KEYS.list(
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      category,
      action,
      actorUserId,
    ),
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(search && { search }),
        ...(category && { category }),
        ...(action && { action }),
        ...(actorUserId && { actorUserId }),
      });

      const response = await fetch(`/api/audit-logs?${queryParams.toString()}`);

      const data: IApiResponse<IPaginatedResponse<IAuditLog>> =
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

export function useDeleteAuditLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-audit-log"],
    mutationFn: async (id: string) => {
      const response = await deleteAuditLogAction(id);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useClearAllAuditLogs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["clear-all-audit-logs"],
    mutationFn: async () => {
      const response = await clearAllAuditLogsAction();

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}
