import { NgDocPageProcessor } from '@sijil/app/interfaces';
import { NgDocIconComponent, NgDocIconSize } from '@sijil/ui-kit';

export const iconProcessor: NgDocPageProcessor<NgDocIconComponent> = {
  component: NgDocIconComponent,
  selector: 'ng-doc-icon',
  extractOptions: (element: Element) => ({
    inputs: {
      icon: element.getAttribute('icon') ?? '',
      size: (Number(element.getAttribute('size')) as NgDocIconSize) || 16,
    },
  }),
};
