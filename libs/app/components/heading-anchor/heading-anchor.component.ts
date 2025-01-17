import { ChangeDetectionStrategy, Component, HostBinding, inject, Input } from '@angular/core';
import { LOCATION } from '@ng-web-apis/common';
import { NgDocCopyButtonComponent } from '@sijil/app/components/copy-button';
import { NgDocButtonIconComponent, NgDocIconComponent } from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-heading-anchor',
  imports: [NgDocButtonIconComponent, NgDocIconComponent, NgDocCopyButtonComponent],
  template: `
    <ng-doc-copy-button [text]="href">
      <ng-doc-icon icon="link-2"></ng-doc-icon>
    </ng-doc-copy-button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocHeadingAnchorComponent {
  @Input({ required: true })
  anchor!: string;

  @Input()
  @HostBinding('class')
  classes: string[] = [];

  protected readonly location = inject(LOCATION);

  protected get href(): string {
    const { origin, pathname } = this.location;

    return `${origin}${pathname}#${this.anchor}`;
  }
}
