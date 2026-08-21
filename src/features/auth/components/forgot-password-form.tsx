"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { ApiError } from "@/shared/api";
import { t, TranslationKey } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";
import { TextField } from "@/shared/ui/form";
import { NotificationVariant } from "@/shared/ui/notification";
import { useNotification } from "@/shared/ui/notification/notification-context";
import { requestPasswordReset } from "../api/auth-api";
import {
  validateForgotPasswordForm,
  type ForgotPasswordFormErrors,
} from "../validation/forgot-password-validation";

export function ForgotPasswordForm() {
  const { notify } = useNotification();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForgotPasswordForm({ email });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset({ email: email.trim() });
      notify(response.message, NotificationVariant.Success);
    } catch (error) {
      notify(
        error instanceof ApiError
          ? error.message
          : t(TranslationKey.AuthForgotPasswordFallbackError),
        NotificationVariant.Error,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <header className="mb-5">
        <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-brand-500 uppercase">
          {t(TranslationKey.AuthForgotPasswordEyebrow)}
        </p>
        <h2 className="mt-1.5 text-[clamp(28px,5vw,34px)] leading-tight font-bold tracking-[-0.035em]">
          {t(TranslationKey.AuthForgotPasswordTitle)}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {t(TranslationKey.AuthForgotPasswordSubtitle)}
        </p>
      </header>

      <form className="grid gap-3.5" noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          id="forgot-password-email"
          label={t(TranslationKey.CommonEmail)}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ban@example.com"
          type="email"
          value={email}
          error={errors.email}
        />

        <Button
          className={isSubmitting ? "opacity-80" : ""}
          disabled={isSubmitting}
          label={
            isSubmitting
              ? t(TranslationKey.AuthForgotPasswordSubmitting)
              : t(TranslationKey.AuthForgotPasswordSubmit)
          }
          type="submit"
        />
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        <Link
          className="font-semibold text-brand-600 hover:text-brand-500"
          href="/login"
        >
          {t(TranslationKey.AuthBackToLogin)}
        </Link>
      </p>
    </div>
  );
}