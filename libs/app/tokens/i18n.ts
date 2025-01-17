import { InjectionToken } from '@angular/core';
import { SjlI18nConfig } from '@sijil/core/interfaces';

export const SJL_DEFAULT_I18N: Partial<SjlI18nConfig> = {
  translations: {
    ar: {
      'on-this-page': 'في هذه الصفحة',
      welcome: 'مرحباً!',
    },
    en: {
      'on-this-page': 'On this page',
      welcome: 'Welcome!',
    },
  },
  locale: 'ar',
};

export const SJL_I18N_TOKEN = new InjectionToken<Partial<SjlI18nConfig>>('SJL_I18N', {
  providedIn: 'root',
  factory: () => SJL_DEFAULT_I18N,
});
