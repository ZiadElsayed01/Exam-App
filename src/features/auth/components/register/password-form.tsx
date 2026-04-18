"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import {
  PasswordFormData,
  RegisterFormData,
  passwordSchema,
} from "../../schemas/register.schema";
import useRegister from "../../hooks/register/use-register";
import FallbackError from "@/shared/components/global/fallback-error";

interface PasswordFormProps {
  formData: Partial<RegisterFormData>;
}

export default function PasswordForm({ formData }: PasswordFormProps) {
  const { mutate: registerMutation, isPending, error } = useRegister();
  const router = useRouter();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
    },
  });

  const registerSubmit = async (data: PasswordFormData) => {
    const completeData: RegisterFormData = {
      ...formData,
      ...data,
    } as RegisterFormData;

    registerMutation(completeData, {
      onSuccess: () => {
        localStorage.removeItem("otp_resend_time");
        router.push("/login");
      },
    });
  };

  return (
    <>
      <div className="text-2xl text-primary font-inter font-bold">
        Create a strong password
      </div>

      {/* Password Form */}
      <form
        onSubmit={form.handleSubmit(registerSubmit)}
        className="flex flex-col font-geist-mono mt-4 py-4 gap-4"
      >
        <FieldGroup>
          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                    className={
                      fieldState.invalid ? "border-destructive pr-10" : "pr-10"
                    }
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                  className={
                    fieldState.invalid ? "border-destructive pr-10" : "pr-10"
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {error && <FallbackError error={error.message} />}

        {/* Create Account Button */}
        <Button
          type="submit"
          variant="default"
          className="mt-8"
          disabled={
            isPending ||
            Object.keys(form.formState.errors).length > 0 ||
            (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ||
          (form.formState.isSubmitted && !form.formState.isValid) ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </>
  );
}
