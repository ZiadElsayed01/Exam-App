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
import { ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  UserInfoFormData,
  userInfoSchema,
  RegisterFormData,
} from "../../schemas/register.schma";
import { PhoneInput } from "../../../../shared/components/ui/phone-input";

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
    console.log("User info data:", data);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
          {/* First Name */}
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
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
                    Last Name <span className="text-destructive">*</span>
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

        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...field}
                  id="username"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  autoComplete="username"
                  placeholder="user123"
                  className={fieldState.invalid ? "border-destructive" : ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

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
