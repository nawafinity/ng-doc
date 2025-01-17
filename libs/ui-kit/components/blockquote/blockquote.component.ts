import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NgDocIconComponent } from '@sijil/ui-kit/components/icon';
import { NgDocBlockquoteType } from '@sijil/ui-kit/types';

@Component({
  selector: 'blockquote[ng-doc-blockquote]',
  templateUrl: './blockquote.component.html',
  styleUrls: ['./blockquote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgSwitch, NgSwitchCase, NgDocIconComponent],
})
export class NgDocBlockquoteComponent {
  @Input()
  @HostBinding('attr.data-ng-doc-type')
  type: NgDocBlockquoteType = 'default';

  @Input()
  icon?: string;
}
