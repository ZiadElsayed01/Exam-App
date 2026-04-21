import Header from "@/shared/components/global/header";
import { UserRound } from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <div>
      <Header
        icon={<UserRound width={45} height={45} />}
        title="Account Settings"
        isBack
      />
      AccountSettingsPage
    </div>
  );
}
