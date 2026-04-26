export type ExamQuestionFormItem = {
  questionId: string;
  answerId: string;
};

export type ExamQuestionsFormValues = {
  examId: string;
  questions: ExamQuestionFormItem[];
  startedAt: string;
};

export type CreateSubmissionPayload = {
  examId: string;
  startedAt: string;
  answers: ExamQuestionFormItem[];
};

interface ISubmission {
  submission: {
    id: string;
    userId: string;
    examId: string;
    examTitle: string;
    exam: {
      id: string;
      title: string;
      duration: number;
    };
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  analytics: {
    questionId: string;
    questionText: string;
    selectedAnswer: {
      id: string;
      text: string;
    };
    isCorrect: boolean;
    correctAnswer: {
      id: string;
      text: string;
    };
  }[];
}

export type { ISubmission };
