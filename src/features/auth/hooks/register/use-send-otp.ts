import { useMutation } from "@tanstack/react-query";
import { sendEmailVerification } from "../../apis/auth.api";
import { EmailFormData } from "../../schemas/register.schma";

export default function useSendOtp() {
  //Mutation
  return useMutation({
    mutationFn: async (values: EmailFormData) => {
      const response = await sendEmailVerification(values);

      if (!response?.status) {
        throw new Error(response?.message || "Something went wrong");
      }

      return response;
    },
  });
}
