import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ImageSchema } from "../schemas/image.schema";
import { IApiResponse, IImageUploadingResponse } from "../types/api";

export default function useUploadImage() {
  // States
  const [uploadingProgress, setUploadingProgress] = useState(0);

  // Mutation
  const uploadingImageMutation = useMutation({
    mutationFn: async (fields: ImageSchema) => {
      const formData = new FormData();
      formData.append("image", fields.image);

      const response = await axios.post<IApiResponse<IImageUploadingResponse>>(
        `/api/image`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setUploadingProgress(progress);
          },
        },
      );

      if (!response.data.status || !response.data.payload) {
        throw new Error(response.data.message);
      }

      if (response.status !== 200) throw new Error(response.statusText);

      return response.data.payload;
    },
  });

  return {
    uploadingProgress,
    ...uploadingImageMutation,
  };
}
