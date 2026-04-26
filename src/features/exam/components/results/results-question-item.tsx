"use client";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils/utils";

interface ResultsQuestionItemProps {
  questionText: string;
  selectedAnswerText: string;
  isCorrect: boolean;
  correctAnswerText: string;
}

export default function ResultsQuestionItem({
  questionText,
  selectedAnswerText,
  isCorrect,
  correctAnswerText,
}: ResultsQuestionItemProps) {
  return (
    <div className="p-2.5">
      <p className="text-primary font-semibold text-xl mb-2.5">
        {questionText}
      </p>

      <div className="flex flex-col gap-2.5">
        {/* Selected Answer */}
        <div
          className={cn(
            "flex items-center gap-2.5 p-4",
            isCorrect ? "bg-emerald-50" : "bg-red-50",
          )}
        >
          <div>
            <Input
              type="radio"
              checked
              readOnly
              className={cn(
                "cursor-default flex items-center w-4",
                isCorrect ? "" : "accent-red-500",
              )}
            />
          </div>

          <p className="text-gray-800 ">{selectedAnswerText}</p>
        </div>

        {/* Correct Answer (only if wrong) */}
        {!isCorrect && (
          <div className="flex items-center gap-2.5  p-4 bg-green-50">
            <div>
              <Input
                type="radio"
                readOnly
                checked={false}
                className="cursor-default flex items-center w-4"
              />
            </div>

            <p className="text-gray-800">{correctAnswerText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
