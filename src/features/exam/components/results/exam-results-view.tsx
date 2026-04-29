"use client";
import { Button } from "@/shared/components/ui/button";
import ResultChart from "./results-chart";
import ResultsQuestionItem from "./results-question-item";
import type { ISubmission } from "../../types/submisstions";
import { IExam } from "@/features/exams/types/exams";
import ExamHeader from "../exam-header";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify } from "@/shared/lib/utils/utils";

export default function ExamResultsView({
  submission,
  onRestart,
  exam,
}: {
  submission?: ISubmission | null;
  onRestart?: () => void;
  exam: IExam;
}) {
  const router = useRouter();
  const explorePath = `/diplomas/${slugify(exam.diploma.title)}/exams/${exam.diplomaId}`;

  return (
    <div className="bg-white p-6">
      <ExamHeader
        diplomaTitle={exam.diploma.title}
        examTitle={exam.title}
        currentIndex={exam.questionsCount - 1}
        total={exam.questionsCount}
        result
      />

      <h2 className="text-primary font-semibold mt-10 mb-4 text-xl">
        Results:
      </h2>

      <div className="grid grid-cols-[275px_1fr] gap-4">
        {/* Left */}
        <div className="border border-blue-200 bg-blue-50 h-full flex flex-col items-center justify-center">
          <ResultChart result={submission} />
        </div>

        {/* Right */}
        <div className="border border-dashed border-blue-200 p-1.5 h-128.5 overflow-auto">
          {submission?.analytics?.length ? (
            submission.analytics.map((a) => (
              <ResultsQuestionItem
                key={a.questionId}
                questionText={a.questionText}
                selectedAnswerText={a.selectedAnswer?.text ?? ""}
                isCorrect={a.isCorrect}
                correctAnswerText={a.correctAnswer?.text ?? ""}
              />
            ))
          ) : (
            <div className="text-sm text-gray-600">No results to show.</div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
          className="w-full bg-gray-200 text-gray-800 "
          type="button"
          onClick={onRestart}
        >
          <RotateCcw className="w-4.5 h-4.5 text-gray-800" /> Restart
        </Button>
        <Button className="w-full" onClick={() => router.push(explorePath)}>
          <FolderSearch className="w-4.5 h-4.5 text-white" />
          Explore
        </Button>
      </div>
    </div>
  );
}
