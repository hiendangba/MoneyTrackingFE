"use client";

import { useI18n } from "./i18n-provider";
import { SUPPORTED_LOCALES, type AppLocale } from "./locale";
import { TranslationKey } from "./translation-key";

const localeLabelMap: Record<AppLocale, TranslationKey> = {
  vi: TranslationKey.CommonLanguageVietnamese,
  en: TranslationKey.CommonLanguageEnglish,
};

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="fixed top-4 right-8 z-40 sm:right-10 lg:right-14">
      <div
        aria-label={t(TranslationKey.CommonLanguage)}
        className="inline-flex items-center rounded-xl border border-[#e8dccf] bg-[#f8f3ed]/95 p-1 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur"
        role="group"
      >
        {SUPPORTED_LOCALES.map((supportedLocale, index) => {
          const isActive = locale === supportedLocale;

          return (
            <button
              key={supportedLocale}
              aria-pressed={isActive}
              className={`min-w-10 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition ${isActive
                ? "bg-[#f1e2d3] text-[#7b4a21]"
                : "text-[#7f746c] hover:text-ink"
                } ${index > 0 ? "border-l border-[#e8dccf]" : ""}`}
              onClick={() => {
                if (supportedLocale === locale) {
                  return;
                }
                setLocale(supportedLocale);
              }}
              type="button"
              title={t(localeLabelMap[supportedLocale])}
            >
              {supportedLocale}
            </button>
          );
        })}
      </div>
    </div>
  );
}
