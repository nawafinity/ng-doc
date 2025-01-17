import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { NgDocCopyButtonComponent } from '@sijil/app/components/copy-button';
import { NgDocSanitizeHtmlPipe } from '@sijil/app/pipes';
import { NgDocPageProcessorComponent } from '@sijil/app/processors/page-processor';
import { linkProcessor } from '@sijil/app/processors/processors/link';
import { tooltipProcessor } from '@sijil/app/processors/processors/tooltip';
import { provideMainPageProcessor } from '@sijil/app/tokens';
import {
  NgDocButtonIconComponent,
  NgDocIconComponent,
  NgDocSmoothResizeComponent,
  NgDocTextComponent,
  NgDocTooltipDirective,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgDocTextComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
    NgDocSmoothResizeComponent,
    NgDocIconComponent,
    NgDocPageProcessorComponent,
    NgDocCopyButtonComponent,
    NgDocSanitizeHtmlPipe,
  ],
  viewProviders: [provideMainPageProcessor([linkProcessor, tooltipProcessor])],
})
export class NgDocCodeComponent {
  @Input()
  html: string = '';

  @Input()
  copyButton: boolean = true;

  @Input()
  name?: string;

  @Input()
  icon?: string;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('attr.data-ng-doc-has-header')
  get hasHeader(): boolean {
    return !!this.name || !!this.icon;
  }

  get codeElement(): HTMLElement | null {
    return this.elementRef?.nativeElement.querySelector('code') ?? null;
  }
}
