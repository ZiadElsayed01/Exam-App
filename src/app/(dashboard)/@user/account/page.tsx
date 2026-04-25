import { getProfileAction } from "@/features/account/apis/account.api";
import UpdateProfile from "@/features/account/components/update-profile-form";

export default function ProfilePage() {
  const profilePromise = getProfileAction();

  return <UpdateProfile profilePromise={profilePromise} />;
}
