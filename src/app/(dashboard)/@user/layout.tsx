import BreadCrumb from "@/shared/components/global/bread-crumb";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <section>
        <BreadCrumb />
      </section>
      <section className="p-6 bg-gray-50 min-h-screen">{children}</section>
    </div>
  );
}
