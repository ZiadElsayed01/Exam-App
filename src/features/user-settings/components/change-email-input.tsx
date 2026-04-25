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
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import useUpdateEmail from "../hooks/use-update-email";
import {
  ChangeEmailFormData,
  changeEmailSchema,
} from "../schemas/update-user.schema";

interface ChangeEmailInputProp {
  setStep: (step: string) => void;
  setEmail: (email: string) => void;
  autoFocus?: boolean;
}

export default function ChangeEmailInput({
  setStep,
  setEmail,
}: ChangeEmailInputProp) {
  const { mutate: updatePassword, isPending, error } = useUpdateEmail();

  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const onSubmit = (data: ChangeEmailFormData) => {
    updatePassword(data, {
      onSuccess: () => {
        setEmail(data.newEmail);
        setStep("verify-otp");
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="px-9 mt-7.5">
        <Controller
          name="newEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newEmail">Email</FieldLabel>
              <Input
                {...field}
                id="newEmail"
                ref={emailInputRef}
                aria-invalid={fieldState.invalid}
                type="string"
                autoComplete="email"
                placeholder="user@example.com"
                className={fieldState.invalid ? "border-destructive" : ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && (
        <div className="px-9">
          <FallbackError error={error.message} />
        </div>
      )}

      <div className="mt-11 p-6 border border-gray-200 bg-gray-50">
        <Button
          variant="default"
          type="button"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
          disabled={
            isPending ||
            Object.keys(form.formState.errors).length > 0 ||
            (form.formState.isSubmitted && !form.formState.isValid)
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
      </div>
    </form>
  );
}
