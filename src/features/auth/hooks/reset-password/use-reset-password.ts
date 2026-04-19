import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../apis/auth.api";
import { ResetPasswordFormData } from "../../schemas/reset-password.schema";

export default function useResetPassword() {
  //Mutation
  return useMutation({
    mutationFn: async (values: ResetPasswordFormData) => {
      const response = await resetPassword(values);

      if (!response?.status) {
        throw new Error(response?.message || "Something went wrong");
      }

      return response;
    },
  });
}
