import { ActionsDropdown } from "@/shared/components/global/actions-dropdown";
import { useDeleteDiploma } from "../../hooks/use-diploma";
import { toast } from "sonner";

interface DiplomaActionsDropdown {
  viewLink: string;
  editLink: string;
  id: string;
}

export default function DiplomaActionsDropdown({
  viewLink,
  editLink,
  id,
}: DiplomaActionsDropdown) {
  const { mutate: deleteDiploma } = useDeleteDiploma(id);

  const handleDeleteDiploma = () => {
    deleteDiploma(undefined, {
      onSuccess: () => {
        toast.success("Diploma deleted successfully");
      },
    });
  };

  return (
    <ActionsDropdown
      viewLink={viewLink}
      editLink={editLink}
      onDelete={handleDeleteDiploma}
    />
  );
}
