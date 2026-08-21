import type { ReactNode } from "react";
import { AuthShell } from "@/features/auth";
import { LanguageSwitcher } from "@/shared/i18n";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthShell actionSlot={<LanguageSwitcher />}>{children}</AuthShell>;
}
