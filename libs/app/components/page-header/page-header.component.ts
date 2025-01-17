import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgDocSanitizeHtmlPipe } from '@sijil/app/pipes';
import { NgDocPageProcessorComponent } from '@sijil/app/processors';

@Component({
  selector: 'ng-doc-page-header',
  imports: [CommonModule, NgDocPageProcessorComponent, NgDocSanitizeHtmlPipe],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ngSkipHydration: 'true',
  },
})
export class NgDocPageHeaderComponent {
  @Input({ required: true })
  headerContent!: string;
}
