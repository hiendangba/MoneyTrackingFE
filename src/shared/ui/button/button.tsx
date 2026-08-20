import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  width?: string;
  height?: string;
};

// Chỉnh màu button dùng chung của toàn hệ thống tại đây.
const buttonColors =
  "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500/20";

export function Button({
  children,
  label,
  width = "w-full",
  height = "min-h-12",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex ${height} ${width} items-center justify-center rounded-xl px-4 py-2.5 font-bold transition hover:-translate-y-px focus-visible:ring-4 focus-visible:outline-none ${buttonColors} ${className}`}
      type={type}
      {...props}
    >
      {label ?? children}
    </button>
  );
}
