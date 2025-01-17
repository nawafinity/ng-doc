import { NgDocProvidedTypeControl } from '@sijil/app/interfaces';
import { NgDocPlaygroundProperty } from '@sijil/core/interfaces';

export interface NgDocPlaygroundPropertyControl {
  propertyName: string;
  property: NgDocPlaygroundProperty;
  typeControl: NgDocProvidedTypeControl;
}
