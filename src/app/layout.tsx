import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "./app-providers";

export const metadata: Metadata = {
  title: {
    default: "Money Tracking",
    template: "%s | Money Tracking",
  },
  description: "Quản lý thu chi cá nhân đơn giản và rõ ràng.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body><AppProviders>{children}</AppProviders></body>
    </html>
  );
}
