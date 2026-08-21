"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckboxField, TextField } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { TranslationKey, useI18n } from "@/shared/i18n";
import { AuthDivider } from "./auth-divider";
import { GoogleButton } from "./google-button";
import {
  validateRegisterInput,
  type RegisterValidationErrors,
} from "../validation/register-validation";

export function RegisterView() {
  const { t } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<RegisterValidationErrors>({});

  function handleSubmit() {
    const nextErrors = validateRegisterInput({
      fullName,
      email,
      password,
      acceptTerms,
    }, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback("");
      return;
    }

    setFeedback(t(TranslationKey.AuthRegisterFeedback));
  }

  return (
    <div className="w-full">
      <header className="mb-5">
        <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-brand-500 uppercase">
          {t(TranslationKey.AuthRegisterEyebrow)}
        </p>
        <h2 className="mt-1.5 text-[clamp(28px,5vw,34px)] leading-tight font-bold tracking-[-0.035em]">
          {t(TranslationKey.AuthRegisterTitle)}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {t(TranslationKey.AuthRegisterSubtitle)}
        </p>
      </header>

      <GoogleButton />
      <AuthDivider />

      <div className="grid gap-3.5">
        <TextField
          autoComplete="name"
          id="full-name"
          label={t(TranslationKey.AuthFullName)}
          name="fullName"
          onChange={(event) => {
            setFullName(event.target.value);
            setFeedback("");
          }}
          placeholder="Nguyễn Văn An"
          type="text"
          value={fullName}
          error={errors.fullName}
        />
        <TextField
          autoComplete="email"
          id="register-email"
          label={t(TranslationKey.CommonEmail)}
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
            setFeedback("");
          }}
          placeholder="ban@example.com"
          type="email"
          value={email}
          error={errors.email}
        />
        <TextField
          autoComplete="new-password"
          id="register-password"
          label={t(TranslationKey.CommonPassword)}
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
            setFeedback("");
          }}
          placeholder={t(TranslationKey.AuthNewPasswordPlaceholder)}
          type="password"
          value={password}
          error={errors.password}
        />

        <CheckboxField
          checked={acceptTerms}
          id="terms"
          label={
            <>
              {t(TranslationKey.AuthTermsPrefix)}{" "}
              <Link
                className="font-semibold text-brand-600 hover:text-brand-500"
                href="#terms"
              >
                {t(TranslationKey.AuthTerms)}
              </Link>{" "}
              {t(TranslationKey.AuthTermsMiddle)}{" "}
              <Link
                className="font-semibold text-brand-600 hover:text-brand-500"
                href="#privacy"
              >
                {t(TranslationKey.AuthPrivacy)}
              </Link>
              .
            </>
          }
          name="terms"
          onChange={(event) => {
            setAcceptTerms(event.target.checked);
            setFeedback("");
          }}
          aria-invalid={errors.acceptTerms ? true : undefined}
        />
        {errors.acceptTerms ? (
          <p className="-mt-2 m-0 text-xs text-red-500" role="alert">
            {errors.acceptTerms}
          </p>
        ) : null}

        <Button
          onClick={handleSubmit}
          type="button"
          label={t(TranslationKey.AuthRegisterSubmit)}
        />

        {feedback ? (
          <p
            className="m-0 rounded-[10px] bg-brand-100 px-3 py-2.5 text-[13px] leading-6 text-[#6d330d]"
            role="status"
          >
            {feedback}
          </p>
        ) : null}
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        {t(TranslationKey.AuthAlreadyHaveAccount)}{" "}
        <Link
          className="font-semibold text-brand-600 hover:text-brand-500"
          href="/login"
        >
          {t(TranslationKey.AuthLoginLink)}
        </Link>
      </p>
    </div>
  );
}