import { Label } from "@/shared/components/ui/label";
import { IExam } from "../../types/exams";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { slugify } from "@/shared/lib/utils/utils";

interface ExamBodyProps {
  examData: IExam;
}

export default function ExamBody({ examData }: ExamBodyProps) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Image</Label>

        {examData.image ? (
          <div className="relative w-75 h-75">
            <Image
              className="h-10 w-10 object-cover"
              src={examData.image}
              alt={examData.title}
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center bg-gray-100 text-lg w-75 h-75 text-gray-800">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Title</Label>
        <h1 className="text-gray-800 text-sm">{examData.title}</h1>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Description</Label>
        <p className="text-gray-800 text-sm">{examData.description}</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Diploma</Label>
        <p className="text-gray-800 text-sm flex items-center gap-1">
          {examData.diploma?.title || "N/A"}
          <Link
            href={`/diplomas/${slugify(examData.diploma?.title)}/${examData.diploma?.id}`}
          >
            <ExternalLink className="w-4.5 h-4.5" />
          </Link>
        </p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Duration</Label>
        <p className="text-gray-800 text-sm">{examData.duration} Minutes</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">
          No. of Questions
        </Label>
        <p className="text-gray-800 text-sm">{examData.questionsCount}</p>
      </div>
    </div>
  );
}
