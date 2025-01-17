import { NgComponentOutlet, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgDocRootPage } from '@sijil/app/classes/root-page';
import { NgDocBreadcrumbComponent } from '@sijil/app/components/breadcrumb';
import { NgDocPageWrapperComponent } from '@sijil/app/components/page-wrapper';
import { NgDocTocComponent } from '@sijil/app/components/toc';
import { createComponent, generateToc } from '@sijil/app/helpers';
import { NgDocPageSkeleton } from '@sijil/app/interfaces';
import { NgDocSanitizeHtmlPipe } from '@sijil/app/pipes';
import { NgDocPageProcessorComponent } from '@sijil/app/processors';
import { provideTypeControl } from '@sijil/app/providers/type-control';
import { NG_DOC_PAGE_SKELETON } from '@sijil/app/tokens';
import {
  NgDocBooleanControlComponent,
  NgDocNumberControlComponent,
  NgDocStringControlComponent,
  NgDocTypeAliasControlComponent,
} from '@sijil/app/type-controls';
import {
  DialogOutletComponent,
  NgDocButtonIconComponent,
  NgDocIconComponent,
  NgDocTextComponent,
  NgDocTextLeftDirective,
  NgDocTextRightDirective,
  NgDocTooltipDirective,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgDocBreadcrumbComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
    NgDocIconComponent,
    NgDocTextComponent,
    NgDocTextLeftDirective,
    NgDocTextRightDirective,
    NgDocTocComponent,
    NgDocPageProcessorComponent,
    NgComponentOutlet,
    RouterOutlet,
    DialogOutletComponent,
    NgDocSanitizeHtmlPipe,
  ],
  providers: [
    provideTypeControl('NgDocTypeAlias', NgDocTypeAliasControlComponent, { order: 10 }),
    provideTypeControl('string', NgDocStringControlComponent, { order: 20 }),
    provideTypeControl('number', NgDocNumberControlComponent, { order: 30 }),
    provideTypeControl('boolean', NgDocBooleanControlComponent, { hideLabel: true, order: 40 }),
  ],
  host: { ngSkipHydration: 'true' },
})
@UntilDestroy()
export class NgDocPageComponent {
  @ViewChild('pageContainer', { read: ElementRef, static: true })
  pageContainer!: ElementRef<HTMLElement>;

  @ViewChild('childOutlet')
  childOutlet?: TemplateRef<never>;

  protected rootPage: NgDocRootPage = inject(NgDocRootPage);
  protected skeleton: NgDocPageSkeleton = inject(NG_DOC_PAGE_SKELETON);
  protected changeDetectorRef = inject(ChangeDetectorRef);

  protected pageWrapper: NgDocPageWrapperComponent = inject(NgDocPageWrapperComponent);

  createToc(): void {
    if (this.pageWrapper.pageToc && this.skeleton.toc) {
      createComponent(this.pageWrapper.pageToc, this.skeleton.toc, {
        tableOfContent: generateToc(this.pageContainer.nativeElement) ?? [],
      });

      this.changeDetectorRef.detectChanges();
    }
  }
}
