import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { NgDocComboboxHostComponent } from '@sijil/ui-kit/cdk/combobox-host';
import { NgDocListHost } from '@sijil/ui-kit/classes/list-host';
import { NgDocClearControlComponent } from '@sijil/ui-kit/components/clear-control';
import { NgDocDropdownComponent } from '@sijil/ui-kit/components/dropdown';
import { NgDocInputWrapperComponent } from '@sijil/ui-kit/components/input-wrapper';
import { NgDocDataDirective } from '@sijil/ui-kit/directives/data';
import { NgDocFocusCatcherDirective } from '@sijil/ui-kit/directives/focus-catcher';
import { NgDocInputStringDirective } from '@sijil/ui-kit/directives/input-string';
import { NgDocContextWithImplicit } from '@sijil/ui-kit/interfaces';
import { NgDocContent } from '@sijil/ui-kit/types';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { DIControl, provideHostControl } from 'di-controls';

@Component({
  selector: 'ng-doc-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    provideHostControl(NgDocComboboxComponent),
    {
      provide: NgDocListHost,
      useExisting: NgDocComboboxComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgDocComboboxHostComponent,
    NgDocInputWrapperComponent,
    NgDocFocusCatcherDirective,
    NgDocInputStringDirective,
    PolymorpheusModule,
    NgIf,
    NgDocClearControlComponent,
    NgDocDropdownComponent,
    NgTemplateOutlet,
  ],
})
export class NgDocComboboxComponent<T> extends DIControl<T> implements NgDocListHost {
  @Input()
  readonly: boolean = false;

  @Input()
  placeholder: string = 'Chose the value';

  @Input()
  clearButton: boolean = true;

  @Input()
  rightContent: NgDocContent = '';

  @Input()
  valueContent: NgDocContent<NgDocContextWithImplicit<T | null>> = '';

  @ContentChild(NgDocDataDirective, { read: TemplateRef })
  data: TemplateRef<never> | null = null;

  constructor() {
    super();
  }

  get listHostOrigin(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
