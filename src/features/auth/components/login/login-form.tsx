"use client";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { LoginCredentials } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import useLogin from "../../hooks/login/use-login";
import FallbackError from "@/shared/components/global/fallback-error";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginCredentials> = (values) => {
    login(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      {/* Username field */}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Password field */}
      <FieldGroup className="mt-4">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                type="password"
                autoComplete="current-password"
                placeholder="********"
                className={fieldState.invalid ? "border-destructive" : ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Forgot Password Link */}
      <Link
        href="/forgot-password"
        className="block mt-2.5 w-full text-right text-primary text-sm font-medium"
      >
        Forgot Password?
      </Link>

      {/* Error Display */}
      {error && <FallbackError error={error.message} />}

      {/* Submit button */}
      <Button
        type="submit"
        className="mt-10"
        disabled={
          isPending || (form.formState.isSubmitted && !form.formState.isValid)
        }
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}
