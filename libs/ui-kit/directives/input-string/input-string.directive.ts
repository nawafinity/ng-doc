import { Directive, forwardRef, HostListener } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isPresent } from '@sijil/core/helpers/is-present';
import { NgDocBaseInput } from '@sijil/ui-kit/classes/base-input';
import { toElement } from '@sijil/ui-kit/helpers';

/** Directive converts any input data or model to text */
@Directive({
  selector: `input[ngDocInputString]`,
  providers: [
    { provide: NgDocBaseInput, useExisting: forwardRef(() => NgDocInputStringDirective) },
  ],
  standalone: true,
})
@UntilDestroy()
export class NgDocInputStringDirective extends NgDocBaseInput<string> {
  constructor() {
    super({
      onIncomingUpdate: (value) => {
        toElement(this.elementRef).value = isPresent(value) ? String(value) : '';
      },
    });
  }

  @HostListener('blur')
  blurEvent(): void {
    this.touch();
  }

  @HostListener('input')
  inputEvent(): void {
    this.updateModel(this.elementRef.nativeElement.value);
  }
}
