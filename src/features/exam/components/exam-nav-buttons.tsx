"use client";

import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamNavButtons({
  isFirst,
  isLast,
  onPrev,
  onNext,
}: {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <Button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="w-full bg-gray-200 text-gray-400"
      >
        <ChevronLeft className="w-4.5 h-4.5 mr-2.5" />
        Previous
      </Button>

      {isLast ? (
        <Button type="submit" className="w-full">
          Submit
        </Button>
      ) : (
        <Button type="button" onClick={onNext} className="w-full">
          Next <ChevronRight className="w-4.5 h-4.5 ml-2.5" />
        </Button>
      )}
    </div>
  );
}

