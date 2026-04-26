import { Progress } from "@/shared/components/ui/progress";

export default function ExamHeader({
  examTitle,
  diplomaTitle,
  currentIndex,
  total,
  result,
}: {
  examTitle: string;
  diplomaTitle: string;
  currentIndex: number;
  total: number;
  result?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-1.5">
        <p className={`${result ? "text-gray-500" : "text-gray-800"}`}>
          {diplomaTitle} - {examTitle}
        </p>
        <p className="text-gray-500 test-sm">
          Question{" "}
          <span className="text-primary font-bold text-sm">
            {currentIndex + 1}
          </span>{" "}
          of <span className="text-primary">{total}</span>
        </p>
      </div>

      <Progress value={currentIndex + 1} max={total} />
    </div>
  );
}
