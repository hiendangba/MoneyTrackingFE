import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoginForm, RegisterForm } from ".";

describe("auth forms", () => {
  it("keeps the login submit feedback behavior", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Mật khẩu"), "password123");
    await user.click(screen.getByRole("button", { name: "Đăng nhập" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Biểu mẫu hợp lệ. Bước tiếp theo là kết nối API đăng nhập.",
    );
  });

  it("keeps the register submit feedback behavior", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Văn An");
    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Mật khẩu"), "password123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Biểu mẫu hợp lệ. Bước tiếp theo là kết nối API đăng ký.",
    );
  });
});
