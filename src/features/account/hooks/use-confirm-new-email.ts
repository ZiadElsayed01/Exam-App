import { useMutation } from "@tanstack/react-query";
import { confirmEmailChange } from "../apis/account.api";
import { ConfirmEmailFormData } from "../schemas/update-account.schema";

export default function useConfirmNewEmail() {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (values: ConfirmEmailFormData) => {
      console.log(values);
      const response = await confirmEmailChange(values);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
  });
}
