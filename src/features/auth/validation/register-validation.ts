import { TranslationKey } from "@/shared/i18n/translation-key";
import type { TranslateFn } from "@/shared/i18n/type";

export type RegisterInputValues = {
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export type RegisterValidationErrors = Partial<
  Record<keyof RegisterInputValues, string>
>;


export function validateRegisterInput({
  fullName,
  email,
  password,
  acceptTerms,
}: RegisterInputValues, translate: TranslateFn): RegisterValidationErrors {
  const errors: RegisterValidationErrors = {};

  if (!fullName.trim()) {
    errors.fullName = translate(TranslationKey.ValidationFullNameRequired);
  }

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

  if (!acceptTerms) {
    errors.acceptTerms = translate(TranslationKey.ValidationAcceptTermsRequired);
  }

  return errors;
}