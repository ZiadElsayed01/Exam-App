import SettingsSidebar from "@/features/user-settings/components/settings-sidebar";
import BreadCrumb from "@/shared/components/global/bread-crumb";


interface AccountSettingsLayoutProps {
  children: React.ReactNode;
}

export default function AccountSettingsLayout({
  children,
}: AccountSettingsLayoutProps) {
  return (
    <>
      <BreadCrumb />
      <SettingsSidebar />
      {children}
    </>
  );
}
