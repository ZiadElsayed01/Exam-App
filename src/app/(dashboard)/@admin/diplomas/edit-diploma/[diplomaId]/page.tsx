import DiplomaForm from "@/features/diplomas/components/admin-dashboard/diploma-form";
import { getDiplomaByIdAction } from "@/features/diplomas/apis/diploma.api";

interface IEditDiplomaPageProps {
  params: Promise<{
    diplomaId: string;
  }>;
}

export default async function EditDiplomaPage({
  params,
}: IEditDiplomaPageProps) {
  const { diplomaId } = await params;

  const diploma = await getDiplomaByIdAction(diplomaId);

  return <DiplomaForm isEdit diplomaId={diplomaId} diploma={diploma} />;
}
