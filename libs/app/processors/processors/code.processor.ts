import { NgDocCodeComponent } from '@sijil/app/components/code';
import { NgDocPageProcessor } from '@sijil/app/interfaces';

export const codeProcessor: NgDocPageProcessor<NgDocCodeComponent> = {
  component: NgDocCodeComponent,
  selector: 'pre code',
  nodeToReplace: (element: Element) => element.closest('pre') ?? element,
  extractOptions: (element: Element) => ({
    inputs: {
      name: element.parentElement?.getAttribute('name') || undefined,
      icon: element.parentElement?.getAttribute('icon') || undefined,
    },
    content: [[element.closest('pre') ?? element]],
  }),
};
