import { Provider } from '@angular/core';
import { SJL_DEFAULT_I18N, SJL_I18N_TOKEN } from '@sijil/app/tokens';
import { SjlI18nConfig } from '@sijil/core/interfaces';

/**
 * Provide SJL I18N configurations, merging user-provided and default configurations.
 * @param config - Your custom configuration.
 */
export function provideSjlI18n(config: Partial<SjlI18nConfig> = {}): Provider[] {
  const mergedConfig: Partial<SjlI18nConfig> = {
    translations: {
      ...SJL_DEFAULT_I18N.translations,
      ...config.translations,
    },
    locale: config.locale || SJL_DEFAULT_I18N.locale,
  };

  return [
    {
      provide: SJL_I18N_TOKEN,
      useValue: mergedConfig,
    },
  ];
}
