"use client";
import { UserInfoFormData } from "@/features/auth/schemas/register.schema";
import { PencilLine } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { PhoneInput } from "../../ui/phone-input";
import ChangeEmailDialog from "@/features/user-settings/components/change-email-dialog";

interface UserInfoFormProps {
  form: UseFormReturn<UserInfoFormData>;
  mode: "create" | "update";
}

export default function UserInfoForm({ form, mode }: UserInfoFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        {/* First Name */}
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">
                  First Name{" "}
                  {mode === "create" && (
                    <span className="text-destructive">*</span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  id="firstName"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="firstName"
                  placeholder="Ahmed"
                  className={fieldState.invalid ? "border-destructive" : ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Last Name */}
        <FieldGroup>
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">
                  Last Name{" "}
                  {mode === "create" && (
                    <span className="text-destructive">*</span>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  id="lastName"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="lastName"
                  placeholder="Abdullah"
                  className={fieldState.invalid ? "border-destructive" : ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      {/* User Name */}
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">
                Username{" "}
                {mode === "create" && (
                  <span className="text-destructive">*</span>
                )}
              </FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                type="text"
                autoComplete="username"
                placeholder="user123"
                className={fieldState.invalid ? "border-destructive" : ""}
                disabled={mode === "update"}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Email */}
      {mode === "update" && (
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex justify-between">
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  {mode === "update" && (
                    <ChangeEmailDialog
                      trigger={
                        <button
                          type="button"
                          className="flex gap-1.5 items-center text-primary cursor-pointer"
                        >
                          <PencilLine className="w-4 h-4" />
                          Change
                        </button>
                      }
                      onEmailVerified={(newEmail) => {
                        form.setValue("email", newEmail, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  )}
                </div>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="email"
                  placeholder="user@example.com"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  readOnly
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      )}

      {/* Phone */}
      <FieldGroup>
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <PhoneInput
                {...field}
                id="phone"
                aria-invalid={fieldState.invalid}
                type="text"
                autoComplete="phone"
                placeholder="1012345678"
                defaultCountry="EG"
                className={fieldState.invalid ? "border-destructive" : ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
