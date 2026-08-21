export type ForgotPasswordFormValues = {
  email: string;
};

export type ForgotPasswordFormErrors =
    Partial<Record<keyof ForgotPasswordFormValues, string>>;

export function validateForgotPasswordForm({
  email,
}: ForgotPasswordFormValues): ForgotPasswordFormErrors {
  const errors: ForgotPasswordFormErrors = {};

  if (!email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email không hợp lệ";
  }

  return errors;
}