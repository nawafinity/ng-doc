import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { NgDocPageHeaderComponent } from '@sijil/app/components/page-header';
import { createComponent } from '@sijil/app/helpers';
import { NgDocNavigation, NgDocPageNavigation } from '@sijil/app/interfaces';
import { NG_DOC_CONTEXT, NG_DOC_PAGE_SKELETON } from '@sijil/app/tokens';
import { isPresent } from '@sijil/core/helpers/is-present';
import { NgDocPageType } from '@sijil/core/types';
import {
  NgDocIconComponent,
  NgDocTabRouteComponent,
  NgDocTabRoutesGroupComponent,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-page-wrapper',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NgDocTabRouteComponent,
    NgDocTabRoutesGroupComponent,
    RouterLinkActive,
    NgDocIconComponent,
    NgDocPageHeaderComponent,
  ],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-ng-doc-page-tabs]': 'routes.length > 1',
  },
})
export class NgDocPageWrapperComponent implements OnInit {
  @Input({ required: true })
  routes!: Routes;

  @Input({ required: true })
  headerContent!: string;

  @Input()
  hasBreadcrumb = true;

  @Input()
  pageType: NgDocPageType = 'guide';

  @ViewChild('pageBreadcrumbs', { read: ViewContainerRef, static: true })
  pageBreadcrumbs!: ViewContainerRef;

  @ViewChild('pageToc', { read: ViewContainerRef, static: true })
  pageToc?: ViewContainerRef;

  @ViewChild('pageNavigation', { read: ViewContainerRef, static: true })
  pageNavigation!: ViewContainerRef;

  protected skeleton = inject(NG_DOC_PAGE_SKELETON);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected context = inject(NG_DOC_CONTEXT);

  private breadcrumbs: string[] = inject(ActivatedRoute)
    .pathFromRoot.filter((route: ActivatedRoute) => !!route.snapshot.url.length)
    .map((route: ActivatedRoute) => route.snapshot.title)
    .filter(isPresent);

  ngOnInit(): void {
    if (this.skeleton.breadcrumbs && this.hasBreadcrumb) {
      createComponent(this.pageBreadcrumbs, this.skeleton.breadcrumbs, {
        breadcrumbs: this.breadcrumbs,
      });
    }

    if (this.pageType === 'guide') {
      if (this.skeleton.navigation) {
        createComponent(this.pageNavigation, this.skeleton.navigation, this.navigationInputs());
      }
    }
  }

  private navigationInputs(): NgDocPageNavigation {
    const url =
      '/' +
      this.route.pathFromRoot
        .map((route: ActivatedRoute) => route.snapshot.url)
        .flat()
        .join('/');
    const flatItems = (items: NgDocNavigation[]): NgDocNavigation[] =>
      items
        .map((item: NgDocNavigation) => [item.children?.length ? flatItems(item.children) : item])
        .flat(2);
    const flatPages: NgDocNavigation[] = flatItems(this.context.navigation);

    return {
      prevPage: flatPages[flatPages.findIndex((item: NgDocNavigation) => url === item.route) - 1],
      nextPage: flatPages[flatPages.findIndex((item: NgDocNavigation) => url === item.route) + 1],
    };
  }
}
