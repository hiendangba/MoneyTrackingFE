"use client";

import { Google } from "@thesvg/react";
import { TranslationKey, useI18n } from "@/shared/i18n";

export function GoogleButton() {
  const { t } = useI18n();

  return (
    <button
      className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-4 py-2.5 font-bold text-ink transition hover:-translate-y-px hover:border-[#bda99d] hover:bg-[#fffdfb] focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none"
      title={t(TranslationKey.AuthGoogleContinue)}
      type="button"
    >
      <Google width={20} height={20} />
      <span>{t(TranslationKey.AuthGoogleContinue)}</span>
    </button>
  );
}
