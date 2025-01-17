import { NgDocPlaygroundComponent } from '@sijil/app/components/playground';
import { NgDocPageProcessor } from '@sijil/app/interfaces';
import { isPresent } from '@sijil/core/helpers/is-present';

export const playgroundProcessor: NgDocPageProcessor<NgDocPlaygroundComponent> = {
  component: NgDocPlaygroundComponent,
  selector: 'ng-doc-playground',
  extractOptions: (element: Element) => ({
    inputs: {
      id: element.getAttribute('id') || undefined,
      properties:
        JSON.parse(element.querySelector('#data')?.textContent?.replace(/\n/g, '\\n') ?? '') ||
        undefined,
      pipeName: element.querySelector('#pipeName')?.textContent || undefined,
      selectors: (element.querySelector('#selectors')?.textContent || '')
        .split(',')
        .map((selector: string) => selector.trim())
        .filter(isPresent),
      options: JSON.parse(element.querySelector('#options')?.textContent ?? '') || {},
    },
  }),
};
