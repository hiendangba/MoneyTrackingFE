import { normalizeLocale, type AppLocale } from "./locale";
import { TranslationKey } from "./translation-key";
import { vietnameseTranslations } from "./vietnamese-translations";

type TranslationApiResponse = {
  value?: string | null;
  translation?: string | null;
  label?: string | null;
};

function fallbackVietnamese(key: TranslationKey) {
  return vietnameseTranslations[key] ?? key;
}

function normalizeTranslation(value: string | null | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

function extractTranslationValue(response: TranslationApiResponse) {
  return response.value ?? response.translation ?? response.label;
}

export function getDefaultLocale(): AppLocale {
  return normalizeLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, "vi");
}

export function resolveTranslation(
  key: TranslationKey,
  serviceValue?: string | null,
) {
  return normalizeTranslation(serviceValue) ?? fallbackVietnamese(key);
}

export function t(key: TranslationKey) {
  return fallbackVietnamese(key);
}

export async function getTranslation(
  key: TranslationKey,
  locale: AppLocale = getDefaultLocale(),
  signal?: AbortSignal,
) {
  const resolvedLocale = normalizeLocale(locale, getDefaultLocale());
  const endpoint = process.env.NEXT_PUBLIC_TRANSLATION_API_URL?.trim();

  if (!endpoint) {
    return fallbackVietnamese(key);
  }

  try {
    const url = new URL(endpoint);
    url.searchParams.set("key", key);
    url.searchParams.set("locale", resolvedLocale);

    const response = await fetch(url, { signal });

    if (!response.ok) {
      return fallbackVietnamese(key);
    }

    const data = (await response.json()) as TranslationApiResponse;

    return resolveTranslation(key, extractTranslationValue(data));
  } catch {
    return fallbackVietnamese(key);
  }
}
