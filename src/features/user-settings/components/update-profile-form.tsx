"use client";
import {
  UserInfoFormData,
  userInfoSchema,
} from "@/features/auth/schemas/register.schema";
import { IUser } from "@/features/auth/types/user";
import FallbackError from "@/shared/components/global/fallback-error";
import UserInfoForm from "@/shared/components/global/forms/user-info-form";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useProfile from "../hooks/use-profile";
import { UserUpdateInfoFormData } from "../schemas/update-user.schema";
import DeleteAccountDialog from "./delete-account-dialog";

interface UpdateProfileProps {
  profilePromise: Promise<IUser | null>;
}

export default function UpdateProfile({ profilePromise }: UpdateProfileProps) {
  const user = use(profilePromise);
  const { updateProfile, isUpdating, updateError } = useProfile();

  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email,
      username: user?.username,
      profilePhoto: user?.profilePhoto || "",
    },
  });

  const handleSubmit = async (values: UserUpdateInfoFormData) => {
    const updatedValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      profilePhoto: values.profilePhoto,
    };
    updateProfile(updatedValues, {
      onSuccess: () => {
        toast.success("Profile Updated Successfully");
      },
    });
  };

  return (
    <div className="bg-white w-full p-6">
      {/* Update Form */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col font-geist-mono gap-4"
      >
        <UserInfoForm form={form} mode="update" />

        {updateError && <FallbackError error={updateError.message} />}

        <div className="grid grid-cols-2 gap-3.5 w-full mt-4">
          <DeleteAccountDialog />
          <Button
            type="submit"
            disabled={!form.formState.isDirty || isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
