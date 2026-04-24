import SettingsSidebar from "@/features/user-settings/components/settings-sidebar";
import Header from "@/shared/components/global/header";
import { UserRound } from "lucide-react";

interface AccountSettingsLayoutProps {
  children: React.ReactNode;
}

export default function AccountSettingsLayout({
  children,
}: AccountSettingsLayoutProps) {
  return (
    <>
      <Header
        icon={<UserRound width={45} height={45} />}
        title="Account Settings"
        isBack
      />

      <div className="flex gap-6 h-screen">
        <SettingsSidebar />
        {children}
      </div>
    </>
  );
}
