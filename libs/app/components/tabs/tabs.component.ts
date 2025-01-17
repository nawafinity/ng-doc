import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgDocTab } from '@sijil/app/interfaces';
import { NgDocSanitizeHtmlPipe } from '@sijil/app/pipes';
import {
  NgDocBindPipe,
  NgDocExecutePipe,
  NgDocIconComponent,
  NgDocTabComponent,
  NgDocTabGroupComponent,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-tabs',
  imports: [
    CommonModule,
    NgDocTabGroupComponent,
    NgDocTabComponent,
    NgDocSanitizeHtmlPipe,
    NgDocExecutePipe,
    NgDocBindPipe,
    NgDocIconComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocTabsComponent {
  @Input()
  tabs: NgDocTab[] = [];

  getActiveIndex(tabs: NgDocTab[]): number {
    return Math.max(
      tabs.findIndex((tab: NgDocTab) => tab.active),
      0,
    );
  }

  appendElement(element: Element, parent: Element): void {
    parent.appendChild(element);
  }
}
