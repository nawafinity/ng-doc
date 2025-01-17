import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgDocRootPage } from '@sijil/app/classes/root-page';
import { isSameObject } from '@sijil/core/helpers/is-same-object';
import { objectKeys } from '@sijil/core/helpers/object-keys';
import {
  NgDocPlaygroundConfig,
  NgDocPlaygroundOptions,
  NgDocPlaygroundProperties,
} from '@sijil/core/interfaces';
import { NgDocAsArrayPipe } from '@sijil/ui-kit';

import { NgDocPlaygroundDemoComponent } from './playground-demo/playground-demo.component';
import { NgDocPlaygroundForm } from './playground-form';
import { NgDocPlaygroundPropertiesComponent } from './playground-properties/playground-properties.component';

@Component({
  selector: 'ng-doc-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgDocPlaygroundPropertiesComponent,
    NgFor,
    NgDocPlaygroundDemoComponent,
    NgDocAsArrayPipe,
  ],
})
export class NgDocPlaygroundComponent<
    T extends NgDocPlaygroundProperties = NgDocPlaygroundProperties,
  >
  implements OnChanges, AfterViewInit
{
  @Input({ required: true })
  id: string = '';

  @Input()
  pipeName: string = '';

  @Input()
  selectors: string[] = [];

  @Input()
  properties?: T;

  @Input()
  options: NgDocPlaygroundOptions = {};

  recreateDemo: boolean = false;
  formGroup!: FormGroup<NgDocPlaygroundForm>;
  defaultValues?: Record<string, unknown>;
  configuration!: NgDocPlaygroundConfig;

  private defaultProperties: Record<string, unknown> = {};
  private defaultContent: Record<string, boolean> = {};

  constructor(
    private readonly rootPage: NgDocRootPage,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnChanges({ options }: SimpleChanges) {
    if (options) {
      // Join configuration with options
      this.configuration = Object.assign(
        {},
        this.rootPage.page?.playgrounds?.[this.id],
        this.options,
      );
    }
  }

  ngAfterViewInit(): void {
    this.defaultProperties = this.getPropertiesFormValues();
    this.defaultContent = this.getContentFormValues();

    const propertiesForm: FormGroup = this.formBuilder.group(this.defaultProperties);
    const contentForm: FormGroup = this.formBuilder.group(this.defaultContent);

    this.formGroup = this.formBuilder.group({
      properties: propertiesForm,
      content: contentForm,
    });
    // `patchValue` is needed to set `undefined` values, otherwise they will be ignored by the Angular form
    this.formGroup.patchValue({
      properties: Object.assign({}, this.defaultProperties, this.configuration.inputs),
      content: this.defaultContent,
    });
  }

  protected isDefaultState(): boolean {
    if (!this.formGroup) {
      return false;
    }

    return (
      isSameObject(this.formGroup.value.properties ?? {}, this.defaultValues ?? {}) &&
      isSameObject(this.formGroup.value.content ?? {}, this.defaultContent ?? {})
    );
  }

  private getPropertiesFormValues(): Record<string, unknown> {
    const formValues: Record<string, unknown> = objectKeys(this.properties ?? {}).reduce(
      (controls: Record<string, unknown>, key: string) => {
        if (this.properties) {
          controls[key] = this.defaultValues ? this.defaultValues[key] : undefined;
        }

        return controls;
      },
      {} as Record<string, unknown>,
    );

    return Object.assign({}, formValues, this.configuration.defaults);
  }

  private getContentFormValues(): Record<string, boolean> {
    return objectKeys(this.configuration?.content ?? {}).reduce(
      (controls: Record<string, boolean>, key: string) => {
        if (this.configuration?.content) {
          controls[key] = false;
        }

        return controls;
      },
      {} as Record<keyof T, boolean>,
    );
  }

  resetForm(): void {
    this.formGroup.reset({}, { emitEvent: false });
    this.formGroup?.patchValue({
      properties: this.defaultProperties,
      content: this.defaultContent,
    });
  }
}
