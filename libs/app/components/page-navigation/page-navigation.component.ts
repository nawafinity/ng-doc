import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgDocNavigation, NgDocPageNavigation } from '@sijil/app/interfaces';
import {
  NgDocIconComponent,
  NgDocTextComponent,
  NgDocTextLeftDirective,
  NgDocTextRightDirective,
} from '@sijil/ui-kit';

@Component({
  selector: 'ng-doc-page-navigation',
  imports: [
    CommonModule,
    NgDocIconComponent,
    NgDocTextComponent,
    NgDocTextLeftDirective,
    NgDocTextRightDirective,
    RouterLink,
  ],
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocPageNavigationComponent implements NgDocPageNavigation {
  @Input({ required: true })
  prevPage?: NgDocNavigation;

  @Input({ required: true })
  nextPage?: NgDocNavigation;
}
