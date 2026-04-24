import BreadCrumb from "@/shared/components/global/bread-crumb";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <BreadCrumb />

      <div className="p-6 bg-gray-50 min-h-screen">{children}</div>
    </section>
  );
}
