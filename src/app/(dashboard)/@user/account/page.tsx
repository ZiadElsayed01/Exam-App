import { getProfile } from "@/features/user-settings/apis/profile.api";
import UpdateProfile from "@/features/user-settings/components/update-profile-form";

export default function ProfilePage() {
  const profilePromise = getProfile();

  return <UpdateProfile profilePromise={profilePromise} />;
}
