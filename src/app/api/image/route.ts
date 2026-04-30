import { uploadImageAction } from "@/shared/actions/image.actions";
import { imageSchema } from "@/shared/schemas/image.schema";
import {
  IErrorResponse
} from "@/shared/types/api";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const result = imageSchema.safeParse({
    image: formData.get("image") as File,
  });

  if (!result.success) {
    return Response.json(
      {
        code: 400,
        status: false,
        message: result.error.message,
      } satisfies IErrorResponse,
      { status: 400 },
    );
  }

  const response = await uploadImageAction(formData);

  return Response.json(response);
}
