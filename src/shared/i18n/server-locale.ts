import { cookies } from "next/headers";
import { getDefaultLocale } from "./translation";
import { LOCALE_COOKIE_NAME, normalizeLocale, type AppLocale } from "./locale";

export async function getRequestLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  return normalizeLocale(localeFromCookie, getDefaultLocale());
}
