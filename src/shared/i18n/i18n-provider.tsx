"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LOCALE_COOKIE_NAME, normalizeLocale, type AppLocale } from "./locale";
import {
  getDefaultLocale,
  getTranslation,
  t as fallbackVietnameseTranslation,
} from "./translation";
import { TranslationKey, type TranslationKey as TranslationKeyType } from "./translation-key";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: (key: TranslationKeyType) => string;
};

type TranslationDictionary = Partial<Record<TranslationKeyType, string>>;

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

type I18nProviderProps = {
  children: ReactNode;
  initialLocale: AppLocale;
};

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<AppLocale>(() =>
    normalizeLocale(initialLocale, getDefaultLocale()),
  );
  const [dictionaries, setDictionaries] = useState<
    Partial<Record<AppLocale, TranslationDictionary>>
  >({});

  const setLocale = useCallback((nextLocale: AppLocale) => {
    setLocaleState(normalizeLocale(nextLocale, getDefaultLocale()));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [locale]);

  useEffect(() => {
    if (dictionaries[locale]) {
      return;
    }

    const abortController = new AbortController();
    let disposed = false;

    async function loadLocaleDictionary() {
      const translationKeys = Object.values(TranslationKey) as TranslationKeyType[];
      const translationEntries = await Promise.all(
        translationKeys.map(async (key) => {
          const value = await getTranslation(key, locale, abortController.signal);

          return [key, value] as const;
        }),
      );

      if (disposed) {
        return;
      }

      const translationDictionary = Object.fromEntries(
        translationEntries,
      ) as TranslationDictionary;

      setDictionaries((current) => ({
        ...current,
        [locale]: translationDictionary,
      }));
    }

    void loadLocaleDictionary();

    return () => {
      disposed = true;
      abortController.abort();
    };
  }, [dictionaries, locale]);

  const activeDictionary = dictionaries[locale];

  const translate = useCallback(
    (key: TranslationKeyType) =>
      activeDictionary?.[key] ?? fallbackVietnameseTranslation(key),
    [activeDictionary],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t: translate }),
    [locale, setLocale, translate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
