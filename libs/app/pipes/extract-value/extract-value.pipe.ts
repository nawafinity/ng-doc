import { Pipe, PipeTransform } from '@angular/core';
import { extractValue } from '@sijil/core/helpers/extract-value';
import { NgDocExtractedValue } from '@sijil/core/types/extracted-value';

@Pipe({
  name: 'ngDocExtractValue',
  standalone: true,
})
export class NgDocExtractValuePipe implements PipeTransform {
  transform(value: string): NgDocExtractedValue {
    return extractValue(value);
  }
}
