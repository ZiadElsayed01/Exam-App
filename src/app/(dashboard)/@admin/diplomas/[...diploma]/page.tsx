import { getDiplomaByIdAction } from "@/features/diplomas/apis/diploma.api";
import DiplomaBody from "@/features/diplomas/components/admin-dashboard/diploma-body";
import DiplomaHeader from "@/features/diplomas/components/admin-dashboard/diploma-header";
import { notFound } from "next/navigation";

interface DiplomaPageProps {
  params: Promise<{
    diploma: string[];
  }>;
}

export default async function DiplomaPage({ params }: DiplomaPageProps) {
  const { diploma } = await params;

  if (!diploma || diploma.length !== 2) {
    notFound();
  }

  const [, id] = diploma;

  const { diploma: diplomaData } = await getDiplomaByIdAction(id);
  console.log(diploma);

  if (!diploma) {
    notFound();
  }

  return (
    <>
      <DiplomaHeader
        title={diplomaData.title}
        editHref={`/edit-diploma/${diplomaData.id}`}
        id={diplomaData.id}
      />

      <div className="bg-gray-100 p-6 min-h-screen">
        <DiplomaBody diplomaData={diplomaData} />
      </div>
    </>
  );
}
