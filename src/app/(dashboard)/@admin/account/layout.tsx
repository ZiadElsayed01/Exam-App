import SettingsSidebar from "@/features/account/components/settings-sidebar";
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
      <div className="p-6">
        <Header
          icon={<UserRound width={45} height={45} />}
          title="Account Settings"
          isBack
        />

        <div className="flex gap-6 h-screen">
          <SettingsSidebar />
          {children}
        </div>
      </div>
    </>
  );
}
