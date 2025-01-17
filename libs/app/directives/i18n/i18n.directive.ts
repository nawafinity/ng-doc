import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { SjlI18nService } from '@sijil/app/services';

@Directive({
  selector: '[sjlI18n]',
  standalone: true,
})
export class SjlI18nDirective implements OnChanges {
  @Input('sjlI18n') key!: string;
  @Input('sjlI18nParams') params?: Record<string, any>;
  @Input('sjlI18nDefault') defaultText?: string;

  protected readonly element = inject(ElementRef<HTMLElement>).nativeElement;

  protected readonly translateService: SjlI18nService = inject(SjlI18nService);

  ngOnChanges() {
    this.updateText();
  }

  private updateText(): void {
    this.element.textContent = this.translateService.translate(
      this.key,
      this.params,
      this.defaultText,
    );
  }
}
