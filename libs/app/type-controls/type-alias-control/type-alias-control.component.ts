import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgDocKindIconComponent } from '@sijil/app/components/kind-icon';
import { NgDocTypeControl } from '@sijil/app/interfaces';
import { NgDocExtractValuePipe } from '@sijil/app/pipes/extract-value';
import {
  NgDocButtonIconComponent,
  NgDocComboboxComponent,
  NgDocDataDirective,
  NgDocFocusableDirective,
  NgDocIconComponent,
  NgDocListComponent,
  NgDocOptionComponent,
  NgDocTextComponent,
  NgDocTextLeftDirective,
  NgDocTextRightDirective,
  NgDocTooltipDirective,
} from '@sijil/ui-kit';
import { DIControl } from 'di-controls';

@Component({
  selector: 'ng-doc-type-alias-control',
  templateUrl: './type-alias-control.component.html',
  styleUrls: ['./type-alias-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgDocComboboxComponent,
    FormsModule,
    NgDocDataDirective,
    NgDocListComponent,
    NgFor,
    NgIf,
    NgDocOptionComponent,
    NgTemplateOutlet,
    NgDocTextComponent,
    NgDocKindIconComponent,
    NgDocTextLeftDirective,
    NgDocTooltipDirective,
    NgDocTextRightDirective,
    NgDocButtonIconComponent,
    NgDocFocusableDirective,
    NgDocIconComponent,
    NgDocExtractValuePipe,
  ],
})
export class NgDocTypeAliasControlComponent<T> extends DIControl<T> implements NgDocTypeControl<T> {
  @Input()
  default?: T;

  options?: string[];

  isManual?: boolean;

  constructor() {
    super();
  }

  typeOf(value: unknown): string {
    return typeof value;
  }

  changeModel(value: T | null): void {
    this.updateModel(value === null && this.default ? this.default : value);
  }
}
