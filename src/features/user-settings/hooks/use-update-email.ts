import { useMutation } from "@tanstack/react-query";
import { ChangeEmailFormData } from "../schemas/update-user.schema";
import { requestEmailChange } from "../apis/profile.api";

export default function useUpdateEmail() {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (values: ChangeEmailFormData) => {

      console.log(values)
      const response = await requestEmailChange(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
  });
}
