import { useMutation } from "@tanstack/react-query";
import { register } from "../../apis/auth.api";
import { RegisterFormData } from "../../schemas/register.schma";

export default function useRegister() {
  //Mutation
  return useMutation({
    mutationFn: async (values: RegisterFormData) => {
      const response = await register(values);

      if (!response?.status) {
        throw new Error(response?.message || "Something went wrong");
      }

      return response;
    },
  });
}
