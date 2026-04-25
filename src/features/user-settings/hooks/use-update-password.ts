import { useMutation } from "@tanstack/react-query";
import { UpdatePasswordFormData } from "../schemas/update-user.schema";
import { updatePasswordAction } from "../apis/profile.api";

export default function useUpdatePassword() {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (values: UpdatePasswordFormData) => {
      const response = await updatePasswordAction(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
  });
}
