import { NgDocMermaidViewerComponent } from '@sijil/app/components/mermaid-viewer';
import { NgDocPageProcessor } from '@sijil/app/interfaces';

export const mermaidProcessor: NgDocPageProcessor<NgDocMermaidViewerComponent> = {
  component: NgDocMermaidViewerComponent,
  selector: 'pre.mermaid',
  extractOptions: (element: Element) => ({
    inputs: {
      graph: element.textContent ?? '',
    },
  }),
};
