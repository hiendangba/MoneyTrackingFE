export const SUPPORTED_LOCALES = ["vi", "en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_COOKIE_NAME = "money_tracking_locale";

export function isSupportedLocale(
  value: string | null | undefined,
): value is AppLocale {
  return value === "vi" || value === "en";
}

export function normalizeLocale(
  value: string | null | undefined,
  fallback: AppLocale = "vi",
): AppLocale {
  return isSupportedLocale(value) ? value : fallback;
}
