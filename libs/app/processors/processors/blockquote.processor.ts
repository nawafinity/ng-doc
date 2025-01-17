import { NgDocPageProcessor } from '@sijil/app/interfaces';
import { NgDocBlockquoteComponent, NgDocBlockquoteType } from '@sijil/ui-kit';

export const blockquoteProcessor: NgDocPageProcessor<NgDocBlockquoteComponent> = {
  component: NgDocBlockquoteComponent,
  selector: 'ng-doc-blockquote',
  extractOptions: (element: Element) => ({
    content: [Array.from(element.childNodes)],
    inputs: {
      type: (element.getAttribute('type') as NgDocBlockquoteType) || 'default',
      icon: element.getAttribute('icon') ?? undefined,
    },
  }),
};
