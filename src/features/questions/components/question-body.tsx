import { IQuestion } from "@/features/exam/types/questions";
import { Label } from "@/shared/components/ui/label";
import { slugify } from "@/shared/lib/utils/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IQuestionBodyProps {
  question?: IQuestion;
}

export default function QuestionBody({ question }: IQuestionBodyProps) {

  if (!question) {
    return notFound();
  }

  return (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Title</Label>
        <p className="text-gray-800 text-sm">{question.text}</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Exam</Label>
        <p className="text-gray-800 text-sm flex items-center gap-1">
          {question.exam.title}
          <Link
            href={`/exams/${slugify(question.exam.title)}/${question.examId}`}
          >
            <ExternalLink className="w-4.5 h-4.5" />
          </Link>
        </p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Answers</Label>
        <p className="text-gray-800 text-sm">{question.answers.length}</p>
      </div>
    </div>
  );
}
