import { useForm } from "react-hook-form";
import { ExamQuestionsFormValues } from "../types/submisstions";

export default function ExamAnswersList({
  questionId,
  answers,
  registerName,
  register,
}: {
  questionId: string;
  answers: Array<{ id: string; text: string }>;
  registerName: `questions.${number}.answerId`;
  register: ReturnType<typeof useForm<ExamQuestionsFormValues>>["register"];
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Intentionally render as label+radio for large click target */}
      {answers.map((ans) => {
        const inputId = `q_${questionId}_a_${ans.id}`;

        return (
          <label
            key={ans.id}
            htmlFor={inputId}
            className="p-4 flex bg-gray-50 hover:bg-gray-100 items-center gap-2.5 cursor-pointer transition-all"
          >
            <input
              id={inputId}
              type="radio"
              value={ans.id}
              className="accent-primary w-4 h-4"
              {...register(registerName, { required: true })}
            />
            <span className="text-gray-800">{ans.text}</span>
          </label>
        );
      })}
    </div>
  );
}
