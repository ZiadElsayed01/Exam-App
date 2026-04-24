"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteProfileAction, updateProfileAction } from "../apis/profile.api";
import { UserUpdateInfoFormData } from "../schemas/update-user.schema";

export default function useProfile() {
  const updateProfileMutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (values: UserUpdateInfoFormData) => {
      const response = await updateProfileAction(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
  });

  const deleteProfileMutation = useMutation({
    mutationKey: ["delete-profile"],
    mutationFn: async () => {
      const response = await deleteProfileAction();
      
      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    deleteProfile: deleteProfileMutation.mutateAsync,

    isUpdating: updateProfileMutation.isPending,
    isDeleting: deleteProfileMutation.isPending,

    updateError: updateProfileMutation.error,
    deleteError: deleteProfileMutation.error,
  };
}
