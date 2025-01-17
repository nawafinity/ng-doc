import { NgDocDemoComponent } from '@sijil/app/components/demo';
import { NgDocPageProcessor } from '@sijil/app/interfaces';

export const demoProcessor: NgDocPageProcessor<NgDocDemoComponent> = {
  component: NgDocDemoComponent,
  selector: 'ng-doc-demo',
  extractOptions: (element: Element) => ({
    inputs: {
      componentName: element.getAttribute('componentName') || undefined,
      options: JSON.parse(element.querySelector('#options')?.textContent ?? '{}'),
    },
  }),
};
