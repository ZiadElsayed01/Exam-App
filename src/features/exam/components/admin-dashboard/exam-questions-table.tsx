"use client";
import QuestionActionsDropdown from "@/features/questions/components/question-actions-dropdown";
import { SortDropdown } from "@/shared/components/global/sort-dropdown";
import { memo } from "react";
import { examQuestionSortOptions } from "../../constants/exam-questions.constants";
import { IQuestion } from "../../types/questions";
import { slugify } from "@/shared/lib/utils/utils";

interface ExamQuestionsTableProps {
  questions?: IQuestion[];
  slug: string;
}

function ExamQuestionsTable({ questions = [], slug }: ExamQuestionsTableProps) {
  return (
    <>
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-300 h-12">
          <tr>
            <th
              scope="col"
              className="px-4 text-left text-sm font-medium text-gray-800"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-4 text-right text-sm font-medium text-gray-800 w-20"
            >
              <SortDropdown sortOptions={examQuestionSortOptions} gray={true} />
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {questions?.map((question) => (
            <tr key={question.id} className="hover:bg-gray-50">
              <td className="px-4 py-2.5">
                <div className="text-sm font-medium text-gray-800">
                  {question.text}
                </div>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap flex items-center justify-end w-20">
                <QuestionActionsDropdown
                  viewLink={`/exams/${slugify(slug)}/questions/${slugify(question.text)}/${question.id}`}
                  editLink={`/exams/${slugify(slug)}/${question.examId}/edit-question/${question.id}`}
                  id={question.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!questions ||
        (questions.length === 0 && (
          <div className="text-center bg-white py-8">
            <p className="text-gray-500">No questions found</p>
          </div>
        ))}
    </>
  );
}

export default memo(ExamQuestionsTable);
