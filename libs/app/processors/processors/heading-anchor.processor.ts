import { NgDocHeadingAnchorComponent } from '@sijil/app/components/heading-anchor';
import { NgDocPageProcessor } from '@sijil/app/interfaces';

export const headingAnchorProcessor: NgDocPageProcessor<NgDocHeadingAnchorComponent> = {
  component: NgDocHeadingAnchorComponent,
  selector: 'ng-doc-heading-anchor',
  extractOptions: (element: Element) => ({
    inputs: {
      classes: element.getAttribute('class')?.split(' ') || [],
      anchor: element.getAttribute('anchor') || '',
    },
  }),
};
