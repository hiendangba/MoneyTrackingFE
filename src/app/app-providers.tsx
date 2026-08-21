"use client";

import type { ReactNode } from "react";
import { I18nProvider, type AppLocale } from "@/shared/i18n";
import { NotificationProvider } from "@/shared/ui/notification/notification-context";

type AppProvidersProps = {
  children: ReactNode;
  initialLocale: AppLocale;
};

export function AppProviders({ children, initialLocale }: AppProvidersProps) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <NotificationProvider>{children}</NotificationProvider>
    </I18nProvider>
  );
}
