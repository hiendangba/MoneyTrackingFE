export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export function validateLoginForm({
  email,
  password,
}: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!password) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else {
    const passwordErrors: string[] = [];

    if (password.length <= 8) {
      passwordErrors.push("Mật khẩu phải có hơn 8 ký tự");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Mật khẩu phải có ít nhất 1 chữ hoa");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("Mật khẩu phải có ít nhất 1 chữ thường");
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push("Mật khẩu phải có ít nhất 1 chữ số");
    }

    if (passwordErrors.length > 0) {
      errors.password = passwordErrors.join("; ");
    }
  }

  return errors;
}
