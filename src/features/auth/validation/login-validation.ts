import { TranslationKey } from "@/shared/i18n/translation-key";
import type { TranslateFn } from "@/shared/i18n/type";
export type LoginInputValues = {
  email: string;
  password: string;
};

export type LoginValidationErrors = Partial<
  Record<keyof LoginInputValues, string>
>;


export function validateLoginInput({
  email,
  password,
}: LoginInputValues, translate: TranslateFn): LoginValidationErrors {
  const errors: LoginValidationErrors = {};

  if (!email.trim()) {
    errors.email = translate(TranslationKey.ValidationEmailRequired);
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = translate(TranslationKey.ValidationEmailInvalid);
  }

  if (!password) {
    errors.password = translate(TranslationKey.ValidationPasswordRequired);
  } else {
    const passwordErrors: string[] = [];

    if (password.length <= 8) {
      passwordErrors.push(translate(TranslationKey.ValidationPasswordMinLength));
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push(translate(TranslationKey.ValidationPasswordUppercase));
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push(translate(TranslationKey.ValidationPasswordLowercase));
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push(translate(TranslationKey.ValidationPasswordNumber));
    }

    if (passwordErrors.length > 0) {
      errors.password = passwordErrors.join(", ");
    }
  }

  return errors;
}
