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
import { EmailFormData, emailSchema } from "../../schemas/register.schema";
import { ChevronRight, Loader2 } from "lucide-react";
import FallbackError from "@/shared/components/global/fallback-error";
import Link from "next/link";
// import { useForgotPassword } from "../../hooks/use-forgot-password";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import useForgotPassword from "../../hooks/forgot-password/use-forgot-password";
import { useEffect } from "react";
import { useRef } from "react";

interface ForgotEmailInputProps {
  setStep: (step: string) => void;
  setEmail: (email: string) => void;
}

export default function ForgotEmailInput({
  setStep,
  setEmail,
}: ForgotEmailInputProps) {
  const { mutate: forgotPassword, isPending, error } = useForgotPassword();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<{
    email: string;
  }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: EmailFormData) => {
    forgotPassword(values, {
      onSuccess: () => {
        setEmail(values.email);
        setStep("reset-link");
      },
    });
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <>
      {/* Email Input */}
      <form
        className="flex flex-col font-geist-mono"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  type="string"
                  autoComplete="email"
                  placeholder="user@example.com"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  ref={emailInputRef}
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
          variant="default"
          type="submit"
          className="mt-10"
          disabled={
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            <>
              Next <ChevronRight className="text-white" />
            </>
          )}
        </Button>
      </form>

      {/* Error Display */}
      {error && <FallbackError error={error.message} />}

      {/* Login Link */}
      <p className="text-sm font-medium text-gray-500 text-center mt-9">
        Don&apos;t have an account?
        <Link href="/register" className="text-primary">
          {" "}
          Create yours
        </Link>
      </p>
    </>
  );
}
