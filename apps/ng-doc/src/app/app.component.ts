import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgDocNavbarComponent, NgDocSidebarComponent, NgDocThemeToggleComponent } from '@sijil/app';
import { NgDocRootComponent } from '@sijil/app/components/root';
import { NgDocButtonIconComponent, NgDocIconComponent, NgDocTooltipDirective } from '@sijil/ui-kit';
import { preventInitialChildAnimations } from '@sijil/ui-kit/animations';

@Component({
  animations: [preventInitialChildAnimations],
  selector: 'ng-doc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgDocRootComponent,
    NgDocNavbarComponent,
    RouterLink,
    NgDocThemeToggleComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
    NgDocIconComponent,
    NgDocSidebarComponent,
    RouterOutlet,
  ],
})
export class AppComponent {
  protected readonly location = inject(Location);

  @HostBinding('attr.data-ng-doc-is-landing')
  get isLandingPage(): boolean {
    return this.location.path() === '';
  }
}
