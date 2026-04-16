import { useMutation } from "@tanstack/react-query";
import { LoginCredentials } from "../types/auth";
import { signIn } from "next-auth/react";

export default function useLogin() {
  //Mutation
  return useMutation({
    mutationFn: async (values: LoginCredentials) => {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Something went wrong");
      }

      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(location.search).get("callbackUrl") || "/";
      window.location.href = callbackUrl;
    },
  });
}
