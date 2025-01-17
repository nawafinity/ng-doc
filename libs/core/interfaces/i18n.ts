export interface SjlI18nConfig {
  /**
   * Translations
   */
  translations?: Record<string, Record<string, string>>;

  /**
   * Default Locale
   */
  locale?: string;

  /**
   * Supported languages
   */
  locales?: string[];
}
