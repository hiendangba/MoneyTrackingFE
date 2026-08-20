"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { CheckboxField, TextField } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { t, TranslationKey } from "@/shared/i18n";
import { AuthDivider } from "./auth-divider";
import { GoogleButton } from "./google-button";
import { useNotification } from "@/shared/ui/notification/notification-context";
import { ApiError } from "@/shared/api";
import { NotificationVariant } from "@/shared/ui/notification";
import { login } from "../api/auth-api";
import { Eye, EyeClosed } from "lucide-react";
import {
  validateLoginForm,
  type LoginFormErrors,
} from "../validation/login-validation";

export function LoginForm() {
  const { notify } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateLoginForm({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const response = await login({ email: email.trim(), password });
      notify(response.message, NotificationVariant.Success);
    } catch (error) {
      notify(
        error instanceof ApiError ? error.message : "Đăng nhập thất bại",
        NotificationVariant.Error,
      );
    }
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

      <form className="grid gap-3.5" noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          id="email"
          label={t(TranslationKey.CommonEmail)}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ban@example.com"
          type="email"
          value={email}
          error={errors.email}
        />

        <TextField
          autoComplete="current-password"
          id="password"
          label={t(TranslationKey.CommonPassword)}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <button
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="text-muted transition hover:text-ink"
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? (
                <EyeClosed aria-hidden="true" className="size-7" />
              ) : (
                <Eye aria-hidden="true" className="size-7" />
              )}
            </button>
          }
          placeholder="Nhập mật khẩu"
          type={showPassword ? "text" : "password"}
          value={password}
          error={errors.password}
        />

        <div className="mt-1 text-right text-sm">
          <Link
            className="font-semibold text-brand-600 hover:text-brand-500"
            href="#forgot-password"
          >
            {t(TranslationKey.AuthForgotPassword)}
          </Link>
        </div>

        <CheckboxField
          id="remember"
          label={t(TranslationKey.AuthRememberLogin)}
        />

        <Button type="submit" label={t(TranslationKey.AuthLoginSubmit)} />
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
