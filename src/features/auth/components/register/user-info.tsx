"use client";
import UserInfoForm from "@/shared/components/global/forms/user-info-form";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  UserInfoFormData,
  userInfoSchema,
} from "../../schemas/register.schema";

interface UserInfoProps {
  email: string;
  setStep: (step: string) => void;
  formData: Partial<RegisterFormData>;
  setFormData: (data: Partial<RegisterFormData>) => void;
}

export default function UserInfo({
  email,
  setStep,
  formData,
  setFormData,
}: UserInfoProps) {
  const form = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      username: formData.username || "",
      email: email,
      phone: formData.phone || "",
    },
  });

  const handleSubmit = (data: UserInfoFormData) => {
    setFormData(data);
    setStep("password");
  };

  return (
    <>
      <div className="text-2xl text-primary font-inter font-bold">
        Tell us more about you
      </div>

      {/* User Info Form */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col font-geist-mono mt-4 py-4 gap-4"
      >
        {/* Form */}
        <UserInfoForm form={form} mode="create" />

        {/* Next Button */}
        <Button
          type="submit"
          variant="secondary"
          className="mt-8"
          disabled={form.formState.isSubmitting}
        >
          Next <ChevronRight />
        </Button>
      </form>
    </>
  );
}
