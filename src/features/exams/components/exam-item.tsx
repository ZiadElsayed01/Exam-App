import React from "react";
import { IExam } from "../types/exams";
import Image from "next/image";
import { CircleQuestionMark, MoveRight, Timer } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

interface ExamItemProps {
  exam: IExam;
}

export default function ExamItem({ exam }: ExamItemProps) {
  return (
    <div className="bg-blue-50 relative p-4 flex gap-4 group border border-transparent hover:border-dashed hover:border-blue-200 transition-all duration-200 cursor-pointer">
      {/* Exam Image */}
      <div className="bg-blue-100 w-25 h-25 flex items-center justify-center border border-blue-300 relative">
        <Image
          src={exam.image}
          alt={exam.title}
          className="w-full h-full object-cover"
          fill
          sizes="(min-width: 768px) 90vw, 400vw"
          loading="eager"
        />
      </div>

      {/* Exam Details */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Exam Title */}
          <h3 className="text-primary font-semibold text-xl">{exam.title}</h3>

          {/* Exam Stats */}
          <div className="flex items-center gap-1.5 text-gray-800">
            <p className="flex items-center gap-1.5 text-sm">
              <CircleQuestionMark className="w-4.5 h-4.5" />
              {exam.questionsCount} questions
            </p>

            <span>|</span>

            <p className="flex items-center gap-1.5 text-sm">
              <Timer className="w-4.5 h-4.5" />
              {exam.duration} minutes
            </p>
          </div>
        </div>

        {/* Exam Description */}
        <p className="text-gray-500 truncate line-clamp-4 mt-1.5">
          {exam.description}
        </p>
      </div>

      {/* Start Button */}
      <Link
        href={`/exams/${exam.id}`}
        className="absolute right-2.5 bottom-2.5 flex items-center gap-2 z-50"
      >
        <Button className="bg-primary text-white px-4 py-1.5">
          START <MoveRight className="w-4.5 h-4.5 ml-2.5" />
        </Button>
      </Link>
    </div>
  );
}
