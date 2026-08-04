"use client";
import ImageField from "@/shared/components/global/image-field";
import SaveCancelButtons from "@/shared/components/global/save-cancel-buttons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useCreateDiploma, useUpdateDiploma } from "../../hooks/use-diploma";
import { DiplomaFormData, diplomaSchema } from "../../schemas/diploma.schema";
import { IDiploma } from "../../types/diploma";
import FallbackError from "@/shared/components/global/fallback-error";

interface DiplomaFormProps {
  diploma?: IDiploma;
  isEdit?: boolean;
  diplomaId?: string;
}

export default function DiplomaForm({
  diploma,
  isEdit = false,
  diplomaId,
}: DiplomaFormProps) {
  const { mutate: createDiploma, error: createError } = useCreateDiploma();
  const { mutate: updateDiploma, error: updateError } = useUpdateDiploma(diplomaId!);
  const router = useRouter();

  const form = useForm<DiplomaFormData>({
    resolver: zodResolver(diplomaSchema),
    defaultValues: {
      title: diploma?.title || "",
      description: diploma?.description || "",
      image: diploma?.image || "",
    },
  });

  const onSubmit = (data: DiplomaFormData) => {
    if (isEdit) {
      updateDiploma(data, {
        onSuccess: () => {
          router.push("/diplomas");
        },
      });
    } else {
      createDiploma(data, {
        onSuccess: () => {
          router.push("/diplomas");
          form.reset();
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SaveCancelButtons isEdit={isEdit} title={diploma?.title} />

        <div className="p-6 bg-gray-100 min-h-screen">
          {(createError || updateError) && (
            <div className="mb-4">
              <FallbackError error={(createError || updateError)?.message || "Something went wrong"} />
            </div>
          )}
          <div className="bg-primary p-4 text-white">Diploma Information</div>

          <div className="p-4 bg-white gap-4 flex flex-col">
            {/* Image */}
            <ImageField />

            {/* Title */}
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      className={fieldState.invalid ? "border-destructive" : ""}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Description */}
            <FieldGroup>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Input
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      className={fieldState.invalid ? "border-destructive" : ""}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
