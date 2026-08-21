export { getDefaultLocale, getTranslation, resolveTranslation, t } from "./translation";
export { TranslationKey } from "./translation-key";
export { I18nProvider, useI18n } from "./i18n-provider";
export { LanguageSwitcher } from "./language-switcher";
export {
	LOCALE_COOKIE_NAME,
	SUPPORTED_LOCALES,
	isSupportedLocale,
	normalizeLocale,
	type AppLocale,
} from "./locale";
