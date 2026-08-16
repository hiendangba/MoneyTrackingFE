import { t, TranslationKey } from "@/shared/i18n";
import { Google } from '@thesvg/react';


export function GoogleButton() {
  return (
    <button className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line 
    bg-white px-4 py-2.5 font-bold text-ink transition hover:-translate-y-px hover:border-[#bda99d] hover:bg-[#fffdfb] 
    focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none"
      type="button" title={t(TranslationKey.AuthGoogleContinue)}
    >
      <Google width={20} height={20} />
      <span>{t(TranslationKey.AuthGoogleContinue)}</span>
    </button>
  );
}
