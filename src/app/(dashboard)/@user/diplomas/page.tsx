import DiplomaList from "@/features/diplomas/components/diploma-list";
import Header from "@/shared/components/global/header";
import { GraduationCap } from "lucide-react";

export default function DiplomasPage() {
  return (
    <>
      {/* Main Content */}
      <Header
        title="Diplomas"
        icon={<GraduationCap width={45} height={45} />}
      />

      {/* Diploma List */}
      <DiplomaList />
    </>
  );
}
