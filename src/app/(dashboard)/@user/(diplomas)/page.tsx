import DiplomaList from "@/features/diplomas/components/diploma-list";
import BreadCrumb from "@/shared/components/global/bread-crumb";
import Header from "@/shared/components/global/header";
import { GraduationCap } from "lucide-react";

export default function DiplomasPage() {
  return (
    <>
      {/* BreadCrumb */}
      <BreadCrumb />

      {/* Main Content */}
      <div className="p-6">
        <Header
          title="Diplomas"
          icon={<GraduationCap width={45} height={45} />}
        />

        {/* Diploma List */}
        <DiplomaList />
      </div>
    </>
  );
}
