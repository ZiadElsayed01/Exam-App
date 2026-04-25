"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  UpdatePasswordFormData,
} from "../schemas/update-user.schema";
import FallbackError from "@/shared/components/global/fallback-error";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUpdatePassword from "../hooks/use-update-password";

export default function UpdatePasswordForm() {
  const { mutate: updatePassword, isPending, error } = useUpdatePassword();

  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    updatePassword(data, {
      onSuccess: () => {
        toast.success("Your password has been updated.");
        form.reset();
      },
    });
  };

  return (
    <div className="bg-white w-full p-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col font-geist-mono gap-4"
      >
        {/* Current Password */}
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentPassword">
                  Current Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="currentPassword"
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

        {/* New Password */}
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
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

        {/* Confirm New Password */}
        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm New Password
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

        {/* Update Password Button */}
        <Button type="submit" variant="default" className="mt-4">
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}
