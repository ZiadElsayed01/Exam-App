"use client";
import SubHeader from "@/shared/components/global/sub-header";
import { useRouter } from "next/navigation";
import { useDeleteDiploma } from "../../hooks/use-diploma";
import { toast } from "sonner";

interface DiplomaHeaderProps {
  title: string;
  editHref: string;
  id: string;
}

export default function DiplomaHeader({
  title,
  editHref,
  id,
}: DiplomaHeaderProps) {
  const router = useRouter();
  const { mutate: deleteDiploma } = useDeleteDiploma(id);

  const handleDeleteDiploma = () => {
    deleteDiploma(undefined, {
      onSuccess: () => {
        router.push("/");
        toast.success("Diploma deleted successfully");
      },
    });
  };

  const handleImmutable = () => {
    // TODO: Implement immutable functionality
    console.log("Make diploma immutable");
  };

  return (
    <SubHeader
      title={title}
      editHref={editHref}
      onImmutable={handleImmutable}
      onDelete={handleDeleteDiploma}
    />
  );
}
