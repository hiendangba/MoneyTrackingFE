import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslation, TranslationKey } from "@/shared/i18n";
import { getRequestLocale } from "@/shared/i18n/server-locale";
import "./globals.css";
import { AppProviders } from "./app-providers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const [appName, appDescription] = await Promise.all([
    getTranslation(TranslationKey.AppName, locale),
    getTranslation(TranslationKey.AppDescription, locale),
  ]);

  return {
    title: {
      default: appName,
      template: `%s | ${appName}`,
    },
    description: appDescription,
  };
}

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale}>
      <body>
        <AppProviders initialLocale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}
