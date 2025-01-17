import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { asArray } from '@sijil/core/helpers/as-array';
import { NgDocOverlayRef } from '@sijil/ui-kit/classes';
import { NgDocOverlayContainerComponent } from '@sijil/ui-kit/components/overlay-container';
import { NgDocOverlayService } from '@sijil/ui-kit/services/overlay';
import { NgDocContent } from '@sijil/ui-kit/types';

import { NgDocDialogConfig } from './dialog.config';

export const NG_DOC_DIALOG_DATA = new InjectionToken<unknown>('NG_DOC_DIALOG_DATA');

@Injectable({
  providedIn: 'root',
})
export class NgDocDialogService {
  protected overlayService: NgDocOverlayService = inject(NgDocOverlayService);

  open<R = unknown>(content: NgDocContent, config?: NgDocDialogConfig): NgDocOverlayRef<R> {
    return this.overlayService.open(
      content,
      {
        overlayContainer: NgDocOverlayContainerComponent,
        positionStrategy:
          config?.positionStrategy ??
          this.overlayService.globalPositionStrategy().centerHorizontally().centerVertically(),
        scrollStrategy: config?.scrollStrategy ?? this.overlayService.scrollStrategy().block(),
        ...config,
        panelClass: ['ng-doc-dialog', ...asArray(config?.panelClass)],
      },
      [{ provide: NG_DOC_DIALOG_DATA, useValue: config?.data }],
    );
  }

  positionStrategy(): GlobalPositionStrategy {
    return this.overlayService.globalPositionStrategy();
  }
}
