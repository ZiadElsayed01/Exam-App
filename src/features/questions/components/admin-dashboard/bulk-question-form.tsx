"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFieldArray,
} from "react-hook-form";
import {
  BulkQuestionsFormData,
  bulkQuestionsSchema,
} from "../../schemas/question.schema";
import SaveCancelButtons from "@/shared/components/global/save-cancel-buttons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useCreateBulkQuestion } from "../../hooks/use-question";
import { useRouter } from "next/navigation";
import ExamSelect from "@/shared/components/global/exam-select";
import useExamDropdown from "@/features/exams/hooks/use-exam-dropdown";
import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Check, CheckCheck, Plus, Trash2, X } from "lucide-react";
import { slugify } from "@/shared/lib/utils/utils";
import FallbackError from "@/shared/components/global/fallback-error";

interface BulkQuestionFormProps {
  preselectedExamId?: string;
  preselectedExamTitle?: string;
  setBulkMode?: (value: boolean) => void;
}

export default function BulkQuestionForm({
  preselectedExamId,
  preselectedExamTitle,
  setBulkMode,
}: BulkQuestionFormProps) {
  const [openAnswers, setOpenAnswers] = useState<boolean[][]>([]);
  const [showAddInput, setShowAddInput] = useState<boolean[]>([]);
  const [answerDrafts, setAnswerDrafts] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState(0);
  const { mutate: createBulkQuestions, error } = useCreateBulkQuestion();
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

  const form = useForm<BulkQuestionsFormData>({
    resolver: zodResolver(bulkQuestionsSchema),
    defaultValues: {
      questions: [
        {
          text: "",
          answers: [],
        },
      ],
    },
  });

  const [selectedExamId, setSelectedExamId] = useState<string | null>(
    preselectedExamId || null,
  );

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: BulkQuestionsFormData) => {
    if (!selectedExamId) {
      return;
    }
    createBulkQuestions(
      { examId: selectedExamId, data },
      {
        onSuccess: () => {
          router.push(
            `/exams/${slugify(preselectedExamTitle || "exam")}/${selectedExamId}`,
          );
        },
      },
    );
  };

  const addQuestion = () => {
    if (questionFields.length < 10) {
      appendQuestion({
        text: "",
        answers: [],
      });
      setOpenAnswers((prev) => [...prev, [false, false]]);
      setShowAddInput((prev) => [...prev, false]);
      setActiveTab(questionFields.length);
    }
  };

  const removeQuestionItem = (index: number) => {
    removeQuestion(index);
    setOpenAnswers((prev) => prev.filter((_, i) => i !== index));
    setShowAddInput((prev) => prev.filter((_, i) => i !== index));

    if (activeTab >= questionFields.length - 1) {
      setActiveTab(Math.max(0, questionFields.length - 2));
    } else if (activeTab > index) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleAddAnswer = (questionIndex: number) => {
    const answerText = answerDrafts[questionIndex] ?? "";
    const currentAnswers = form.getValues(`questions.${questionIndex}.answers`);
    if (currentAnswers.length < 4 && answerText.trim()) {
      const newAnswer = {
        text: answerText.trim(),
        isCorrect: false,
      };
      form.setValue(`questions.${questionIndex}.answers`, [
        ...currentAnswers,
        newAnswer,
      ]);

      setOpenAnswers((prev) => {
        const newOpenAnswers = [...prev];
        newOpenAnswers[questionIndex] = [
          ...(newOpenAnswers[questionIndex] || []),
          false,
        ];
        return newOpenAnswers;
      });

      setAnswerDrafts((prev) => ({ ...prev, [questionIndex]: "" }));
      setShowAddInput((prev) => {
        const next = [...prev];
        next[questionIndex] = false;
        return next;
      });
    }
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentAnswers = form.getValues(`questions.${questionIndex}.answers`);
    const newAnswers = currentAnswers.filter((_, i) => i !== answerIndex);
    form.setValue(`questions.${questionIndex}.answers`, newAnswers);
    setOpenAnswers((prev) => {
      const newOpenAnswers = [...prev];
      newOpenAnswers[questionIndex] = (
        newOpenAnswers[questionIndex] || []
      ).filter((_, i) => i !== answerIndex);
      return newOpenAnswers;
    });
  };

  const markAsCorrect = (questionIndex: number, answerIndex: number) => {
    const currentAnswers = form.getValues(`questions.${questionIndex}.answers`);
    const updatedAnswers = currentAnswers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    form.setValue(`questions.${questionIndex}.answers`, updatedAnswers);
  };

  const toggleAnswerOpen = (questionIndex: number, answerIndex: number) => {
    setOpenAnswers((prev) => {
      const newOpenAnswers = [...prev];
      if (!newOpenAnswers[questionIndex]) {
        newOpenAnswers[questionIndex] = [];
      }
      newOpenAnswers[questionIndex] = newOpenAnswers[questionIndex].map(
        (open, i) => (i === answerIndex ? !open : open),
      );
      return newOpenAnswers;
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SaveCancelButtons
          bulkMode={true}
          showBulkMode={true}
          onBulkModeToggle={() => setBulkMode?.(false)}
        />

        <div className="p-6">
          <div className="bg-primary p-2.5 text-white">
            Bulk Question Information
          </div>
          <div className="p-4 bg-white gap-4 flex flex-col">
            {/* Exam Select */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="examId">Exam</FieldLabel>
                <ExamSelect
                  value={selectedExamId || ""}
                  onValueChange={setSelectedExamId}
                  exams={exams}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  placeholder="Select exam"
                  className="w-full h-10"
                  preselectedExamTitle={preselectedExamTitle}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Questions Section with Tabs */}
          <div className="mt-6">
            <div className="bg-primary p-2.5 text-white">Questions</div>
            {/* Tab Navigation */}
            <div className="bg-white border-b">
              <div className="flex items-center">
                {/* Question Tabs */}
                <div className="flex">
                  {questionFields.map((question, questionIndex) => (
                    <div
                      key={question.id}
                      className={`relative flex items-center w-25 justify-center border-x group ${activeTab === questionIndex ? "bg-blue-50 border-x-primary " : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTab(questionIndex)}
                        className={`px-4 py-3 text-sm font-medium ${activeTab === questionIndex ? "text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                      >
                        Q{questionIndex + 1}
                      </button>
                      {questionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestionItem(questionIndex)}
                          className="text-red-600 absolute top-0 right-0 group-hover:block hidden"
                          title="Delete question"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Question Button */}
                <div className="ml-auto">
                  <Button
                    type="button"
                    className="h-10 w-10 text-sm bg-gray-200 text-gray-800"
                    disabled={questionFields.length >= 10}
                    onClick={addQuestion}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab Content */}

            <div className="bg-white border border-primary">
              {error && <FallbackError error={error.message} />}
              {questionFields.map((question, questionIndex) => (
                <div
                  key={question.id}
                  className={activeTab === questionIndex ? "block" : "hidden"}
                >
                  {/* Question Headline */}
                  <div className="p-6">
                    <Controller
                      name={`questions.${questionIndex}.text`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Question Headline</FieldLabel>
                          <Input
                            {...field}
                            className={`${fieldState.invalid ? "border-destructive" : ""}`}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  {/* Answers Section */}
                  <div className="px-6 pb-6">
                    <div className="mb-4">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-200 text-left h-12.5 p-2.5">
                            <th className="w-12.5"></th>
                            <th className="">Body</th>
                            <th className="text-right w-37.5">
                              <Button
                                type="button"
                                className="h-10 px-4 text-sm bg-emerald-500 text-white"
                                disabled={
                                  (form.watch(`questions.${questionIndex}.answers`)
                                    ?.length ?? 0) >= 4
                                }
                                onClick={() => {
                                  setShowAddInput((prev) => {
                                    const next = [...prev];
                                    next[questionIndex] = true;
                                    return next;
                                  });
                                }}
                              >
                                <Plus className="mr-2 w-4 h-4" />
                                Add Answer
                              </Button>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {form
                            .watch(`questions.${questionIndex}.answers`)
                            ?.map((answer, answerIndex) => (
                              <Controller
                                key={`${question.id}-answer-${answerIndex}`}
                                name={`questions.${questionIndex}.answers.${answerIndex}`}
                                control={form.control}
                                render={({ field }) => (
                                  <tr className="border-t">
                                    {/* Delete */}
                                    <td className="p-2 bg-red-50">
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          removeAnswer(
                                            questionIndex,
                                            answerIndex,
                                          )
                                        }
                                        className="bg-transparent text-red-600"
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                    </td>

                                    {/* Text */}
                                    <td className="px-4 text-gray-800">
                                      {(openAnswers[questionIndex] || [])[
                                        answerIndex
                                      ] ? (
                                        <Input
                                          {...field}
                                          value={field.value?.text || ""}
                                          onChange={(e) =>
                                            field.onChange({
                                              ...field.value,
                                              text: e.target.value,
                                            })
                                          }
                                          placeholder="Enter answer body"
                                          className="bg-white border border-emerald-600"
                                          onBlur={() =>
                                            toggleAnswerOpen(
                                              questionIndex,
                                              answerIndex,
                                            )
                                          }
                                        />
                                      ) : (
                                        <div
                                          onClick={() =>
                                            toggleAnswerOpen(
                                              questionIndex,
                                              answerIndex,
                                            )
                                          }
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-50 rounded min-h-10 flex items-center"
                                        >
                                          {field.value?.text || (
                                            <span className="text-gray-400">
                                              Click to edit answer
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </td>

                                    {/* Correct */}
                                    <td className="px-4 text-gray-800 text-right">
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          markAsCorrect(
                                            questionIndex,
                                            answerIndex,
                                          )
                                        }
                                        className="bg-transparent p-0 h-0"
                                      >
                                        {field.value?.isCorrect ? (
                                          <p className="flex items-center p-2.5 h-7.5 text-emerald-600">
                                            <CheckCheck className="w-4 h-4 text-emerald-600 mr-1" />{" "}
                                            Correct Answer
                                          </p>
                                        ) : (
                                          <p className="flex bg-gray-200 text-gray-800 p-2.5 h-7.5 items-center">
                                            <Check className="w-4 h-4 mr-1" />{" "}
                                            Mark Correct
                                          </p>
                                        )}
                                      </Button>
                                    </td>
                                  </tr>
                                )}
                              />
                            ))}

                          {/* Add New Answer Row */}
                          {showAddInput[questionIndex] &&
                            (form.watch(`questions.${questionIndex}.answers`)
                              ?.length ?? 0) < 4 && (
                            <tr className="bg-emerald-50 border-t">
                              <td>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    setShowAddInput((prev) => {
                                      const next = [...prev];
                                      next[questionIndex] = false;
                                      return next;
                                    });
                                    setAnswerDrafts((prev) => ({
                                      ...prev,
                                      [questionIndex]: "",
                                    }));
                                  }}
                                  className="bg-transparent border border-gray-300 w-7 h-7 rounded-full text-gray-800"
                                >
                                  <X size={16} />
                                </Button>
                              </td>

                              <td className="p-2">
                                <Input
                                  placeholder="Enter answer body"
                                  className="bg-white border border-emerald-600"
                                  value={answerDrafts[questionIndex] ?? ""}
                                  onChange={(e) =>
                                    setAnswerDrafts((prev) => ({
                                      ...prev,
                                      [questionIndex]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      answerDrafts[questionIndex]?.trim()
                                    ) {
                                      e.preventDefault();
                                      handleAddAnswer(questionIndex);
                                    }
                                  }}
                                />
                              </td>

                              <td className="p-2 text-right">
                                <Button
                                  type="button"
                                  className="h-10 px-4 text-sm bg-emerald-500 text-white"
                                  onClick={() => handleAddAnswer(questionIndex)}
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
                      {form.formState.errors.questions?.[questionIndex]
                        ?.answers && (
                        <FieldError
                          errors={[
                            form.formState.errors.questions?.[questionIndex]
                              ?.answers,
                          ]}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Error */}
              {form.formState.errors.questions && (
                <div className="p-6">
                  <FieldError errors={[form.formState.errors.questions]} />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
