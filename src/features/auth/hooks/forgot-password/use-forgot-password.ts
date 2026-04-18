import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../apis/auth.api";
import { EmailFormData } from "../../schemas/register.schema";

export default function useForgotPassword() {
  //Mutation
  return useMutation({
    mutationFn: async (values: EmailFormData) => {
      const response = await forgotPassword(values);

      if (!response?.status) {
        throw new Error(response?.message || "Something went wrong");
      }

      return response;
    },
  });
}
