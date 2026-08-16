"use client";

import Link from "next/link";
import { type SubmitEvent } from "react";
import { CheckboxField, TextField } from "@/shared/ui/form";
import { t, TranslationKey } from "@/shared/i18n";
import { AuthDivider } from "./auth-divider";
import { GoogleButton } from "./google-button";
import { useAuthNotification } from "./auth-notification-context";

export function LoginForm() {
  const { notify } = useAuthNotification();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    notify(t(TranslationKey.AuthLoginSubmit));
  }

  return (
    <div className="w-full">
      <header className="mb-5">
        <p className="m-0 text-[13px] font-bold tracking-[0.1em] text-brand-500 uppercase">
          {t(TranslationKey.AuthLoginEyebrow)}
        </p>
        <h2 className="mt-1.5 text-[clamp(28px,5vw,34px)] leading-tight font-bold tracking-[-0.035em]">
          {t(TranslationKey.AuthLoginTitle)}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {t(TranslationKey.AuthLoginSubtitle)}
        </p>
      </header>

      <GoogleButton />
      <AuthDivider />

      <form className="grid gap-3.5" onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          id="email"
          label={t(TranslationKey.CommonEmail)}
          name="email"
          placeholder="ban@example.com"
          required
          type="email"
        />

        <TextField
          autoComplete="current-password"
          id="password"
          label={t(TranslationKey.CommonPassword)}
          labelAction={
            <Link href="#forgot-password">
              {t(TranslationKey.AuthForgotPassword)}
            </Link>
          }
          name="password"
          placeholder="Nhập mật khẩu"
          required
          type="password"
        />

        <CheckboxField
          id="remember"
          label={t(TranslationKey.AuthRememberLogin)}
        />

        <button
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-brand-600 focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none"
          type="submit"
        >
          {t(TranslationKey.AuthLoginSubmit)}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {t(TranslationKey.AuthNoAccount)}{" "}
        <Link
          className="font-semibold text-brand-600 hover:text-brand-500"
          href="/register"
        >
          {t(TranslationKey.AuthRegisterFree)}
        </Link>
      </p>
    </div>

  );
}
