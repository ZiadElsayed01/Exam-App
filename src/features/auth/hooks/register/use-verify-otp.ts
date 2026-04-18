import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../../apis/auth.api";
import { OtpFormData } from "../../schemas/register.schma";

export default function useVerifyOtp() {
  //Mutation
  return useMutation({
    mutationFn: async (values: OtpFormData) => {
      const response = await verifyEmail(values);

      if (!response?.status) {
        throw new Error(response?.message || "Something went wrong");
      }

      return response;
    },
  });
}
