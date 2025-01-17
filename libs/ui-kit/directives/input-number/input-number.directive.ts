import { Directive, forwardRef, HostListener } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isPresent } from '@sijil/core/helpers/is-present';
import { NgDocBaseInput } from '@sijil/ui-kit/classes/base-input';
import { toElement } from '@sijil/ui-kit/helpers';

@Directive({
  selector: `input[ngDocInputNumber]`,
  providers: [
    { provide: NgDocBaseInput, useExisting: forwardRef(() => NgDocInputNumberDirective) },
  ],
  standalone: true,
})
@UntilDestroy()
export class NgDocInputNumberDirective extends NgDocBaseInput<number> {
  constructor() {
    super({
      onIncomingUpdate: (value) => {
        toElement(this.elementRef).value = isPresent(value) ? String(Number(value)) : '';
      },
    });
  }

  @HostListener('blur')
  blurEvent(): void {
    this.touch();
  }

  @HostListener('input')
  inputEvent(): void {
    this.updateModel(Number(this.elementRef.nativeElement.value));
  }
}
