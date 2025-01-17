import { Location, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgDocNavigation } from '@sijil/app/interfaces';
import { NG_DOC_CONTEXT } from '@sijil/app/tokens';
import { NgDocBindPipe, NgDocExecutePipe } from '@sijil/ui-kit';

import { NgDocSidebarCategoryComponent } from './sidebar-category/sidebar-category.component';
import { NgDocSidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'ng-doc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgTemplateOutlet,
    NgIf,
    NgDocSidebarCategoryComponent,
    NgDocSidebarItemComponent,
    NgDocExecutePipe,
    NgDocBindPipe,
  ],
  host: {
    class: 'z-20 hidden lg:block fixed bottom-0 start-auto w-[18rem] top-[7.1rem]',
  },
})
export class NgDocSidebarComponent {
  protected readonly location = inject(Location);
  protected readonly context = inject(NG_DOC_CONTEXT);

  getNavigation(nav?: NgDocNavigation): NgDocNavigation[] {
    return nav ? nav.children ?? [] : this.context.navigation;
  }

  matchRoute(route: string): boolean {
    return this.location.path().includes(route ?? '', 0);
  }
}
