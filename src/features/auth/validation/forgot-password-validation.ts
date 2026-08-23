import { TranslationKey } from "@/shared/i18n/translation-key";
import type { TranslateFn } from "@/shared/i18n/type";
export type ForgotPasswordInputValues = {
  email: string;
};

export type ForgotPasswordValidationErrors = Partial<
  Record<keyof ForgotPasswordInputValues, string>
>;


export function validateForgotPasswordInput({
  email,
}: ForgotPasswordInputValues, translate: TranslateFn): ForgotPasswordValidationErrors {
  const errors: ForgotPasswordValidationErrors = {};

  if (!email.trim()) {
    errors.email = translate(TranslationKey.ValidationEmailRequired);
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = translate(TranslationKey.ValidationEmailInvalid);
  }

  return errors;
}