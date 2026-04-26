import React from "react";

export default function ExamQuestionTitle({ text }: { text: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-primary font-semibold text-2xl mt-10 mb-4">{text}</h2>
    </div>
  );
}
