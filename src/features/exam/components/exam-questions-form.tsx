"use client";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { IQuestion } from "../types/questions";
import { IExam } from "@/features/exams/types/exams";
import ExamHeader from "./exam-header";
import ExamQuestionTitle from "./exam-question-title";
import ExamAnswersList from "./exam-answers-list";
import CountdownBadge from "./countdown-badge";
import ExamNavButtons from "./exam-nav-buttons";
import { getQustionsAnswersAction } from "../apis/submissions.api";
import { ExamQuestionsFormValues, type ISubmission } from "../types/submisstions";
import ExamResultsView from "./results/exam-results-view";
import type { IApiResponse, IErrorResponse } from "@/shared/types/api";

interface ExamQuestionsFormProps {
  examId: string;
  questionsPromiss: Promise<{ questions: IQuestion[] }>;
  examPromise: Promise<{ exam: IExam }>;
}

export default function ExamQuestionsForm({
  examId,
  questionsPromiss,
  examPromise,
}: ExamQuestionsFormProps) {
  const { exam } = use(examPromise);
  const { questions } = use(questionsPromiss);

  const total = questions.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const hasAutoSubmittedRef = useRef(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionPayload, setSubmissionPayload] = useState<
    IApiResponse<ISubmission> | IErrorResponse | null
  >(null);
  const startedAt = useMemo(() => {
    void examId;
    return new Date().toISOString();
  }, [examId]);

  const initialRemainingSeconds = useMemo(() => {
    const durationMinutes =
      typeof exam.duration === "number" && Number.isFinite(exam.duration)
        ? Math.max(0, Math.floor(exam.duration))
        : 0;
    return durationMinutes * 60;
  }, [exam.duration]);

  useEffect(() => {
    hasAutoSubmittedRef.current = false;
  }, [examId]);

  const defaultValues = useMemo<ExamQuestionsFormValues>(() => {
    return {
      examId,
      questions: questions.map((q) => ({
        questionId: q.id,
        answerId: "",
      })),
      startedAt,
    };
  }, [examId, questions, startedAt]);

  const form = useForm<ExamQuestionsFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const activeQuestion = questions[activeIndex];
  const activeField = fieldArray.fields[activeIndex];

  useWatch({
    control: form.control,
    name: `questions.${activeIndex}.answerId`,
  });

  const goNext = async () => {
    setActiveIndex((i) => Math.min(i + 1, total - 1));
  };

  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  const finalizeSubmit = useCallback(
    async (values: ExamQuestionsFormValues, opts?: { force?: boolean }) => {
      const unanswered = values.questions.filter((q) => !q.answerId).length;
      if (!opts?.force && unanswered > 0) {
        toast.error(`You still have ${unanswered} unanswered question(s).`);
        return;
      }

      const res = await getQustionsAnswersAction({
        examId: values.examId,
        answers: values.questions,
        startedAt: values.startedAt,
      });

      setSubmissionPayload(res as IApiResponse<ISubmission> | IErrorResponse);
      if ("status" in res && res.status) {
        setIsSubmitted(true);
      } else {
        toast.error(("message" in res && res.message) || "Submit failed.");
        return;
      }

      toast.success(
        opts?.force ? "Time is up. Exam submitted." : "Exam submitted.",
      );
    },
    [],
  );

  const handleExpire = useCallback(() => {
    if (hasAutoSubmittedRef.current) return;
    hasAutoSubmittedRef.current = true;
    const values = form.getValues();
    finalizeSubmit(values, { force: true });
  }, [finalizeSubmit, form]);

  if (total === 0) {
    return (
      <div className="bg-white p-6">
        <p className="text-gray-600">No questions found for this exam.</p>
      </div>
    );
  }

  if (isSubmitted) {
    const data =
      submissionPayload && "status" in submissionPayload && submissionPayload.status
        ? submissionPayload.payload
        : null;

    return (
      <ExamResultsView
        exam={exam}
        submission={data ?? null}
        onRestart={() => {
          setIsSubmitted(false);
          setSubmissionPayload(null);
          hasAutoSubmittedRef.current = false;
          setActiveIndex(0);
          form.reset(defaultValues);
        }}
      />
    );
  }

  if (!activeQuestion || !activeField) {
    return null;
  }

  const isLast = activeIndex === total - 1;
  const isFirst = activeIndex === 0;

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between gap-6">
        <ExamHeader
          diplomaTitle={exam.diploma.title}
          examTitle={exam.title}
          currentIndex={activeIndex}
          total={total}
        />
        {/* Seperator */}
        <div className="w-16.5 -rotate-90 border border-gray-200"></div>
        <div>
          <CountdownBadge
            key={initialRemainingSeconds}
            initialSeconds={initialRemainingSeconds}
            onExpire={handleExpire}
          />
        </div>
      </div>

      {/* Question */}
      <ExamQuestionTitle text={activeQuestion.text} />

      {/* Answers */}
      <form
        onSubmit={form.handleSubmit((values) => finalizeSubmit(values))}
        className="flex flex-col gap-3"
      >
        {/* keep ids stable for RHF */}
        <input
          type="hidden"
          {...form.register(`questions.${activeIndex}.questionId`)}
          value={activeQuestion.id}
        />

        <ExamAnswersList
          questionId={activeQuestion.id}
          answers={activeQuestion.answers}
          registerName={`questions.${activeIndex}.answerId`}
          register={form.register}
        />

        {/* Buttons */}
        <ExamNavButtons
          isFirst={isFirst}
          isLast={isLast}
          onPrev={goPrev}
          onNext={goNext}
        />
      </form>
    </div>
  );
}
