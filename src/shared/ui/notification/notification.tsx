import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const NotificationVariant = {
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type NotificationVariant = "success" | "warning" | "error";

type NotificationProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  variant: NotificationVariant;
  title?: string;
  message: ReactNode;
  onClose?: () => void;
};

const variantStyles: Record<
  NotificationVariant,
  { container: string; icon: string; label: string; symbol: string }
> = {
  success: {
    container: "border-emerald-400 bg-emerald-200 text-emerald-950",
    icon: "bg-emerald-300 text-emerald-800",
    label: "Thành công",
    symbol: "✓",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "bg-amber-100 text-amber-700",
    label: "Cảnh báo",
    symbol: "!",
  },
  error: {
    container: "border-red-400 bg-red-200 text-black",
    icon: "bg-red-300 text-black",
    label: "Lỗi",
    symbol: "×",
  },
};

export function Notification({
  variant,
  title,
  message,
  onClose,
  className = "",
  ...props
}: NotificationProps) {
  const styles = variantStyles[variant];

  return (
    <div
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`!fixed !top-4 !right-5 !left-auto z-50 flex w-[min(calc(100vw-2rem),24rem)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg shadow-black/10 ${styles.container} ${className}`}
      role={variant === "error" ? "alert" : "status"}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${styles.icon}`}
      >
        {styles.symbol}
      </span>

      <div className="min-w-0 flex-1 text-sm leading-5">
        <p className="m-0 font-semibold">{title ?? styles.label}</p>
        <div className="mt-0.5 text-current/80">{message}</div>
      </div>

      {onClose ? (
        <button
          aria-label="Đóng thông báo"
          className="-mr-1 -mt-1 rounded-md px-1.5 py-1 text-lg leading-none opacity-70 transition hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
