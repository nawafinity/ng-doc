import { Inject, Injectable } from '@angular/core';
import { SJL_I18N_TOKEN } from '@sijil/app/tokens';
import { SjlI18nConfig } from '@sijil/core';

@Injectable({
  providedIn: 'root',
})
export class SjlI18nService {
  protected translations: Record<string, Record<string, string>>;
  private language: string;

  constructor(@Inject(SJL_I18N_TOKEN) private config: SjlI18nConfig) {
    this.translations = this.config.translations || {};
    this.language = this.config.locale || 'en';
  }

  /**
   * Translate a key for the current language.
   * @param key - The translation key.
   * @param params - The translation params. e.g. Hello {name}.
   * @param defaultValue - The default message in case the key not exists.
   */
  translate(key: string, params?: Record<string, any>, defaultValue?: string): string {
    const message = this.translations[this.language]?.[key] || defaultValue || key;
    return this.formatMessage(message, params);
  }

  /**
   * Get the current language.
   */
  getLanguage(): string {
    return this.language;
  }

  /**
   * Set the current language.
   * @param language - The language.
   */
  setLanguage(language: string): void {
    this.language = language;
  }

  /**
   * Extend or override translations.
   * @param newTranslations - New translations set.
   */
  extendTranslations(newTranslations: Record<string, Record<string, string>>): void {
    Object.keys(newTranslations).forEach((lang) => {
      if (!this.translations[lang]) {
        this.translations[lang] = {};
      }
      this.translations[lang] = { ...this.translations[lang], ...newTranslations[lang] };
    });
  }

  /**
   * Format messages with optional parameter.
   * @param message - Message to be formatted.
   * @param params - Message parameters.
   * @private
   */
  private formatMessage(message: string, params?: Record<string, string>): string {
    if (!params) return message;
    return message.replace(/\{([^}]+)\}/g, (_, key) => params[key] || '');
  }
}
