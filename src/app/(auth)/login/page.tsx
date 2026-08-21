import type { Metadata } from "next";
import { LoginView } from "@/features/auth";
import { getTranslation, TranslationKey } from "@/shared/i18n";
import { getRequestLocale } from "@/shared/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();

  return {
    title: await getTranslation(TranslationKey.AuthLoginTitle, locale),
  };
}

export default function LoginPage() {
  return <LoginView />;
}
