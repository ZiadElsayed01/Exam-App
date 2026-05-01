"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ExamFormData, examSchema } from "../../schemas/exam.schema";
import SaveCancelButtons from "@/shared/components/global/save-cancel-buttons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import ImageField from "@/shared/components/global/image-field";
import { useCreateExam, useUpdateExam } from "../../hooks/use-exam";
import { useRouter } from "next/navigation";
import { IExam } from "../../types/exams";
import DiplomaSelect from "@/shared/components/global/diploma-select";
import useDiplomaDropdown from "@/features/diplomas/hooks/use-diploma-dropdown";
import { useMemo } from "react";
import HeaderSubTitle from "@/shared/components/global/header-sub-title";
import { slugify } from "@/shared/lib/utils/utils";

interface ExamFormProps {
  exam?: IExam;
  isEdit?: boolean;
  examId?: string;
}

export default function ExamForm({
  exam,
  isEdit = false,
  examId,
}: ExamFormProps) {
  const { mutate: createExam } = useCreateExam();
  const { mutate: updateExam } = useUpdateExam(examId!);
  const router = useRouter();

  const {
    data: diplomaData,
    hasNextPage,
    fetchNextPage,
  } = useDiplomaDropdown();

  const diplomas = useMemo(() => {
    if (!diplomaData?.pages) {
      return [];
    }
    return diplomaData.pages
      .filter((page): page is NonNullable<typeof page> => page !== undefined)
      .flatMap((page) => page.data || []);
  }, [diplomaData]);

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: exam?.title || "",
      diplomaId: exam?.diplomaId || "",
      description: exam?.description || "",
      image: exam?.image || "",
      duration: exam?.duration || 0,
    },
  });

  const onSubmit = (data: ExamFormData) => {
    if (isEdit) {
      updateExam(data, {
        onSuccess: () => {
          router.push("/exams");
        },
      });
    } else {
      createExam(data, {
        onSuccess: () => {
          router.push("/exams");
          form.reset();
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SaveCancelButtons
          isEdit={isEdit}
          title={exam?.title}
          subTitle={
            exam ? (
              <HeaderSubTitle
                Title={exam.diploma?.title}
                Id={exam.diploma?.id}
                prefix="Diploma"
                href={`/diplomas/${slugify(exam.diploma!.title)}/${exam.diploma?.id}`}
              />
            ) : undefined
          }
        />

        <div className="p-6">
          <div className="bg-primary p-4 text-white">Exam Information</div>

          <div className="p-4 bg-white gap-4 flex flex-col">
            {/* Image */}

            <div className="grid grid-cols-2 gap-4">
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
                        className={
                          fieldState.invalid ? "border-destructive" : ""
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Diploma */}
              <FieldGroup>
                <Controller
                  name="diplomaId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="diplomaId">Diploma</FieldLabel>
                      <DiplomaSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        diplomas={diplomas}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        placeholder="Select Diploma"
                        className="w-full h-10 capitalize"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ImageField />

              {/* Description */}
              <FieldGroup className="h-full">
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="h-full">
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        {...field}
                        id="description"
                        aria-invalid={fieldState.invalid}
                        className={`h-full
                          ${fieldState.invalid ? "border-destructive" : ""}
                        `}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Duration */}
              <FieldGroup>
                <Controller
                  name="duration"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="duration">Duration (min)</FieldLabel>
                      <Input
                        {...field}
                        id="duration"
                        aria-invalid={fieldState.invalid}
                        type="number"
                        min="1"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={
                          fieldState.invalid ? "border-destructive" : ""
                        }
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
        </div>
      </form>
    </FormProvider>
  );
}
