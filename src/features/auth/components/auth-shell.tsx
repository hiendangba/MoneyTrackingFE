"use client";

import type { ReactNode } from "react";
import { Notification, NotificationVariant } from "@/shared/ui/notification";
import { AuthNotificationProvider, useAuthNotification } from "./auth-notification-context";
import { AppFooter, AppHeader } from "@/shared/ui/layout";

type AuthShellProps = {
  children: ReactNode;
};



export function AuthShell({ children }: AuthShellProps) {
  return (
    <AuthNotificationProvider>
      <main className="min-h-dvh bg-brand-50 px-5 py-5 text-ink sm:px-6 lg:px-8">
        <section className="mx-auto flex min-h-[calc(100dvh-40px)] w-full max-w-[560px] flex-col">
          <header className="shrink-0">
            <AppHeader />
          </header>

          <div className="flex flex-1 items-center py-5 sm:py-6">
            <div className="w-full rounded-2xl border border-line bg-white/82 px-5 py-6 shadow-[0_20px_56px_rgba(249,115,22,0.12)] sm:px-7 sm:py-7">
              {children}
            </div>
          </div>

          <AppFooter />
        </section>

        <AuthNotification />
      </main>
    </AuthNotificationProvider>
  );
}

function AuthNotification() {
  const { feedback, clearNotification } = useAuthNotification();
  if (!feedback) return null;

  return (
    <Notification
      message={feedback}
      onClose={clearNotification}
      title="Đăng nhập"
      variant={NotificationVariant.Success}
    />
  );
}
