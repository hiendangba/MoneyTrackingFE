"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckboxField, TextField } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { t, TranslationKey } from "@/shared/i18n";
import { AuthDivider } from "./auth-divider";
import { GoogleButton } from "./google-button";

export function RegisterForm() {
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

      <form className="grid gap-3.5" onSubmit={handleSubmit}>
        <TextField
          autoComplete="name"
          id="full-name"
          label={t(TranslationKey.AuthFullName)}
          name="fullName"
          placeholder="Nguyễn Văn An"
          required
          type="text"
        />
        <TextField
          autoComplete="email"
          id="register-email"
          label={t(TranslationKey.CommonEmail)}
          name="email"
          placeholder="ban@example.com"
          required
          type="email"
        />
        <TextField
          autoComplete="new-password"
          id="register-password"
          label={t(TranslationKey.CommonPassword)}
          minLength={8}
          name="password"
          placeholder={t(TranslationKey.AuthNewPasswordPlaceholder)}
          required
          type="password"
        />

        <CheckboxField
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
          required
        />

        <Button type="submit" label={t(TranslationKey.AuthRegisterSubmit)} />

        {feedback ? (
          <p
            className="m-0 rounded-[10px] bg-brand-100 px-3 py-2.5 text-[13px] leading-6 text-[#6d330d]"
            role="status"
          >
            {feedback}
          </p>
        ) : null}
      </form>

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
