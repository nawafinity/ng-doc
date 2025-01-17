import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { NgDocCacheInterceptor } from '@sijil/ui-kit/interceptors';
import { NgDocUiConfig } from '@sijil/ui-kit/interfaces';
import { NG_DOC_ASSETS_PATH, NG_DOC_CUSTOM_ICONS_PATH } from '@sijil/ui-kit/tokens';

/**
 * Provides Base UI Kit configuration for the application root module.
 * @param config - The UI Kit configuration.
 */
export function provideNgDocUiKitConfig(config?: NgDocUiConfig): Provider[] {
  return [
    {
      provide: NG_DOC_ASSETS_PATH,
      useValue: config?.assetsPath ?? 'assets/ng-doc/ui-kit',
    },
    {
      provide: NG_DOC_CUSTOM_ICONS_PATH,
      useValue: config?.customIconsPath ?? 'assets/icons',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgDocCacheInterceptor,
      multi: true,
    },
  ];
}
