import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { notificationCloseAnimation, notificationOpenAnimation } from '@sijil/ui-kit/animations';
import { NgDocOverlayRef } from '@sijil/ui-kit/classes';
import { NgDocOverlayContainerComponent } from '@sijil/ui-kit/components/overlay-container';
import { NgDocOverlayService } from '@sijil/ui-kit/services/overlay';
import { NgDocContent } from '@sijil/ui-kit/types';
import { Subject, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class NgDocNotifyService {
  private overlayRef?: NgDocOverlayRef;
  private readonly notify$: Subject<NgDocContent> = new Subject<NgDocContent>();

  constructor(private readonly overlayService: NgDocOverlayService) {
    this.notify$
      .pipe(
        tap(() => this.overlayRef?.close()),
        tap((content: NgDocContent) => this.openOverlay(content)),
        switchMap(() => timer(2000)),
        untilDestroyed(this),
      )
      .subscribe(() => this.overlayRef?.close());
  }

  notify(content: NgDocContent): void {
    this.notify$.next(content);
  }

  private openOverlay(content: NgDocContent): void {
    this.overlayRef = this.overlayService.open(content, {
      overlayContainer: NgDocOverlayContainerComponent,
      panelClass: 'ng-doc-notify',
      positionStrategy: this.overlayService
        .globalPositionStrategy()
        .bottom('10px')
        .centerHorizontally(),
      openAnimation: notificationOpenAnimation,
      closeAnimation: notificationCloseAnimation,
    });
  }
}
