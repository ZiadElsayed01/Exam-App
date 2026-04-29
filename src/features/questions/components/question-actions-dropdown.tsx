import { ActionsDropdown } from "@/shared/components/global/actions-dropdown";
import { useDeleteQuestion } from "../hooks/use-questions";
import { toast } from "sonner";

interface QuestionActionsDropdown {
  viewLink: string;
  editLink: string;
  id: string;
}

export default function QuestionActionsDropdown({
  viewLink,
  editLink,
  id,
}: QuestionActionsDropdown) {
  const { mutate: deleteQuestion } = useDeleteQuestion(id);

  const handleDeleteQuestion = () => {
    deleteQuestion(undefined, {
      onSuccess: () => {
        toast.success("Question deleted successfully");
      },
    });
  };

  return (
    <ActionsDropdown
      viewLink={viewLink}
      editLink={editLink}
      onDelete={handleDeleteQuestion}
    />
  );
}
