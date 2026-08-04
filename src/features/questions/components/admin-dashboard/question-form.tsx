"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFieldArray,
} from "react-hook-form";
import {
  QuestionFormData,
  questionSchema,
} from "../../schemas/question.schema";
import SaveCancelButtons from "@/shared/components/global/save-cancel-buttons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useCreateQuestion, useUpdateQuestion } from "../../hooks/use-question";
import { useRouter } from "next/navigation";
import { IQuestion } from "@/features/exam/types/questions";
import ExamSelect from "@/shared/components/global/exam-select";
import useExamDropdown from "@/features/exams/hooks/use-exam-dropdown";
import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Check, CheckCheck, Plus, Trash2, X } from "lucide-react";
import { slugify } from "@/shared/lib/utils/utils";
import BulkQuestionForm from "./bulk-question-form";
import FallbackError from "@/shared/components/global/fallback-error";

interface QuestionFormProps {
  question?: IQuestion;
  isEdit?: boolean;
  questionId?: string;
  preselectedExamId?: string;
  preselectedExamTitle?: string;
  setBulkMode?: (value: boolean) => void;
}

export default function QuestionForm({
  question,
  isEdit = false,
  questionId,
  preselectedExamId,
  preselectedExamTitle,
}: QuestionFormProps) {
  const [open, setOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");
  const { mutate: createQuestion, error: createError } = useCreateQuestion();
  const { mutate: updateQuestion, error: updateError } = useUpdateQuestion(questionId!);
  const router = useRouter();

  const { data: examData, hasNextPage, fetchNextPage } = useExamDropdown();

  const exams = useMemo(() => {
    if (!examData?.pages) {
      return [];
    }
    return examData.pages
      .filter((page): page is NonNullable<typeof page> => page !== undefined)
      .flatMap((page) => page.data || []);
  }, [examData]);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: question?.text || "",
      examId: preselectedExamId || question?.examId || "",
      answers: question?.answers || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  // Don't allow bulk mode in edit mode
  const effectiveBulkMode = bulkMode && !isEdit;

  if (effectiveBulkMode) {
    return (
      <BulkQuestionForm
        preselectedExamId={preselectedExamId}
        preselectedExamTitle={preselectedExamTitle}
        setBulkMode={setBulkMode}
      />
    );
  }

  const onSubmit = (data: QuestionFormData) => {
    if (isEdit) {
      updateQuestion(data, {
        onSuccess: () => {
          router.push(
            `/exams/${slugify(preselectedExamTitle || "exam")}/${data.examId}`,
          );
        },
      });
    } else {
      createQuestion(data, {
        onSuccess: () => {
          router.push(
            `/exams/${slugify(preselectedExamTitle || "exam")}/${data.examId}`,
          );
          form.reset();
        },
      });
    }
  };

  const addAnswer = () => {
    if (fields.length < 4 && newAnswerText.trim()) {
      append({
        text: newAnswerText.trim(),
        isCorrect: false,
      });
      setNewAnswerText("");
    }
  };

  const markAsCorrect = (index: number) => {
    const currentAnswers = form.getValues("answers");
    const updatedAnswers = currentAnswers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    form.setValue("answers", updatedAnswers);
  };

  const removeAnswer = (index: number) => {
    remove(index);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SaveCancelButtons
          bulkMode={bulkMode}
          showBulkMode={true}
          onBulkModeToggle={setBulkMode}
        />

        <div className="p-6">
          {(createError || updateError) && (
            <div className="mb-4">
              <FallbackError error={(createError || updateError)?.message || "Something went wrong"} />
            </div>
          )}
          <div className="bg-primary p-4 text-white">Question Information</div>
          <div className="p-4 bg-white gap-4 flex flex-col">
            {/* Exam Select */}
            <FieldGroup>
              <Controller
                name="examId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="examId">Exam</FieldLabel>
                    <ExamSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      exams={exams}
                      hasNextPage={hasNextPage}
                      fetchNextPage={fetchNextPage}
                      placeholder="Select exam"
                      className="w-full h-10"
                      preselectedExamTitle={preselectedExamTitle}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Question Text */}
            <FieldGroup>
              <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="text">Question Headline</FieldLabel>
                    <Textarea
                      {...field}
                      id="text"
                      aria-invalid={fieldState.invalid}
                      className={`min-h-25
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

          {/* Question Answers Section */}
          <div className="mt-6">
            {/* Header */}
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <h3>Question Answers</h3>
            </div>

            <div className="bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-left h-12.5 p-2.5">
                    <th className="w-12.5"></th>
                    <th className="">Body</th>
                    <th className="text-right w-37.5">
                      <Button
                        type="button"
                        className="h-10 px-4 text-sm bg-emerald-500 text-white"
                        disabled={fields.length >= 4}
                        onClick={() => setOpen(true)}
                      >
                        <Plus className="mr-2 w-4 h-4" />
                        Add Answer
                      </Button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {fields.map((answer, index) => (
                    <Controller
                      key={answer.id}
                      name={`answers.${index}`}
                      control={form.control}
                      render={() => (
                        <tr className="border-t">
                          {/* Delete */}
                          <td className="p-2 bg-red-50">
                            <Button
                              type="button"
                              onClick={() => removeAnswer(index)}
                              className="bg-transparent text-red-600"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>

                          {/* Text */}
                          <td className="px-4 text-gray-800">{answer.text}</td>

                          {/* Correct */}
                          <td className="px-4 text-gray-800 text-right">
                            <Button
                              type="button"
                              onClick={() => markAsCorrect(index)}
                              className="bg-transparent p-0 h-0"
                            >
                              {answer.isCorrect ? (
                                <p className="flex items-center p-2.5 h-7.5 text-emerald-600">
                                  <CheckCheck className="w-4 h-4 text-emerald-600 mr-1" />{" "}
                                  Correct Answer
                                </p>
                              ) : (
                                <p className="flex bg-gray-200 text-gray-800 p-2.5 h-7.5 items-center">
                                  <Check className="w-4 h-4 mr-1" /> Mark
                                  Correct
                                </p>
                              )}
                            </Button>
                          </td>
                        </tr>
                      )}
                    />
                  ))}

                  {/* Add New Answer Row */}
                  {open && (
                    <tr className="bg-emerald-50 border-t">
                      <td className="">
                        <Button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            setNewAnswerText("");
                          }}
                          className="bg-transparent border border-gray-300 w-7 h-7 rounded-full text-gray-800"
                        >
                          <X size={16} />
                        </Button>
                      </td>

                      <td className="p-2">
                        <Input
                          value={newAnswerText}
                          onChange={(e) => setNewAnswerText(e.target.value)}
                          placeholder="Enter answer body"
                          className="bg-white border border-emerald-600"
                        />
                      </td>

                      <td className="p-2 text-right">
                        <Button
                          type="button"
                          className="h-10 px-4 text-sm bg-emerald-500 text-white"
                          onClick={addAnswer}
                        >
                          <Plus className="mr-2 w-4 h-4" />
                          Add
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Error */}
              {form.formState.errors.answers && (
                <FieldError errors={[form.formState.errors.answers]} />
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
