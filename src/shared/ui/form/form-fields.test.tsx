import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckboxField, TextField } from ".";

describe("shared form fields", () => {
  it("associates a text field with its label and error", () => {
    render(
      <TextField
        error="Email không hợp lệ"
        id="email"
        label="Email"
        type="email"
      />,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Email không hợp lệ");
  });

  it("associates a checkbox with its label and description", () => {
    render(
      <CheckboxField
        description="Chỉ áp dụng trên thiết bị này"
        id="remember"
        label="Ghi nhớ đăng nhập"
      />,
    );

    expect(screen.getByLabelText("Ghi nhớ đăng nhập")).toHaveAccessibleDescription(
      "Chỉ áp dụng trên thiết bị này",
    );
  });
});
