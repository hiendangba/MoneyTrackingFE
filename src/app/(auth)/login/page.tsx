import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return <LoginForm />;
}
