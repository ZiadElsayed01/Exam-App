"use client";
import FallbackError from "@/shared/components/global/fallback-error";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import useSendOtp from "../../hooks/register/use-send-otp";
import { EmailFormData, emailSchema } from "../../schemas/register.schma";
import useOtpCounter from "../../hooks/register/use-otp-counter";

interface RegisterEmailInputProps {
  setStep: (step: string) => void;
  setEmail: (email: string) => void;
  autoFocus?: boolean;
}

export default function EmailInput({
  setStep,
  setEmail,
  autoFocus = false,
}: RegisterEmailInputProps) {
  const { mutate: sendOtp, isPending, error } = useSendOtp();
  const { setInLocalStorage, getRemainingTime } = useOtpCounter();
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [autoFocus]);

  const form = useForm<{
    email: string;
  }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    const remaining = getRemainingTime(data.email);

    if (remaining && remaining > 0) {
      setEmail(data.email);
      setStep("verify-otp");
      return;
    }

    sendOtp(
      { email: data.email },
      {
        onSuccess: () => {
          setInLocalStorage(data.email);
          setEmail(data.email);
          setStep("verify-otp");
        },
      },
    );
  };

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
                  ref={emailInputRef}
                  aria-invalid={fieldState.invalid}
                  type="string"
                  autoComplete="email"
                  placeholder="user@example.com"
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
          variant="secondary"
          type="submit"
          className="mt-10"
          disabled={
            isPending ||
            Object.keys(form.formState.errors).length > 0 ||
            (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : (
            <>
              Next <ChevronRight className="text-gray-800" />
            </>
          )}
        </Button>
      </form>

      {/* Error Display */}
      {error && <FallbackError error={error.message} />}

      {/* Login Link */}
      <p className="text-sm font-medium text-gray-500 text-center mt-9">
        Already have an account?
        <Link href="/login" className="text-primary">
          {" "}
          Login
        </Link>
      </p>
    </>
  );
}
