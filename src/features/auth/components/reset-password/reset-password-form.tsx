"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import FallbackError from "@/shared/components/global/fallback-error";
import { Input } from "@/shared/components/ui/input";
import {
  ResetPasswordFormData,
  newPasswordSchema,
} from "../../schemas/reset-password.schema";
import useResetPassword from "../../hooks/reset-password/use-reset-password";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const { mutate: resetPassword, isPending, error } = useResetPassword();
  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const resetPasswordSubmit = (values: ResetPasswordFormData) => {
    resetPassword(values, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  if (!token) {
    return <FallbackError error="Invalid token" />;
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(resetPasswordSubmit)}
        className="flex flex-col font-geist-mono mt-4 py-4 gap-4"
      >
        <FieldGroup>
          {/* Password */}
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="newPassword">
                  New Password <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="newPassword"
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
                  Confirm New Password{" "}
                  <span className="text-destructive">*</span>
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
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </>
  );
}
